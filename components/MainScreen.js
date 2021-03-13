import * as React from "react";

// Navigators
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "./screen/HomeScreen";
import YouTubeSearch from "./screen/YouTube/YouTubeScreen";
import NASA_APOD from "./screen/NasaResults";
import YouTubePlayer from "./screen/YouTube/YouTubePlayer";

const HomeStack = createStackNavigator();
export default function MainScreen() {
  return (
    <NavigationContainer>
     <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="YouTube" component={YouTubeSearch} />
      <HomeStack.Screen name="YouTubePlayer" component={YouTubePlayer} 
      options={{
        title: "YouTube Player"
      }}
      />
      <HomeStack.Screen
        name="nasaApod"
        component={NASA_APOD}
        options={{ title: "Astronomy Picture of the Day" }}
      />
    </HomeStack.Navigator>
   </NavigationContainer>
  );
}