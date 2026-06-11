import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />
      <WebView 
        source={{ uri: 'https://fractal-frontend-six.vercel.app/' }} 
        style={{ flex: 1 }} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    paddingTop: StatusBar.currentHeight || 0,
  },
});