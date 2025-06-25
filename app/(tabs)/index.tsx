import { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const [location, setLocation] = useState<null | Location.LocationObject>(null);

  const handleGetLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'La permission de localisation est requise.');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d’obtenir la localisation.');
    }
  };

  return (
    <ParallaxScrollView
      headerImage={
        <IconSymbol
          size={310}
          color="black"
          name="map.fill"
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Localisation</Text>

        <Button title="Afficher ma localisation" onPress={handleGetLocation} />

        {location && (
          <View style={styles.stepContainer}>
            <Text>Latitude : {location.coords.latitude}</Text>
            <Text>Longitude : {location.coords.longitude}</Text>
          </View>
        )}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginTop: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
