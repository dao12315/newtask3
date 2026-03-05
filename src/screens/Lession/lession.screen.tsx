import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Pressable, Modal } from 'react-native';
import TextComponent from '../../component/TextComponent';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styleLessionItem } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Navigator';
import { lessonService } from '../../services/lession.service';
import { Lesson } from './type';
import Video from 'react-native-video';
import { AuthStorage } from '../../stores/auth.storage';
import database from '@react-native-firebase/database';

type Props = NativeStackScreenProps<RootStackParamList, 'CourseDetail'>;

export default function CourseDetailScreen({ route }: Props) {
  const navigation = useNavigation<NavigationProp<any>>();
  const { courseId } = route.params;

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const videoRef = useRef<React.ElementRef<typeof Video> | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasCreatedProgress, setHasCreatedProgress] = useState(false);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [resumeTime, setResumeTime] = useState(0);

  const handleOpenVideo = async (lesson: Lesson) => {
    const user = await AuthStorage.getUser();
    if (!user) return;
    console.log(user.uid);

    
    setCurrentLessonId(lesson.id);
    setVideoUrl(lesson.video);

    const snapshot = await database()
      .ref(`user_lesson_progress/${user.uid}/${courseId}/${lesson.id}`)
      .once('value'); 

    if (snapshot.exists()) {
      const data = snapshot.val();
      setResumeTime(data.currentTime || 0);
    } else {
      setResumeTime(0);
    }

    setHasCreatedProgress(false);
  };

  const handleSaveProgress = async (isEnd = false) => {
    if (!currentLessonId) return;

    const user = await AuthStorage.getUser();
    if (!user) return;

    if (currentTime < 3) return;

    const percent = (currentTime / duration) * 100;
    const status = isEnd || percent >= 95 ? 'COMPLETED' : 'IN_PROGRESS';

    await database()
      .ref(`user_lesson_progress/${user.uid}/${courseId}/${currentLessonId}`)
      .update({
        currentTime,
        progressPercent: percent,
        status,
        updatedAt: Date.now(),
      });
  };

  useEffect(() => {
    lessonService.getByCourse(courseId).then(data => {
      setLessons(data);
      setLoading(false);
    });
  }, [courseId]);

  if (loading) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextComponent>Đang tải bài học...</TextComponent>
      </View>
    );
  }

  return (
    <SafeAreaView style={styleLessionItem.safe}>
      {/* HEADER */}
      <Pressable
        onPress={() => navigation.goBack()}
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
      <View style={{ flex: 1, padding: 10 }}>
        <FlatList
          data={lessons}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styleLessionItem.item}>
              <View style={{ flex: 1 }}>
                <TextComponent style={styleLessionItem.title}>
                  {item.title}
                </TextComponent>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styleLessionItem.btn,
                  pressed && styleLessionItem.pressed,
                ]}
                onPress={() => handleOpenVideo(item)}
              >
                <TextComponent style={styleLessionItem.btnText}>
                  Xem
                </TextComponent>
              </Pressable>
            </View>
          )}
        />

        {/* VIDEO MODAL */}
        <Modal visible={!!videoUrl} animationType="slide">
          <Pressable
            style={styleLessionItem.close}
            onPress={() => {
              handleSaveProgress();
              setVideoUrl(null);
            }}
          >
            <TextComponent style={{ color: '#fff', fontSize: 16 }}>
              Đóng
            </TextComponent>
          </Pressable>

          {videoUrl && (
            <Video
              ref={videoRef}
              source={{ uri: videoUrl }}
              style={styleLessionItem.video}
              controls
              resizeMode="contain"
              onLoad={data => {
                setDuration(data.duration);

                if (resumeTime > 0) {
                  videoRef.current?.seek(resumeTime);
                }
              }}
              onProgress={async data => {
                setCurrentTime(data.currentTime);

                if (
                  data.currentTime >= 3 &&
                  !hasCreatedProgress &&
                  currentLessonId
                ) {
                  const user = await AuthStorage.getUser();
                  if (!user) return;

                  await database()
                    .ref(`user_lesson_progress/${user.uid}/${courseId}/${currentLessonId}`)
                    .set({
                      lessonId: currentLessonId,
                      currentTime: data.currentTime,
                      progressPercent: 0,
                      status: 'IN_PROGRESS',
                      createdAt: Date.now(),
                      updatedAt: Date.now(),
                    });

                  setHasCreatedProgress(true);
                }
              }}
              onEnd={() => {
                handleSaveProgress(true);
              }}
              onError={error => {
                console.log('VIDEO ERROR:', error);
              }}
            />
          )}
        </Modal>
      </View>
    </SafeAreaView>
  );
}
