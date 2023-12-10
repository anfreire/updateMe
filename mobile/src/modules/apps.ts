import {NativeModules} from 'react-native';
import {InstalledApps} from 'react-native-launcher-kit';
import RNFetchBlob from 'rn-fetch-blob';
const {MyAppsModule} = NativeModules;

namespace Apps {
  export function getAllApps() {
    return InstalledApps.getApps().map(app => app.packageName);
  }

  export function isAppInstalled(packageName: string) {
    return (
      InstalledApps.getApps().find(app => app.packageName === packageName) !==
      undefined
    );
  }

  export async function getAppVersion(
    packageName: string,
  ): Promise<string | null> {
    const version = await MyAppsModule.getAppVersion(packageName);
    console.log(version, packageName);
    return version === 'N/A' ? null : version;
  }

  export async function installAPK(path: string) {
    await RNFetchBlob.android.actionViewIntent(
      path,
      'application/vnd.android.package-archive',
    );
  }

  export function uninstallApp(packageName: string) {
    MyAppsModule.uninstallApp(packageName);
  }
}

export default Apps;
