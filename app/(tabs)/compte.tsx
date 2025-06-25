import { useEffect, useState, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  type LocationData = {
    latitude: number;
    longitude: number;
    timestamp: number;
  };

  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    try {
      const response = await fetch('https://d5d1-37-64-102-102.ngrok-free.app/locations');
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Erreur récupération localisation :', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
  useCallback(() => {
    fetchLocations(); 
  }, [])
);

  return (
    <ParallaxScrollView
      headerImage={
        <IconSymbol
          size={310}
          color="black"
          name="person.fill"
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Mon compte</Text>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={locations}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.stepContainer}>
                <Text>Latitude : {item.latitude}</Text>
                <Text>Longitude : {item.longitude}</Text>
                <Text>Timestamp : {new Date(item.timestamp).toLocaleString()}</Text>
              </View>
            )}
          />
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
    gap: 4,
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
