import { DEFAULT_LOCATION } from './constants';

export interface MapItem {
  id: string;
  title: string;
  description: string;
  lender_name: string;
  address: string;
  latitude: number;
  longitude: number;
  listing_type: 'lend' | 'borrow';
  image_url: string;
  borrow_duration_days: number | null;
}

interface BuildMapHtmlParams {
  items: MapItem[];
  userLatitude?: number | null;
  userLongitude?: number | null;
}

export function buildMapHtml({
  items,
  userLatitude,
  userLongitude,
}: BuildMapHtmlParams): string {
  const centerLat = userLatitude ?? DEFAULT_LOCATION.latitude;
  const centerLng = userLongitude ?? DEFAULT_LOCATION.longitude;
  const itemsJson = JSON.stringify(items);

  return `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; width: 100%; }
    #map { height: 100%; width: 100%; background: #eef7f3; }
    .search-box {
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 24px);
      max-width: 380px;
      z-index: 1000;
    }
    .search-input {
      width: 100%;
      padding: 12px 16px;
      font-size: 15px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
      outline: none;
    }
    .controls {
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      z-index: 1000;
    }
    .ctrl-btn {
      padding: 10px 18px;
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-weight: 600;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    #nearby-btn { background: #1f7255; color: #fff; }
    #nearby-btn:active { background: #1a5b45; }
    .leaflet-popup-content-wrapper {
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    }
    .leaflet-popup-content { margin: 0; width: auto !important; }
    .iw-content {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 260px;
      padding: 0;
    }
    .iw-image {
      width: 100%;
      height: 120px;
      object-fit: cover;
      border-radius: 8px 8px 0 0;
    }
    .iw-body { padding: 12px 14px; }
    .iw-title {
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .iw-badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 6px;
    }
    .iw-badge-lend { background: #2f8e6c; }
    .iw-badge-borrow { background: #f0820a; }
    .iw-lender {
      font-size: 13px;
      font-weight: 600;
      color: #334155;
      margin-bottom: 2px;
    }
    .iw-desc {
      font-size: 13px;
      color: #64748b;
      line-height: 1.4;
      margin-bottom: 6px;
    }
    .iw-address {
      font-size: 12px;
      color: #94a3b8;
      margin-bottom: 6px;
    }
    .iw-distance {
      font-size: 13px;
      color: #1f7255;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .iw-duration {
      font-size: 12px;
      color: #a34c08;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .iw-actions { display: flex; gap: 6px; }
    .iw-btn {
      flex: 1;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      text-align: center;
    }
    .iw-btn-view { background: #1f7255; color: #fff; }
    .iw-btn-dir { background: #e2e8f0; color: #334155; }
    .marker-pin {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 3px solid #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    }
    .marker-lend { background: #2f8e6c; }
    .marker-borrow { background: #f0820a; }
    .marker-user {
      width: 18px;
      height: 18px;
      border: 3px solid #fff;
      background: #327bff;
      box-shadow: 0 0 0 6px rgba(50,123,255,0.2);
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <div class="search-box">
    <input class="search-input" id="search-input" type="text" placeholder="Search for a location..." />
  </div>
  <div class="controls">
    <button class="ctrl-btn" id="nearby-btn" onclick="findNearby()">Find Nearby Items</button>
  </div>
  <script>
    window.itemsData = ${itemsJson};
    window.centerLat = ${centerLat};
    window.centerLng = ${centerLng};

    let map, userMarker = null, userPos = null;
    var markers = [];

    function initMap() {
      map = L.map('map', { zoomControl: true, attributionControl: false }).setView([window.centerLat, window.centerLng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      var items = window.itemsData;
      items.forEach(function(item) {
        var isBorrow = item.listing_type === 'borrow';
        var icon = L.divIcon({
          className: '',
          html: '<div class="marker-pin ' + (isBorrow ? 'marker-borrow' : 'marker-lend') + '"></div>',
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });
        var marker = L.marker([item.latitude, item.longitude], { icon: icon }).addTo(map);
        marker.bindPopup(buildPopup(item), { maxWidth: 280 });
        markers.push({ marker: marker, item: item });
      });

      if (items.length > 0) {
        var group = L.featureGroup(markers.map(function(m) { return m.marker; }));
        map.fitBounds(group.getBounds(), { padding: [30, 30] });
      }

      var searchInput = document.getElementById('search-input');
      searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          searchLocation(searchInput.value);
        }
      });
    }

    function searchLocation(query) {
      if (!query.trim()) return;
      fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(query))
        .then(function(r) { return r.json(); })
        .then(function(results) {
          if (results.length > 0) {
            var r = results[0];
            map.setView([parseFloat(r.lat), parseFloat(r.lon)], 13);
          }
        })
        .catch(function() {});
    }

    function buildPopup(item, distMiles) {
      var isBorrow = item.listing_type === 'borrow';
      var badgeClass = isBorrow ? 'iw-badge-borrow' : 'iw-badge-lend';
      var badgeText = isBorrow ? 'Borrowing Request' : 'Available to Lend';
      var durationHtml = '';
      if (isBorrow && item.borrow_duration_days) {
        durationHtml = '<div class="iw-duration">Needs for ' + item.borrow_duration_days + ' day(s)</div>';
      }
      var distHtml = '';
      if (distMiles !== undefined) {
        distHtml = '<div class="iw-distance">' + formatDist(distMiles) + '</div>';
      }
      var desc = item.description || '';
      if (desc.length > 120) desc = desc.substring(0, 120) + '...';

      return '<div class="iw-content">' +
        '<img class="iw-image" src="' + item.image_url + '" />' +
        '<div class="iw-body">' +
          '<div class="iw-title">' + item.title + '</div>' +
          '<span class="iw-badge ' + badgeClass + '">' + badgeText + '</span>' +
          '<div class="iw-lender">Listed by ' + item.lender_name + '</div>' +
          '<div class="iw-desc">' + desc + '</div>' +
          '<div class="iw-address">' + item.address + '</div>' +
          distHtml + durationHtml +
          '<div class="iw-actions">' +
            '<button class="iw-btn iw-btn-view" onclick="viewItem(\\'' + item.id + '\\')">View Listing</button>' +
            '<button class="iw-btn iw-btn-dir" onclick="getDirections(' + item.latitude + ', ' + item.longitude + ')">Directions</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }

    function formatDist(mi) {
      if (mi < 0.1) return Math.round(mi * 5280) + ' ft away';
      if (mi < 10) return mi.toFixed(1) + ' mi away';
      return Math.round(mi) + ' mi away';
    }

    function haversineMiles(lat1, lng1, lat2, lng2) {
      var R = 3958.8;
      var dLat = (lat2 - lat1) * Math.PI / 180;
      var dLng = (lng2 - lng1) * Math.PI / 180;
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng/2) * Math.sin(dLng/2);
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }

    function viewItem(id) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'viewItem', id: id }));
    }

    function getDirections(lat, lng) {
      var url = 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng;
      window.open(url, '_blank');
    }

    function findNearby() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
          userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          showUserLocation(userPos.lat, userPos.lng);
          sendNearby(userPos);
        }, function() {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'locationError', message: 'Could not get your location. Using default location instead.' }));
          userPos = { lat: window.centerLat, lng: window.centerLng };
          showUserLocation(userPos.lat, userPos.lng);
          sendNearby(userPos);
        }, { enableHighAccuracy: true, timeout: 10000 });
      } else {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'locationError', message: 'Geolocation not supported. Using default location.' }));
        userPos = { lat: window.centerLat, lng: window.centerLng };
        showUserLocation(userPos.lat, userPos.lng);
        sendNearby(userPos);
      }
    }

    function showUserLocation(lat, lng) {
      if (userMarker) map.removeLayer(userMarker);
      var icon = L.divIcon({
        className: '',
        html: '<div class="marker-pin marker-user"></div>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });
      userMarker = L.marker([lat, lng], { icon: icon }).addTo(map);
      map.setView([lat, lng], 14);

      markers.forEach(function(m) {
        var dist = haversineMiles(lat, lng, m.item.latitude, m.item.longitude);
        m.marker.bindPopup(buildPopup(m.item, dist), { maxWidth: 280 });
      });
    }

    function sendNearby(pos) {
      var sorted = window.itemsData.slice().sort(function(a, b) {
        return haversineMiles(pos.lat, pos.lng, a.latitude, a.longitude) -
               haversineMiles(pos.lat, pos.lng, b.latitude, b.longitude);
      });
      var nearby = sorted.slice(0, 5).map(function(item) {
        return {
          id: item.id,
          title: item.title,
          distance: haversineMiles(pos.lat, pos.lng, item.latitude, item.longitude)
        };
      });
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'nearbyItems', items: nearby }));
    }

    window.initMap = initMap;
    window.viewItem = viewItem;
    window.getDirections = getDirections;
    window.findNearby = findNearby;
  </script>
  <script>initMap();</script>
</body>
</html>`;
}
