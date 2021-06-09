import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MapScreen} from '../screens/MapScreen';
import {PermissionScreen} from '../screens/PermissionScreen';
import {PermissionContext} from '../context/PermissionContext';
import {LoadingScreen} from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export const StackNavigation = () => {
  const {permissions} = useContext(PermissionContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName="PermissionScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {permissions.locationStatus === 'granted' ? (
        <Stack.Screen name="MapScreen" component={MapScreen} />
      ) : (
        <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
      )}
    </Stack.Navigator>
  );
};
