import { OneSignal }from 'react-native-onesignal';

export function tagUserInfoCreate() {
  OneSignal.User.addTags({
    user_name: 'Pedro',
    user_email: 'pedro@email.com'
  });
}
