import { StyleSheet, Text, View } from "react-native";

const NewMeetingScreen = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>New Meeting Screen</Text>
            
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
  });
  
  export default NewMeetingScreen;