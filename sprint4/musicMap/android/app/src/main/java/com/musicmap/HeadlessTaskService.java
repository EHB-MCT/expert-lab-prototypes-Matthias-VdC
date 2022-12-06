package com.musicmap;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;

public class HeadlessTaskService extends HeadlessJsTaskService {

    @Override
    protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        if (extras != null) {
            return new HeadlessJsTaskConfig(
                    "RNAndroidNotificationListenerHeadlessJs",
                    Arguments.fromBundle(extras),
                    1000, // timeout for the task (5000 = 5 min)
                    true // optional: defines whether or not the task is allowed in foreground. Default
                         // is false
            );
        }
        return null;
    }
}