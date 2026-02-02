import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import Video from 'react-native-video';

const DATA = [
  {
    id: '1',
    title: 'CPR',
    status: 'Có sẵn',
    thumb:
      'https://res.cloudinary.com/diggctoos/image/upload/v1769757539/dot-quy_dboq5q.jpg',
    video:
      'https://res.cloudinary.com/diggctoos/video/upload/v1769762643/Genshin_Impact_2025-10-26_04-56-58_tof4v7.m3u8',
  },
  {
    id: '2',
    title: 'CPR',
    status: 'Có sẵn',
    thumb:
      'https://res.cloudinary.com/diggctoos/image/upload/v1769757539/dot-quy_dboq5q.jpg',
    video:
      'https://res.cloudinary.com/diggctoos/video/upload/v1769762643/Genshin_Impact_2025-10-26_04-56-58_tof4v7.m3u8',
  },
];

export default function QAScreen() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.thumb }} style={styles.thumb} />

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>

            <Pressable
              style={styles.btn}
              onPress={() => setVideoUrl(item.video)}
            >
              <Text style={styles.btnText}>Xem</Text>
            </Pressable>
          </View>
        )}
      />

      {/* VIDEO MODAL */}
      <Modal visible={!!videoUrl} animationType="slide">
        <Pressable style={styles.close} onPress={() => setVideoUrl(null)}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Đóng</Text>
        </Pressable>

        {videoUrl && (
          <Video
            source={{ uri: videoUrl }}
            style={styles.video}
            controls
            resizeMode="contain"
            bufferConfig={{
              minBufferMs: 15000,
              maxBufferMs: 50000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
          />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  status: {
    color: '#888',
    marginTop: 4,
  },
  btn: {
    backgroundColor: '#b00020',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  close: {
    padding: 12,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    backgroundColor: '#000',
  },
});
