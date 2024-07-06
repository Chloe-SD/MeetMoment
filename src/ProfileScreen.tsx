import { Button, StyleSheet, Text, View } from "react-native";
import { useUser } from "./context/UserContext";



const ProfileScreen = () => {
  const { user, setUser } = useUser();
    
    const handleLogout = () => {
      setUser(null);
    };

    if (!user) {
        //TODO: Determine action if no user is logged in (Should not happen but best to make sure)
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Profile</Text>
            <Text style={styles.info}>Name: {user.name}</Text>
            <Text style={styles.info}>Email: {user.email}</Text>
            <Button title='logout' onPress={handleLogout} />
        </View>
      
    );
  };
  
  const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    container: {
        marginTop: 32,
        paddingHorizontal: 24,
        flex: 1,
        //justifyContent: 'center', 
    },
    info: {
        fontSize: 18,
        marginBottom: 8,
    },
  });
  
  export default ProfileScreen;