import React, { useEffect, useState } from 'react';
import { View, FlatList, Pressable, StyleSheet } from 'react-native';
import TextComponent from '../../component/TextComponent';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { useUserStore } from '../../stores/user.store';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styleLessionItem } from './styles';

// type Lesson = {
//   id: string;
//   title: string;
//   order: number;
// };

export default function CourseDetailScreen() {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <SafeAreaView style={styleLessionItem.safe}>
      <View style={styleLessionItem.container}>
        {/* HEADER */}
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={({ pressed }) => [
            styleLessionItem.header,
            pressed && styleLessionItem.pressed,
          ]}
        >
          <View style={styleLessionItem.backIcon}>
            <Icon name="arrow-back" size={30} color="#fff" />
          </View>

          <TextComponent variant="title" style={styleLessionItem.headerTitle}>
            Thông tin
          </TextComponent>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// export default function LessonListScreen() {
//   const route = useRoute<any>();
//   const { courseId, courseTitle } = route.params;

//   const user = useUserStore(state => state.user);
//   const [lessons, setLessons] = useState<Lesson[]>([]);
//   const [watchedMap, setWatchedMap] = useState<Record<string, boolean>>({});

//   useEffect(() => {
//     // 1. Lấy lesson
//     database()
//       .ref(`lessons/${courseId}`)
//       .once('value')
//       .then(snap => {
//         if (!snap.exists()) return;
//         const data = snap.val();
//         const list = Object.values(data) as Lesson[];
//         setLessons(list.sort((a, b) => a.order - b.order));
//       });

//     // 2. Lấy lesson đã xem
//     if (user?.uid) {
//       database()
//         .ref(`user_lessons/${user.uid}/${courseId}`)
//         .on('value', snap => {
//           setWatchedMap(snap.val() ?? {});
//         });
//     }

//     return () => {
//       if (user?.uid) {
//         database()
//           .ref(`user_lessons/${user.uid}/${courseId}`)
//           .off();
//       }
//     };
//   }, [courseId, user?.uid]);

//   const renderItem = ({ item }: { item: Lesson }) => {
//     const watched = !!watchedMap[item.id];

//     return (
//       <Pressable
//         style={{}}
//         onPress={() => {
//           database().ref(
//             `user_lessons/${user?.uid}/${courseId}/${item.id}`
//           ).set({
//             watched: true,
//             watchedAt: Date.now(),
//           });
//         }}
//       >
//         <TextComponent style={{}}>
//           {item.order}. {item.title}
//         </TextComponent>

//         <TextComponent style={{ color: watched ? 'green' : '#999' }}>
//           {watched ? 'Đã xem' : 'Chưa xem'}
//         </TextComponent>
//       </Pressable>
//     );
//   };

//   return (
//     <View style={{}}>
//       <TextComponent style={{}}>
//         {courseTitle}
//       </TextComponent>

//       <FlatList
//         data={lessons}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// }
