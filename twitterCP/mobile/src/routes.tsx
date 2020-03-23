import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './pages/Login';
import Timeline from './pages/Timeline';
import New from './pages/New';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

type RootStackParamList = {
  Login: undefined;
  Timeline: undefined;
  New: undefined;
};

const timelineOptions = {
  title: 'Início',
  headerRight: () => (
    <TouchableOpacity>
      <Icon
        style={{ marginRight: 20 }}
        name="add-circle-outline"
        size={24}
        color="#4BB0EE"
      />
    </TouchableOpacity>
  ),
};
const Stack = createStackNavigator<RootStackParamList>();
function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Timeline"
          component={Timeline}
        />
        <Stack.Screen name="New" component={New} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
