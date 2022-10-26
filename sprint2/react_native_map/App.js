import { Node, useRef } from 'react';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import mapstyle from './mapstyle.json';
import MapMarkers from './MapMarkers.js';
import Geolocation from '@react-native-community/geolocation';
// import MapViewDirections from 'react-native-maps-directions';
import UserMapIcon from './UserMapIcon.js';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MapView, { Marker } from 'react-native-maps';
import { magnetometer, SensorTypes, setUpdateIntervalForType } from 'react-native-sensors';
import { map, filter } from 'rxjs/operators';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [location, setLocation] = useState({ longitude: 4.3230004, latitude: 50.8416775 });
  const [heading, setHeading] = useState(0);
  const previousLocation = useRef({});
  const mapRef = useRef();
  const apiKey = process.env.API_KEY;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    if (subscription) {
      subscription.remove();
    }

    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
      locationProvider: 'auto',
    });

    Geolocation.requestAuthorization(() => {
      //SUCCESS
      console.log('location authorized');

      Geolocation.watchPosition((e) => {
        setLocation({ longitude: e.coords.longitude, latitude: e.coords.latitude });
        mapRef.current.animateCamera({
          center: {
            latitude: e.coords.latitude,
            longitude: e.coords.longitude,
          },
          heading: heading,
          altitude: 1000,
          pitch: 0,
          zoom: 15,
        }, 1000);
      }, {}, { interval: 500, distanceFilter: 0, enableHighAccuracy: true });

    }, (err) => {
      // ERROR
      console.log(err);
    });

    setUpdateIntervalForType(SensorTypes.magnetometer, 100); //every 100ms

    const subscription = magnetometer
      .subscribe(
        sensorData => {
          mapRef.current.getCamera(camera => {
            console.log(camera);
          }, (err) => {
            console.log(err);
          });
          setHeading(getAngle(sensorData) + 190);
        },
        error => {
          console.log('The sensor is not available');
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // adapted from: https://github.com/rahulhaque/compass-react-native/blob/master/App.js
  function getAngle({ x, y, z }) {
    let angle = 0;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }
    return Math.round(angle);
  }


  useEffect(() => {
    previousLocation.current = location;
  }, [location]);

  return (
    <SafeAreaView>
      <MapView
        pitchEnabled={false}
        zoomEnabled={false}
        scrollEnabled={false}
        rotateEnabled={false}
        loadingEnabled={true}
        followsUserLocation={true}
        moveOnMarkerPress={false}
        style={{ minHeight: '100%' }}
        customMapStyle={mapstyle}
        ref={mapRef}
        initialCamera={{
          zoom: 15,
          center: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          heading: heading,
          altitude: 1000,
          pitch: 0,
        }}
        camera={{
          zoom: 15,
          center: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          heading: heading,
          altitude: 1000,
          pitch: 0,
        }}
        showsCompass={false}
      >
        <Marker coordinate={location} flat anchor={{ x: 0.5, y: 0.5 }}>
          <View
            style={{
              transform: [{ rotate: `${heading}deg` }],
            }}>
            <UserMapIcon fill="#98f5e1" stroke="#fbf8cc" strokeWidth={4} style={{ transform: [{ rotate: '180deg' }] }} />
          </View>
        </Marker>
        <MapMarkers title="Random Info" />
        {/* onMarkerPress={(e) => {
          console.log(e.currentTarget, 1000);
          // mapRef.current.animateToRegion()
        } */
        }
        {/* <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={apiKey}
      /> */}
      </MapView>
      <Text style={{ position: 'absolute', top: 5, left: 5, fontSize: 28, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 6, padding: 12 }}>
        {/* {'\n'} */}
        Heading: {heading}
      </Text>
    </SafeAreaView >
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
