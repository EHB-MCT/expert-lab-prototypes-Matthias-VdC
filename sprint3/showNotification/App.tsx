// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useEffect, useState} from 'react';
import notifee, {AndroidVisibility, EventType} from '@notifee/react-native';
import {Button, View} from 'react-native';

const LocalNotification = () => {
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      badge: true,
      visibility: AndroidVisibility.PUBLIC,
    });

    notifee.onForegroundEvent(async ({type, detail}) => {
      if (
        type === EventType.ACTION_PRESS &&
        detail?.pressAction?.id === 'close'
      ) {
        await notifee.stopForegroundService();
      }
    });

    notifee.onBackgroundEvent(async ({type, detail}) => {
      if (
        type === EventType.ACTION_PRESS &&
        detail?.pressAction?.id === 'close'
      ) {
        await notifee.stopForegroundService();
      }
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Testing Title',
      body: 'Main body content of the notification',
      android: {
        asForegroundService: true,
        progress: {
          max: 10,
          current: 5,
          indeterminate: true,
        },
        actions: [
          {
            title: 'Close',
            pressAction: {
              id: 'close',
            },
            input: {
              allowFreeFormInput: false,
              choices: ['close'],
            },
          },
        ],
        channelId,
        //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <View>
      <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      />
    </View>
  );
};

export default LocalNotification;
