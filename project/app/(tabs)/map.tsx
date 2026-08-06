import { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Image,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { MapPin, Locate, ChevronDown } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { Item } from '@/lib/types';
import { colors, spacing, typography, radius } from '@/lib/theme';
import { buildMapHtml, MapItem } from '@/lib/mapHtml';
import {
  haversineMiles,
  formatDistance,
  DEMO_LOCATIONS,
  DemoLocation,
  DEFAULT_REF_LOCATION,
} from '@/lib/geo';

interface NearbyItem {
  id: string;
  title: string;
  distance: number;
}

export default function MapScreen() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapHtml, setMapHtml] = useState<string>('');
  const [nearbyItems, setNearbyItems] = useState<NearbyItem[]>([]);
  const [showNearby, setShowNearby] = useState(false);
  const [showLocPicker, setShowLocPicker] = useState(false);
  const [refLocation, setRefLocation] = useState<DemoLocation>(DEMO_LOCATIONS[0]);
  const webViewRef = useRef<WebView>(null);

  const fetchItems = useCallback(async () => {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    if (data) setItems(data as Item[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const buildMap = useCallback(
    (loc: DemoLocation) => {
      if (items.length === 0) return;
      const mapItems: MapItem[] = items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        lender_name: item.lender_name,
        address: item.address,
        latitude: item.latitude,
        longitude: item.longitude,
        listing_type: item.listing_type,
        image_url: item.image_url,
        borrow_duration_days: item.borrow_duration_days,
      }));
      setMapHtml(
        buildMapHtml({
          items: mapItems,
          userLatitude: loc.latitude,
          userLongitude: loc.longitude,
        })
      );
    },
    [items]
  );

  useEffect(() => {
    if (!loading && items.length > 0) {
      buildMap(refLocation);
    }
  }, [items, loading, refLocation, buildMap]);

  const handleMessage = (event: { nativeEvent: { data: string } }) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (msg.type === 'viewItem') {
        router.push(`/item/${msg.id}`);
      } else if (msg.type === 'nearbyItems') {
        setNearbyItems(msg.items as NearbyItem[]);
        setShowNearby(true);
      } else if (msg.type === 'locationError') {
        Alert.alert('Location', msg.message);
      }
    } catch (e) {
      console.error('Failed to parse WebView message', e);
    }
  };

  const selectLocation = (loc: DemoLocation) => {
    setRefLocation(loc);
    setShowLocPicker(false);
    setShowNearby(false);
  };

  const getDistanceMi = (lat: number, lng: number) => {
    return haversineMiles(
      { latitude: refLocation.latitude, longitude: refLocation.longitude },
      { latitude: lat, longitude: lng }
    );
  };

  const sortedItems = [...items].sort(
    (a, b) =>
      getDistanceMi(a.latitude, a.longitude) -
      getDistanceMi(b.latitude, b.longitude)
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Neighborhood Map</Text>
        <Text style={styles.headerSubtitle}>
          See what's available near you
        </Text>
      </View>

      <Pressable
        style={styles.locSelector}
        onPress={() => setShowLocPicker(!showLocPicker)}>
        <MapPin size={18} color={colors.primary[600]} strokeWidth={2} />
        <Text style={styles.locSelectorText} numberOfLines={1}>
          Viewing from: {refLocation.label}
        </Text>
        <ChevronDown
          size={18}
          color={colors.neutral[400]}
          strokeWidth={2}
          style={{ transform: [{ rotate: showLocPicker ? '180deg' : '0deg' }] }}
        />
      </Pressable>

      {showLocPicker && (
        <View style={styles.locDropdown}>
          <ScrollView
            style={styles.locScroll}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled>
            {DEMO_LOCATIONS.map((loc) => (
              <Pressable
                key={loc.label}
                style={[
                  styles.locOption,
                  loc.label === refLocation.label && styles.locOptionActive,
                ]}
                onPress={() => selectLocation(loc)}>
                <MapPin
                  size={16}
                  color={
                    loc.label === refLocation.label
                      ? colors.primary[600]
                      : colors.neutral[400]
                  }
                  strokeWidth={2}
                />
                <Text
                  style={[
                    styles.locOptionText,
                    loc.label === refLocation.label &&
                      styles.locOptionTextActive,
                  ]}>
                  {loc.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.mapContainer}>
        {mapHtml ? (
          <WebView
            ref={webViewRef}
            source={{ html: mapHtml }}
            style={styles.webview}
            onMessage={handleMessage}
            javaScriptEnabled
            domStorageEnabled
            originWhitelist={['*']}
            startInLoadingState
            renderLoading={() => (
              <View style={styles.webviewLoading}>
                <ActivityIndicator size="large" color={colors.primary[500]} />
              </View>
            )}
          />
        ) : (
          <View style={styles.webviewLoading}>
            <ActivityIndicator size="large" color={colors.primary[500]} />
          </View>
        )}
      </View>

      {showNearby && nearbyItems.length > 0 && (
        <View style={styles.nearbyPanel}>
          <View style={styles.nearbyHeader}>
            <Locate size={18} color={colors.primary[600]} strokeWidth={2} />
            <Text style={styles.nearbyTitle}>Nearest Items</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.nearbyScroll}>
            {nearbyItems.map((item) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.nearbyChip,
                  pressed && styles.pressed,
                ]}
                onPress={() => router.push(`/item/${item.id}`)}>
                <Text style={styles.nearbyChipTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.nearbyChipDist}>
                  {formatDistance(item.distance)}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Text style={styles.listTitle}>
          Items near {refLocation.label.split(',')[0]}
        </Text>
        {sortedItems.map((item) => {
          const dist = getDistanceMi(item.latitude, item.longitude);
          return (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.locationRow,
                pressed && styles.pressed,
              ]}
              onPress={() => router.push(`/item/${item.id}`)}>
              <Image
                source={{ uri: item.image_url }}
                style={styles.locationImage}
              />
              <View style={styles.locationInfo}>
                <Text style={styles.locationTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.locationAddress} numberOfLines={1}>
                  {item.address}
                </Text>
                <View style={styles.locationMeta}>
                  <MapPin size={12} color={colors.primary[600]} strokeWidth={2} />
                  <Text style={styles.distanceText}>
                    {formatDistance(dist)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.badge,
                    item.listing_type === 'borrow'
                      ? styles.badgeBorrow
                      : styles.badgeLend,
                  ]}>
                  <Text style={styles.badgeText}>
                    {item.listing_type === 'borrow' ? 'Borrowing' : 'Lending'}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: colors.neutral[900],
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: typography.body,
    color: colors.neutral[500],
    marginTop: 2,
  },
  locSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    backgroundColor: colors.neutral[0],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  locSelectorText: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: typography.caption,
    color: colors.neutral[700],
  },
  locDropdown: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.neutral[0],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    overflow: 'hidden',
    maxHeight: 280,
  },
  locScroll: {
    maxHeight: 280,
  },
  locOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  locOptionActive: {
    backgroundColor: colors.primary[50],
  },
  locOptionText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: typography.caption,
    color: colors.neutral[600],
  },
  locOptionTextActive: {
    color: colors.primary[700],
    fontFamily: 'Inter-SemiBold',
  },
  mapContainer: {
    height: 340,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.neutral[200],
    backgroundColor: colors.primary[50],
  },
  webview: {
    flex: 1,
    backgroundColor: colors.primary[50],
  },
  webviewLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[50],
  },
  nearbyPanel: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.neutral[0],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.primary[200],
    padding: spacing.md,
  },
  nearbyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.sm,
  },
  nearbyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: typography.body,
    color: colors.neutral[900],
  },
  nearbyScroll: {
    gap: 8,
  },
  nearbyChip: {
    backgroundColor: colors.primary[50],
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary[200],
    minWidth: 120,
  },
  nearbyChipTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: typography.caption,
    color: colors.neutral[900],
  },
  nearbyChipDist: {
    fontFamily: 'Inter-Medium',
    fontSize: typography.small,
    color: colors.primary[600],
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  listTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: typography.title,
    color: colors.neutral[900],
    marginBottom: spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    backgroundColor: colors.neutral[0],
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.neutral[200],
    marginBottom: spacing.sm,
  },
  locationImage: {
    width: 72,
    height: 72,
    resizeMode: 'cover',
  },
  locationInfo: {
    flex: 1,
    padding: spacing.sm + 2,
    justifyContent: 'center',
    gap: 2,
  },
  locationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: typography.body,
    color: colors.neutral[900],
  },
  locationAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: typography.caption,
    color: colors.neutral[500],
  },
  locationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    fontFamily: 'Inter-Medium',
    fontSize: typography.small,
    color: colors.primary[600],
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
    marginTop: 2,
  },
  badgeLend: {
    backgroundColor: colors.primary[100],
  },
  badgeBorrow: {
    backgroundColor: colors.secondary[100],
  },
  badgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: colors.neutral[700],
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
});
