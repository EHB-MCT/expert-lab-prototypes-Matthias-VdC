import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar hidden={false} />
      <ScrollView
        style={styles.view}
        contentInsetAdjustmentBehavior="automatic">
        <Image
          source={require('./app/assets/background.jpg')}
          style={styles.backgroundImage}
        />
        <View style={styles.view}>
          <Image
            source={require('./app/assets/biolab.png')}
            style={styles.middleIcon}
          />
          <Text>Test</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  view: {
    flex: 1,
    position: 'absolute',
  },
  middleIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [
      {
        translateX: Dimensions.get('screen').width * 0.5,
      },
      {
        translateY: Dimensions.get('screen').height * 0.5,
      },
    ],
  },
});

export default App;
