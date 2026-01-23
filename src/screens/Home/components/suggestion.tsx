import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

const suggestion = [
  {
    img: require('../../../assets/img/xu-ly-vet-bong.jpg'),
    label: 'Cách xử lý vết bỏng tại nhà đơn giản hiệu quả dễ thực hiện',
    description: 'Sơ cứu vết bỏng kịp thời và đúng cách là biện pháp...',
  },
  {
    img: require('../../../assets/img/ran-doc.webp'),
    label: 'Phân biệt rắn đọc và rắn không độc cắn, cách sở cứu ban đầu',
    description:
      'Tùy theo từng loại rắn cắn sẽ có nhưng biểu hiện đặc trưng khác nhau',
  },
];

export const Suggestion = () => {
  return (
    <View
      style={{
        height: 200,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#c32f30', fontWeight: '600' }}>Gợi ý</Text>
        <Text style={{ color: '#c32f30', fontWeight: '600' }}>Khác</Text>
      </View>
      <View
        style={{
          height: 0.5,
          backgroundColor: '#c32f30',
          marginVertical: 4,
          marginBottom: 10,
        }}
      />
      <View
        style={{
          gap: 10,
        }}
      >
        {suggestion.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={({ pressed }) => [
                {
                  height: 75,
                  borderRadius: 15,
                  borderWidth: 1.5,
                  borderColor: '#c32f30',
                  gap: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                  flexDirection: 'row',
                  overflow: 'hidden',
                },
                pressed && { opacity: 0.7 },
              ]}
            >
              <Image
                source={item.img}
                style={{
                  height: 65,
                  width: 65,
                  borderRadius: 12,
                  borderWidth: 0.4,
                }}
              />
              <View
                style={{
                  flex: 1,
                  overflow: 'hidden',
                }}
              >
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{
                    color: '#000000ff',
                    fontSize: 15,
                    fontWeight: '400',
                  }}
                >
                  {item.label}
                </Text>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{
                    color: '#000000ff',
                    fontSize: 12,

                    fontWeight: '300',
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
