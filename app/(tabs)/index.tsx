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
      // Si localisation affichée, on la cache
      setLocation(null);
    } else {
      // Sinon on demande la localisation
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
      } catch (error) {
        Alert.alert('Erreur', 'Impossible d’obtenir la localisation.');
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
