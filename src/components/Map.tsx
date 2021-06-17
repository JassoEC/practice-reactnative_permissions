import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens/LoadingScreen';
import {Fab} from './Fab';

interface Props {
  markers?: Marker[];
}
export const Map = ({markers}: Props) => {
  const {
    initialPosition,
    hasLocation,
    userLocation,
    routeLines,
    getCurrentLocation,
    followUserLocation,
    stopFollowLocation,
  } = useLocation();
  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);
  const [showPolyline, setShowPolyline] = useState(false);

  useEffect(() => {
    followUserLocation();

    return () => stopFollowLocation();
  }, []);

  useEffect(() => {
    if (!following.current) return;
    const {latitude, longitude} = userLocation;
    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  }, [userLocation]);

  const centerPosition = async () => {
    following.current = true;
    const location = await getCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: location,
    });
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        ref={element => (mapViewRef.current = element!)}
        showsUserLocation
        style={{flex: 1}}
        initialRegion={{
          latitude: initialPosition?.latitude!,
          longitude: initialPosition?.longitude!,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => (following.current = false)}>
        {showPolyline && (
          <Polyline
            coordinates={routeLines}
            strokeColor="black"
            strokeWidth={3}
          />
        )}
      </MapView>
      <Fab
        iconName="brush-outline"
        onPress={() => setShowPolyline(!showPolyline)}
        style={{
          position: 'absolute',
          bottom: 80,
          right: 20,
        }}
      />
      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />
    </>
  );
};
