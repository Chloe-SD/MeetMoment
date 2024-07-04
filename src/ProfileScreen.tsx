import { Alert, Button, StyleSheet, Text, View } from "react-native";

const ProfileScreen = () => {

    const handleLogout = () => {
        //TODO: Make logout process
        Alert.alert('NO!! :P');
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>This will be a user profile screen</Text>
            <Button title='logout' onPress={handleLogout} />
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
  });
  
  export default ProfileScreen;