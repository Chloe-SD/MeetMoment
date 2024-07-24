import {StyleSheet, Text} from 'react-native';

export default function MeetingTitleValidation({valid}: {valid: boolean}) {
  if (valid === false) {
    return <Text style={styles.validation}>The title is required.</Text>;
  } else {
    return <Text></Text>;
  }
}

const styles = StyleSheet.create({
  validation: {
    color: 'red',
    marginBottom: 20,
    fontSize: 15,
    paddingLeft: 10,
  },
});
