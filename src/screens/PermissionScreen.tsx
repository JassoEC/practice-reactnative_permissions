import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BlackButton} from '../components/BlackButton';
import {PermissionContext} from '../context/PermissionContext';

export const PermissionScreen = () => {
  const {permissions, askLocationPermission} = useContext(PermissionContext);
  return (
    <View style={styles.container}>
      <Text>Permission Screen</Text>
      <BlackButton title="Permiso" onPress={askLocationPermission} />

      <Text style={{marginTop: 20}}>
        {JSON.stringify(permissions, null, 5)}
      </Text>
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
