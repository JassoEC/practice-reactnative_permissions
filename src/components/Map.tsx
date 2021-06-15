import React, {useEffect, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens/LoadingScreen';
import {Fab} from './Fab';

interface Props {
  markers?: Marker[];
}
export const Map = ({markers}: Props) => {
  const {initialPosition, hasLocation, getCurrentLocation} = useLocation();
  const mapViewRef = useRef<MapView>();

  const centerPosition = async () => {
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
        }}>
        {/* Iterar sobre marcadores */}
        {/*  <Marker
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          title="Prueba"
          description="Algo chido con mapas"
        /> */}
      </MapView>
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
