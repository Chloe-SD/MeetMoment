/**
 * MeetMoment React Native app for Android
 * 
 *
 * 
 */

import React from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


function App(): React.JSX.Element {

 

  const handleLogin = () => {
    //TODO: Connect google login API
    Alert.alert('TODO: connect google login API');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        
        
        <View style={styles.sectionContainer}>
          
          <Image source={require('./src/assets/DonaldsApp.jpg')} style={styles.customImage}/>
          <Text style={styles.sectionTitle}>Welcome to Donald's MeetMoment App!</Text>
          <Button title='login' onPress={handleLogin} />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  customImage: {
    width: 350,
    height: 350
  },
});

export default App;
