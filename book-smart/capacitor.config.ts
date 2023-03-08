import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.reactionic.com',
  appName: 'book-smart',
  webDir: 'build',
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 12345
    }
  },
  bundledWebRuntime: false
};

export default config;
