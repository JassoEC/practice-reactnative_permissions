import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigation} from './src/navigation/StackNavigation';
import {PermissionProvider} from './src/context/PermissionContext';

const AppState = ({children}: any) => {
  return <PermissionProvider>{children}</PermissionProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigation />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
