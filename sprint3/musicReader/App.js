/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import LocalNotification from './LocalNotification';
import { AppRegistry } from 'react-native';
import RNAndroidNotificationListener, { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [musicTitle, setMusicTitle] = useState();
  const [musicArtist, setMusicArtist] = useState();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    (async () => {
      // To check if the user has permission
      const status = await RNAndroidNotificationListener.getPermissionStatus();
      console.log(status); // Result can be 'authorized', 'denied' or 'unknown'

      if (status === 'denied' || status === 'unknown') {
        // To open the Android settings so the user can enable it
        RNAndroidNotificationListener.requestPermission();
      }

      if (status === 'authorized') {
        const headlessNotificationListener = async ({ notification }) => {
          const noti = JSON.parse(notification);
          if (noti) {
            console.log(noti);
            // SPOTIFY
            if (noti.app === 'com.spotify.music') {
              setMusicTitle(noti.title);
              setMusicArtist(noti.text);
            }
            // SOUNDCLOUD
            if (noti.app === 'com.soundcloud.android') {
              setMusicTitle(noti.title);
              setMusicArtist(noti.text);
            }
            //DEEZER
            if (noti.app === 'deezer.android.app') {
              setMusicTitle(noti.title);
              setMusicArtist(noti.text);
            }
          }
        };
        AppRegistry.registerHeadlessTask(RNAndroidNotificationListenerHeadlessJsName, () => headlessNotificationListener);
      }
    })();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.header}>
          Currently playing:
        </Text>
        <Text style={styles.textStyle}>
          {musicTitle}
          {'\n'}
          by
          {'\n'}
          {musicArtist}
        </Text>

        <LocalNotification />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontSize: 20,
  },
  header: {
    color: 'white',
    fontSize: 32,
  },
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
