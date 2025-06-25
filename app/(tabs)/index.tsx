import { Text, View, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
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
      <View>
        <Text style={styles.title}>Localisation </Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
  }
});
