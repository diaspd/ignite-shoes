import { OneSignal }from 'react-native-onesignal';

export function tagUserInfoCreate() {
  OneSignal.User.addTags({
    user_email: 'pedro@email.com'
  });
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.User.addTag("card_items_count", itemsCount)
}