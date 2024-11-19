import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from "./screens/HomePage";
import MenuScreen from "./screens/MenuScreen";


  const Stack = createNativeStackNavigator();

  export default function App () {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
        name="HomePage"
        component={HomePage} 
        options={{ headerShown: false }}
      />

        <Stack.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{ title: 'Menu' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// OpenAI. 2024. Chat-GPT (Version 3.5). [Large langauge model]. Available at: https://chatgpt.com/c/66f5e74b-eb2c-8013-ab03-a380f0ef6f1e [Accessed: 30 October 2024].