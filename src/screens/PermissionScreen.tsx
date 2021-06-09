import React from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import {PERMISSIONS, PermissionStatus, request} from 'react-native-permissions';

export const PermissionScreen = () => {
  const chekLocationPermission = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }

    console.log({permissionStatus});
  };
  return (
    <View style={styles.container}>
      <Text>Permission Screen</Text>
      <Button title="Permiso" onPress={chekLocationPermission} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
