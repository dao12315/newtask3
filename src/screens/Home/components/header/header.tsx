import { Image, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IMAGES } from '../../../../assets';
import { User } from '../../../../services/todo.service';
import { stylesHeader } from './header.styles';

type HeaderProp = {
  user: User;
  onLogout: () => void;
  editAvatar: (options: { onPicked: (uri: string) => void }) => void;
};

type IconItem = {
  name: string;
  onPress?: () => void;
};

const iconList = (onLogout: () => void): IconItem[] => [
  { name: 'notifications-outline' },
  { name: 'settings-outline' },
  { name: 'search-outline' },
  { name: 'arrow-forward-outline', onPress: onLogout },
];

const hasNotification = true;

export const Header = ({ user, onLogout, editAvatar }: HeaderProp) => {
  const icons = iconList(onLogout);

  return (
    <View style={stylesHeader.container}>
      {/* LEFT */}
      <View style={stylesHeader.left}>
        <View style={stylesHeader.avatarWrapper}>
          <Image
            source={user.avatar ? { uri: user.avatar } : IMAGES.avatar}
            style={stylesHeader.avatar}
          />

          <Pressable
            onPress={() =>
              editAvatar({
                onPicked: uri => console.log('avatar picked:', uri),
              })
            }
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
          <Text>{user.name}</Text>
        </View>
      </View>

      {/* RIGHT */}
      <View style={stylesHeader.right}>
        {icons.map(item => {
          const isNotification = item.name === 'notifications-outline';

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

              {isNotification && hasNotification && <View style={stylesHeader.dot} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

