import { defaultPeerConnectionConfig } from "@/work/peerConnection";

export interface AppPreferences {
  customICEServerConfig: RTCConfiguration;
}

class AppPreferencesManager {
  constructor() {}

  static storageKey = "AppPreferences";
  static defaultAppPreferences: AppPreferences = {
      customICEServerConfig: defaultPeerConnectionConfig,
  };

  get appPreferences(): AppPreferences {
    let rawString = localStorage.getItem(AppPreferencesManager.storageKey);
    if (rawString === null) {
        this.appPreferences = AppPreferencesManager.defaultAppPreferences;
        rawString = localStorage.getItem(AppPreferencesManager.storageKey);
        if (rawString === null) {
            throw new Error("AppPreferencesManager: default app preferences could not be set");
        }
    }
    return JSON.parse(rawString!);
  }

  set appPreferences(appPreferences: AppPreferences) {
    localStorage.setItem(AppPreferencesManager.storageKey, JSON.stringify(appPreferences));
  }
}

export const appPreferencesManager = new AppPreferencesManager();
