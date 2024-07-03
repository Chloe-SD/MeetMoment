/**
 * MeetMoment React Native app for Android
 * 
 *
 * 
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleLogin = () => {
    //TODO: Connect google login API
    Alert.alert('TODO: connect google login API');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
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
