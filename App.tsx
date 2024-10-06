import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { OneSignal, type NotificationClickEvent } from 'react-native-onesignal'

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';

import { ONESIGNAL_ANDROID_FCM_ID } from '@env';
import { ONESIGNAL_IOS_APNS_ID } from '@env';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';

const oneSignalAppId = Platform.OS === "ios" ? 
ONESIGNAL_IOS_APNS_ID : ONESIGNAL_ANDROID_FCM_ID

OneSignal.initialize(oneSignalAppId)
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate()

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent) => {
      const { actionId } = event.result

      switch(actionId) {
        case "1": 
          console.log("Ver todos")
          break
        case "2": 
          console.log("Ver pedido")
          break
        default: 
          console.log("Nenhum botão de ação selecionado")
          break
      }
    }

    OneSignal.Notifications.addEventListener("click", handleNotificationClick)

    return () => 
      OneSignal.Notifications.removeEventListener(
        "click",
        handleNotificationClick
      )
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}