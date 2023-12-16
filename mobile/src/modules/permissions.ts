import {PermissionsAndroid, NativeModules} from 'react-native';

namespace PermissionsModule {
  export async function grantPostNotification(): Promise<void> {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (!granted) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  }

  export async function grantUnknownSource(): Promise<void> {
    const granted = await NativeModules.AppsModule.checkUnknownSource();
    if (!granted) {
      NativeModules.AppsModule.requestUnknownSource();
    }
  }

  export async function grantWritePermission(): Promise<void> {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (!granted) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
    }
  }

  export async function grantReadPermission(): Promise<void> {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    if (!granted) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  }

  export async function grantInstallPermission(): Promise<void> {
    const granted = await NativeModules.AppsModule.checkInstallPermission();
    if (!granted) {
      await NativeModules.AppsModule.requestInstallPermission();
    }
  }
}

export default PermissionsModule;
