import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import notifee from '@notifee/react-native';
import { Button, View } from 'react-native';

const LocalNotification: () => Node = () => {
    async function onDisplayNotification() {
        // Request permissions (required for iOS)
        await notifee.requestPermission();

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: 'Notification Title',
            body: 'Main body content of the notification',
            android: {
                channelId,
                smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: 'default',
                },
            },
        });
    }

    return (
        <View>
            <Button title="Display Notification" onPress={() => onDisplayNotification()} />
        </View>
    );
};

export default LocalNotification;
