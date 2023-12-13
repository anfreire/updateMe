import {PermissionsAndroid, NativeModules} from 'react-native';

namespace PermissionsModule {
  export function grantUnknownSource(): void {
    NativeModules.AppsModule.checkUnknownSource().then((res: boolean) => {
      !res ? NativeModules.AppsModule.requestUnknownSource() : null;
    });
  }

  export function grantReadPermission(): void {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ).then(hasPermission => {
      if (!hasPermission) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
      }
    });
  }

  export function grantWritePermission(): void {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ).then(hasPermission => {
      if (!hasPermission) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    });
  }
}

export default PermissionsModule;
