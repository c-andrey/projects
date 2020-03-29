import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator
} from '@react-navigation/stack';
import React from 'react';
import Detail from './pages/Detail/Detail';
import Incidents, { Incident } from './pages/Incidents/Incidents';

type RootStackParamList = {
  Incidents: undefined;
  Detail: { incident: Incident };
};

export interface RoutesProps {}

const AppStack = createStackNavigator<RootStackParamList>();

export default function Routes(_props: RoutesProps) {
  return (
    <NavigationContainer>
      <AppStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen
          name="Detail"
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          component={Detail}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
