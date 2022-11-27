import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import {
  AppRegistry,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import usePrevious from './hooks/usePrevious.js';
import RNAndroidNotificationListener, { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [musicTitle, setMusicTitle] = useState();
  const [musicArtist, setMusicArtist] = useState();
  const previousTitle = useRef(null);
  const previousArtist = useRef(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    previousArtist.current = musicArtist;
  }, [musicArtist]);
  useEffect(() => {
    previousTitle.current = musicTitle;
  }, [musicTitle]);


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
            // cancel multiple calls for same song triggering
            if (!(noti.title === previousTitle.current) && !(noti.text === previousArtist.current)) {
              noti.iconLarge = '';
              console.log(noti);
              // if (noti.title === 'Advertisement') { return; }
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
            } else {
              console.log('Music already played!');
            }
          }
        };
        AppRegistry.registerHeadlessTask(RNAndroidNotificationListenerHeadlessJsName, () => headlessNotificationListener);

        console.log('runnable', AppRegistry.getAppKeys('RNAndroidNotificationListenerHeadlessJs'));

      }
    })();


  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
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
      </ScrollView>
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
