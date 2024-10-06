import { Ionicons } from '@expo/vector-icons';
import { HStack, Text, IconButton, CloseIcon, Icon, Pressable } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import type { OSNotification } from 'react-native-onesignal';

type Props = {
  data: OSNotification;
  onClose: () => void;
}

type AdditionalDataProps = {
  route?: string;
  product_id?: string;
}

export function Notification({ data, onClose }: Props) {
  const { navigate } = useNavigation()

  function handleOnPress() {
    const { route, product_id } = data.additionalData as AdditionalDataProps

    if (route === 'details' && product_id) {
      navigate("details", { productId: product_id })
      onClose()
    }
  }

  return (
    <Pressable 
      w="full" 
      p={4} 
      pt={12} 
      bgColor="coolGray.200" 
      position="absolute" 
      roundedBottom={8} 
      top={0}
      onPress={handleOnPress}
    >
      <HStack justifyContent="space-between" alignItems="center">
          <Icon as={Ionicons} name="notifications-outline" size={5} color="black" mr={2}/>

          <Text fontSize="md" color="black" flex={1}>
            {data.title}
          </Text>

        <IconButton 
          variant="unstyled" 
          _focus={{ borderWidth: 0 }} 
          icon={<CloseIcon size="3" />} 
          _icon={{ color: "coolGray.600"}} 
          color="black"
          onPress={onClose}
        />
      </HStack>
    </Pressable>
  );
}