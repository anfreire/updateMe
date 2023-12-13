import {NativeModules} from 'react-native';

namespace AppsModule {
  export function getAllApps(): Promise<string[]> {
    return NativeModules.AppsModule.getAllApps();
  }

  export function getAppVersion(packageName: string): Promise<string | null> {
    return NativeModules.AppsModule.getAppVersion(packageName);
  }

  export function isAppInstalled(packageName: string): Promise<boolean> {
    return NativeModules.AppsModule.isAppInstalled(packageName);
  }
}

export default AppsModule;
