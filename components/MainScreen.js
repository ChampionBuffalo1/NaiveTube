import * as React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screen/HomeScreen';
import YouTubeSearch from './screen/YouTube/YouTubeScreen'
import NASA_APOD from './screen/NasaResults';
import YouTubePlayer from './screen/YouTube/YouTubePlayer';

const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') 
              iconName = focused ? 'home' : 'home-outline';
             else if (route.name === 'Settings') 
              iconName = focused ? 'settings' : 'settings-outline';
            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
};

// Only use if you want to add more Screens on stacks
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="YouTube" component={YouTubeSearch} />
      <HomeStack.Screen name="YouTubePlayer" component={YouTubePlayer} />
      <HomeStack.Screen name="nasaApod" component={NASA_APOD}  options={{ title: 'Astronomy Picture of the Day' }}/>
    </HomeStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}
