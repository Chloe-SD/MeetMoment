import {StyleSheet, Text} from 'react-native';

export default function ParticipantValidation({
  isEmpty,
  isEmail,
  hasParticipants,
}: {
  isEmpty: boolean;
  isEmail: boolean;
  hasParticipants: boolean;
}) {
  if (isEmpty) {
    return <Text style={styles.validation}>The participant is required.</Text>;
  } else if (isEmail) {
    return <Text style={styles.validation}>Must be an email</Text>;
  } else if (!hasParticipants) {
    return (
      <Text style={styles.validation}>Must add at least one participant</Text>
    );
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