import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {

    const handleLogin = () => {
        //TODO: Connect google login API
        Alert.alert('TODO: connect google login API');
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <Image source={require('./assets/DonaldsApp.jpg')} style={styles.customImage}/>
            <Text style={styles.sectionTitle}>Welcome to Donald's MeetMoment App! cb</Text>
            <Button title='login' onPress={handleLogin} />
        </View>
      
    );
  };
  
  const styles = StyleSheet.create({
    title: {
        fontSize: 24,
    },
    container: {
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
  
  export default HomeScreen;