import { Image, Pressable, Text, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IMAGES } from '../../../../assets';
import { stylesHeader } from './header.styles';
import { headerService } from './header.service';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useUserStore } from '../../../../stores/user.store';
import { useHeaderLogic } from './useHeaderLogic';

type IconItem = {
  name: string;
  onPress?: () => void;
};
enum HeaderIcon {
  NOTIFICATION = 'notifications-outline',
  SETTINGS = 'settings-outline',
  SEARCH = 'search-outline',
  LOGOUT = 'arrow-forward-outline',
}

const iconList = (onLogOut: () => void): IconItem[] => [
  { name: HeaderIcon.NOTIFICATION },
  { name: HeaderIcon.SETTINGS },
  { name: HeaderIcon.SEARCH },
  { name: HeaderIcon.LOGOUT, onPress: onLogOut },
];

const hasNotification = true;

export const Header = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const  user  = useUserStore(state => state.user);
  const { handleEditAvatar } = useHeaderLogic(); // ✅ GỌI Ở ĐÂY
  const logOut = async () => {
    try {
      await headerService.logOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });

      Alert.alert('Thành công', 'Đã đăng xuất');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đăng xuất');
      console.log('Logout error:', error);
    }
  };

  const icons = iconList(logOut);
  return (
    <View style={stylesHeader.container}>
      {/* LEFT */}
      <View style={stylesHeader.left}>
        <View style={stylesHeader.avatarWrapper}>
          <Image
            source={user?.avatar ? { uri: user.avatar } : IMAGES.avatar}
            style={stylesHeader.avatar}
          />

          <Pressable
            onPress={handleEditAvatar}
            style={({ pressed }) => [
              stylesHeader.editAvatarBtn,
              pressed && stylesHeader.pressed,
            ]}
          >
            <Icon name="pencil" size={15} color="#dc4a4aff" />
          </Pressable>
        </View>

        <View>
          <Text style={stylesHeader.hello}>Xin Chào</Text>
          <Text>{user?.name ?? 'Người dùng'}</Text>
        </View>
      </View>

      {/* RIGHT */}
      <View style={stylesHeader.right}>
        {icons.map(item => {
          const isNotification = item.name === HeaderIcon.NOTIFICATION;

          return (
            <Pressable
              key={item.name}
              onPress={item.onPress}
              style={({ pressed }) => [
                stylesHeader.iconBtn,
                pressed && stylesHeader.pressed,
              ]}
            >
              <Icon name={item.name} size={18} />

              {isNotification && hasNotification && (
                <View style={stylesHeader.dot} />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
