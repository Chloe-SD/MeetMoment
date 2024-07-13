import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { User } from "../types";
import { useUser } from "../context/UserContext";



const LoginScreen = () => {
    const { setUser } = useUser();
    
    const handleLoginDev = () => {
      const user: User = { name: 'dev', email: 'dev@dev.com' };
      setUser(user);
    };

    const handleGoogleLogin = async() => {
        Alert.alert("TODO: Implement google login API")
    };


    return (
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Login Screen</Text>
          <Button title="login with google" onPress={handleGoogleLogin} />
          <Button title="Login as 'dev'" onPress={handleLoginDev} />
        </View>
      );
    };
  
  const styles = StyleSheet.create({
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
  
  export default LoginScreen;

  //return (
    //     <View style={styles.container}>
    //         <Text style={styles.sectionTitle}>Login Screen, MeetMoment App</Text>
    //         <Text>TODO: Implement "Login with Google" API</Text>
    //         <Button title='login with google' onPress={handleLogin} />
    //         <Button title='login as dev' onPress={handleLoginDev} />
    //     </View>
      
    // );