import { OneSignal }from 'react-native-onesignal';

export function tagUserEmailDelete() {
  OneSignal.User.removeTag("user_email");
}
