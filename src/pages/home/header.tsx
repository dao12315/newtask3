import { Image, Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IMAGES } from '../../assets/index.ts';
import { User } from '../../services/todo.service.ts';

type HeaderProp = {
  user: User;
  onLogout: () => void;
};

type IconItem = {
  name: string;
  onPress?: () => void;
};

const iconList = (onLogout: () => void): IconItem[] => [
  { name: 'notifications-outline' },
  { name: 'settings-outline' },
  { name: 'search-outline' },
  {
    name: 'arrow-forward-outline',
    onPress: onLogout, // logout icon
  },
];

const hasNotification = true;

export const Header = ({ user, onLogout }: HeaderProp) => {
  const icons = iconList(onLogout);

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#ffd0d6',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      {/* LEFT */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <View
          style={{
            width: 45,
            height: 45,
            borderRadius: 25,
            borderWidth: 1,
            backgroundColor: '#a99195',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Image
            source={user.avatar ? { uri: user.avatar } : IMAGES.avatar}
            style={{
              width: 45,
              height: 45,
              borderRadius: 25,
              borderWidth: 1,
            }}
          />

          <Pressable
            style={({ pressed }) => [
              {
                position: 'absolute',
                right: -2,
                bottom: -2,
                backgroundColor: '#beb4b4ff',
                borderRadius: 13,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              },
              pressed && { opacity: 0.3 },
            ]}
          >
            <Icon name="pencil" color="#dc4a4aff" size={15} />
          </Pressable>
        </View>

        <View>
          <Text style={{ color: '#dc4a4aff' }}>Xin Chào</Text>
          <Text>{user.name}</Text>
        </View>
      </View>

      {/* RIGHT */}
      <View style={{ flexDirection: 'row', gap: 5 }}>
        {icons.map(item => {
          const isNotification = item.name === 'notifications-outline';

          return (
            <Pressable
              key={item.name}
              onPress={item.onPress}
              style={({ pressed }) => [
                {
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  borderWidth: 1,
                  backgroundColor: '#a99195',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                pressed && { opacity: 0.3 },
              ]}
            >
              <Icon name={item.name} size={18} />

              {isNotification && hasNotification && (
                <View
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'red',
                  }}
                />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
