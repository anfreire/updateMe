import {NativeModules} from 'react-native';
import {InstalledApps} from 'react-native-launcher-kit';
const {MyAppsModule} = NativeModules;

export enum AppStatus {
  INSTALLED,
  NOT_INSTALLED,
  OUTDATED,
}

namespace Apps {
  export function getAllApps() {
    return InstalledApps.getApps();
  }

  export function isAppInstalled(packageNmae: string) {
    return (
      InstalledApps.getApps().find(app => app.packageName === packageNmae) !==
      undefined
    );
  }

  export async function getAppVersion(
    packageName: string,
  ): Promise<string | null> {
    const version = await MyAppsModule.getAppVersion(packageName);
    return version === 'N/A' ? null : version;
  }

  export async function getAppStatus(packageName: string, version: string) {
    if (!isAppInstalled(packageName)) return AppStatus.NOT_INSTALLED;
    return (await getAppVersion(packageName)) === version;
  }
}

export default Apps;
