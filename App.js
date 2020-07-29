import React, {useEffect, useState} from 'react';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {Text, Alert} from 'react-native';

const App = () => {
  const [biometryType, setBiometryType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fingerprintConfig = {
    title: 'Log In',
    subTitle: 'to get in',
    description: 'testing',
    cancelButton: 'cancel',
    onAttempt: () => null,
  };

  useEffect(() => {
    isFingerprintAvailable();
    return FingerprintScanner.release();
  }, []);

  const isFingerprintAvailable = async () => {
    try {
      const isAvailable = await FingerprintScanner.isSensorAvailable();
      setBiometryType(isAvailable);
    } catch (error) {
      setErrorMessage(error.name);
    }
  };
  if (biometryType) {
    console.log('lanjut bang');
    FingerprintScanner.authenticate(fingerprintConfig).then(() =>
      Alert.alert('Authentication Successfully'),
    );
  }
  return (
    <>
      <Text>{biometryType}</Text>
      <Text>{errorMessage}</Text>
    </>
  );
};

export default App;
