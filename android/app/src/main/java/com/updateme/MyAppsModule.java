package com.updateme;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.util.Log;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.HashMap;
import java.util.Map;

public class MyAppsModule extends ReactContextBaseJavaModule {
  MyAppsModule(ReactApplicationContext context) { super(context); }

  @Override
  public String getName() {
    return "MyAppsModule";
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String getAppVersion(String packageName) {
    try {
      PackageManager pm = getReactApplicationContext().getPackageManager();
      PackageInfo pInfo = pm.getPackageInfo(packageName, 0);
      return pInfo.versionName;
    } catch (PackageManager.NameNotFoundException e) {
      return "N/A";
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public Boolean checkUnkwonSource() {
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
      return getReactApplicationContext()
          .getPackageManager()
          .canRequestPackageInstalls();
    }
    return true;
  }

  @ReactMethod()
  public void requestUnkwonSource() {
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
      android.content.Intent intent = new android.content.Intent(
          android.provider.Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES);
      intent.setFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
      getReactApplicationContext().startActivity(intent);
    }
  }
}