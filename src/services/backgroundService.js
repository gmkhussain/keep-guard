// src/services/backgroundService.js
import BackgroundService from 'react-native-background-actions';
import PushNotification from 'react-native-push-notification';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const backgroundTask = async () => {
console.log("bg");
  while (BackgroundService.isRunning()) {
    try {
      // Send notification
      PushNotification.localNotification({
        channelId: 'default-channel-id',
        title: 'Keep Guard',
        message: 'This is a background notification!',
        allowWhileIdle: true,
      });

      console.log('Notification sent');

      // Wait 10 seconds
      await sleep(10000);
    } catch (e) {
      console.log('Background task error:', e);
    }
  }
};

export const startBackgroundService = async () => {
    console.log("Star");
  const options = {
    taskName: 'KeepGuard Service',
    taskTitle: 'KeepGuard Running',
    taskDesc: 'Sending notification every 10 seconds',
    taskIcon: { name: 'ic_launcher', type: 'mipmap' },
    color: '#ff00ff',
    parameters: {},
    notificationPriority: 'HIGH',
  };

  if (!BackgroundService.isRunning()) {
    console.log("bg not", options);
    await BackgroundService.start(backgroundTask, options);
  }
};
