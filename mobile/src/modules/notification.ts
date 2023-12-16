import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, {
  Notification,
  NotificationAndroid,
} from '@notifee/react-native';
import AppsModule from './apps';
import PermissionsModule from './permissions';
import {SourceKeysType, initialSource} from '../hooks/useSource';
import {firebase} from '@react-native-firebase/database';
import {ImageSourcePropType} from 'react-native';
import {useEffect} from 'react';

const packageNameToMacro: {[key: string]: SourceKeysType} = {
  'com.hdobox': 'HDO',
  'com.mgoogle.android.gms': 'YOUTUBE_MICROG',
  'app.revanced.android.youtube': 'YOUTUBE_YOUTUBE',
  'app.revanced.android.apps.youtube.music': 'YOUTUBE_MUSIC',
  'com.spotify.music': 'SPOTIFY',
  'com.aeroinsta.android': 'INSTAGRAM',
  'com.aero': 'WHATSAPP',
  'com.lemon.lvoverseas': 'CAPCUT',
  'photo.editor.photoeditor.photoeditorpro': 'PHOTO_EDITOR_PRO',
  'com.adobe.psmobile': 'PHOTOSHOP_EXPRESS',
  'com.camerasideas.instashot': 'INSHOT',
  'com.twitter.aeromod': 'TWITTER',
};

namespace NotificationsModule {
  async function displayNotification(
    message: FirebaseMessagingTypes.RemoteMessage,
  ): Promise<void> {
    console.log(message);
    if (!message.data) return;
    const data: {[key: string]: SourceKeysType} = message.data as any;
    const packagesName = Object.keys(message.data);
    let updateVersions: SourceKeysType[] = [];
    await Promise.all(
      packagesName.map(async packageName => {
        const currVersion = await AppsModule.getAppVersion(packageName);
        if (currVersion && currVersion !== data[packageName]) {
          updateVersions.push(packageNameToMacro[packageName]);
        }
      }),
    );
    if (updateVersions.length > 1)
      sendNotification(
        'Updates Available!',
        'Multiple apps have updates available',
      );
    else if (updateVersions.length === 1)
      sendNotification(
        'Update Available!',
        `${initialSource[updateVersions[0]].title} has an update available`,
        initialSource[updateVersions[0]].icon,
      );
  }

  export async function addTokenToDatabase(): Promise<void> {
    try {
      await PermissionsModule.grantPostNotification();
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      const tokenRef = firebase
        .app()
        .database(
          'https://updateme-8f42b-default-rtdb.europe-west1.firebasedatabase.app/',
        )
        .ref('/devices/' + token);
      const snapshot = await tokenRef.once('value');
      if (snapshot.exists()) return;
      await tokenRef.set(true);
    } catch (e) {
      return;
    }
  }

  async function sendNotification(
    title: string,
    body: string,
    largeIcon?: ImageSourcePropType,
  ) {
    const channelId = await notifee.createChannel({
      id: 'updateMe',
      name: 'Update Me - Notifications',
    });
    let androidObject: NotificationAndroid = {
      channelId: channelId,
      smallIcon: 'update_notify',
      pressAction: {
        id: 'default',
        launchActivity: 'com.updateme.MainActivity',
      },
    };
    if (largeIcon) androidObject.largeIcon = largeIcon;
    const data: Notification = {
      title: title,
      body: body,
      android: androidObject,
    };
    await notifee.displayNotification(data);
  }

  export function background() {
    PermissionsModule.grantPostNotification().then(() => {
      messaging().setBackgroundMessageHandler(displayNotification);
      messaging().subscribeToTopic('updateMe');
    });
  }

  export async function foreground() {
    useEffect(() => {
      const unsubscribe = messaging().onMessage(displayNotification);
      return unsubscribe;
    }, []);
  }
}

export default NotificationsModule;
