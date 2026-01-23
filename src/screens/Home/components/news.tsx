import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

const news = [
  {
    img: require('../../../assets/img/bao-yagi.jpg'),
    label: 'Bão Yagi vừa qua, bão khác lại đến',
    description: 'Kỹ năng phòng chống, ứng phó trong, trước và sau bão',
  },
  {
    img: require('../../../assets/img/pccc.jpg'),
    label: 'Nâng cao hiệu quả công tác phòng cháy chữa cháy',
    description:
      'Tập huấn nghiệp vụ công tác phòng cháy chữa cháy cho trường học. Tập huấn nghiệp vụ công tác phòng cháy chữa cháy cho trường học. Tập huấn nghiệp vụ công tác phòng cháy chữa cháy cho trường học',
  },
];

export const News = () => {
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
        <Text style={{ color: '#c32f30', fontWeight: '600' }}>Tin tức</Text>
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
        {news.map((item, index) => {
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
                pressed && { opacity: 0.5 },
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
                    fontWeight: '200',
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
