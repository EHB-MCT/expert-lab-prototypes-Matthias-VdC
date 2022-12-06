import React, { useEffect, useRef, useState } from 'react';
import {
    AppRegistry,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import RNAndroidNotificationListener, { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import retrieveUserSession from '../hooks/retrieveUserSession';
import storeUserSession from '../hooks/storeUserSession';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function HomeScreen() {
    const isDarkMode = useColorScheme() === 'dark';

    const [musicTitle, setMusicTitle] = useState();
    const [musicArtist, setMusicArtist] = useState();
    const previousTitle = useRef(null);
    const previousArtist = useRef(null);

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
            console.log('permission', status); // Result can be 'authorized', 'denied' or 'unknown'

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
                            // ignore massive base64 text in log
                            noti.iconLarge = '';
                            console.log(noti);
                            if (noti.title === 'Advertisement') { return; }
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
                await AppRegistry.registerHeadlessTask(RNAndroidNotificationListenerHeadlessJsName, () => headlessNotificationListener);
            }
        })();
    }, []);

    useEffect(() => {
        if (musicArtist && musicTitle) {
            if (musicArtist.length > 0 && musicTitle.length > 0) {
                postSong();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [musicArtist, musicTitle]);


    async function postSong() {
        await fetch('http://192.168.1.12:3000/songcollection/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ artist: musicArtist, song: musicTitle, preciseLocation: [0, 0], location: 0, token: await retrieveUserSession(), user: await EncryptedStorage.getItem('user') }),
        })
            .then(res => res.json())
            .then(data => {
                console.log('data', JSON.stringify(data));
            })
            .catch(err => { throw console.log(err); });
    }

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <ScrollView>
                <Text>
                    HOMEPAGE
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

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
