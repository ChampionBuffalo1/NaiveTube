import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Main from './components/MainScreen';
import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {
  return <Main />;
}
