import { DEFAULT_LOCATION } from './constants';

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface DemoLocation {
  label: string;
  latitude: number;
  longitude: number;
}

export const DEMO_LOCATIONS: DemoLocation[] = [
  { label: 'Springfield, IL (Default)', latitude: 39.8097, longitude: -89.644 },
  { label: 'Chicago, IL', latitude: 41.8781, longitude: -87.6298 },
  { label: 'New York, NY', latitude: 40.7128, longitude: -74.006 },
  { label: 'Atlanta, GA', latitude: 33.749, longitude: -84.388 },
  { label: 'Dallas, TX', latitude: 32.7767, longitude: -96.797 },
  { label: 'Denver, CO', latitude: 39.7392, longitude: -104.9903 },
  { label: 'Los Angeles, CA', latitude: 34.0522, longitude: -118.2437 },
  { label: 'Seattle, WA', latitude: 47.6062, longitude: -122.3321 },
];

export function haversineMiles(a: LatLng, b: LatLng): number {
  const R = 3958.8;
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLng = ((b.longitude - a.longitude) * Math.PI) / 180;
  const lat1 = (a.latitude * Math.PI) / 180;
  const lat2 = (b.latitude * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function formatDistance(miles: number): string {
  if (miles < 0.1) {
    return `${Math.round(miles * 5280)} ft away`;
  }
  if (miles < 10) {
    return `${miles.toFixed(1)} mi away`;
  }
  return `${Math.round(miles)} mi away`;
}

export const DEFAULT_REF_LOCATION: LatLng = {
  latitude: DEFAULT_LOCATION.latitude,
  longitude: DEFAULT_LOCATION.longitude,
};
