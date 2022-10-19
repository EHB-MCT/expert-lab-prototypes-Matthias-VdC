/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
// import MapViewDirections from 'react-native-maps-directions';

import MapView from 'react-native-maps';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [location, setLocation] = useState();
  const [userLocation, setUserLocation] = useState();

  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
      locationProvider: 'auto',
    });

    Geolocation.requestAuthorization(() => {
      //SUCCESS
      Geolocation.getCurrentPosition((e) => {
        console.log(e.coords.latitude, e.coords.longitude);
        setLocation({ latitude: e.coords.latitude, longitude: e.coords.longitude });
      });
    }, (err) => {
      // ERROR
      console.log(err);
    });

    Geolocation.watchPosition((e) => {
      // success
      console.log(e);
      setUserLocation({ latitude: e.coords.latitude, longitude: e.coords.longitude, heading: e.coords.heading, speed: e.coords.heading });
    }, (err) => {
      //error
      console.log(err);
    }, { interval: 1000, timeout: 1000, distanceFilter: 0 });


  }, []);

  if (!location && !userLocation) { return null; }
  return (
    <SafeAreaView>
      <MapView
        style={{ minHeight: '100%' }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={"AIzaSyDehWh4MS-F_1lInu3tDMl5_d489x2s_hM"}
      /> */}
      </MapView>
      <Text style={{ position: 'absolute', top: 0, left: 0, color: 'black', zIndex: 99 }}>{userLocation?.longitude}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
