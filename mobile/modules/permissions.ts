import {NativeModules, PermissionsAndroid} from 'react-native';
const {MyAppsModule} = NativeModules;

namespace Permissions {
  export type PermissionType = 'READ' | 'WRITE' | 'INSTALL';

  export async function getPermissions(type: PermissionType) {
    switch (type) {
      case 'READ':
        return await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      case 'WRITE':
        return await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
      case 'INSTALL':
        return await MyAppsModule.checkUnkwonSource();
    }
  }

  export async function requestPermissions(type: PermissionType) {
    switch (type) {
      case 'READ':
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      case 'WRITE':
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
      case 'INSTALL':
        MyAppsModule.requestUnkwonSource();
        return;
    }
  }
}

export default Permissions;
