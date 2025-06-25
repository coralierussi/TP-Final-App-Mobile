import { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const [location, setLocation] = useState<null | Location.LocationObject>(null);
  const [loading, setLoading] = useState(false);

const handleToggleLocation = async () => {
  if (location) {
    setLocation(null);
  } else {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'La permission de localisation est requise.');
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      const data = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        timestamp: currentLocation.timestamp,
      };

      const response = await fetch('https://d5d1-37-64-102-102.ngrok-free.app/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Alert.alert('Succès');
      } else {
        Alert.alert('Erreur', 'Impossible d’envoyer la localisation');
      }
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible d’obtenir ou d’envoyer la localisation.');
      console.error(error);
    } finally {
      setLoading(false);
    }
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

        <Button
          title={location ? "Cacher la localisation" : "Afficher ma localisation"}
          onPress={handleToggleLocation}
          disabled={loading}
        />

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
  stepContainer: {
    gap: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
