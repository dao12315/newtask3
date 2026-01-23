import React from 'react';
import { Pressable, ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextComponent from '../../component/TextComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Navigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Policy'>;


export default function PolicyScreen({navigation}: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={({ pressed }) => [
              styles.headerBack,
              pressed && styles.pressed,
            ]}
            hitSlop={10}
          >
            <Icon name="arrow-back" size={28} color="#fff" />
          </Pressable>

          <TextComponent variant="title" style={styles.headerTitle}>
            Privacy Policy
          </TextComponent>
        </View>

        {/* CONTENT */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <TextComponent style={styles.metaText}>
            Last Update: 14/08/2024
          </TextComponent>

          <TextComponent style={styles.bodyText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            pellentesque euismod lorem, vel tincidunt tortor placerat at. Proin
            ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a
            scelerisque neque, sed accumsan metus.
          </TextComponent>

          <TextComponent style={styles.bodyText}>
            Nunc auctor tortor in dolor luctus, quis euismod urna tincidunt.
            Aenean arcu metus, bibendum at rhoncus at, volutpat ut lacus. Morbi
            pellentesque malesuada eros semper ultrices. Vestibulum lobortis
            enim vel neque auctor, a ultrices ex placerat. Mauris ut lacinia
            justo, sed suscipit porta.
          </TextComponent>

          <TextComponent style={styles.sectionTitle}>
            Terms & Conditions
          </TextComponent>

          <View style={styles.list}>
            <View style={styles.listItem}>
              <TextComponent style={styles.listNumber}>1.</TextComponent>
              <TextComponent style={styles.listText}>
                Ut lacinia justo sit amet lorem sodales accumsan. Proin
                malesuada eleifend fermentum. Morbi quis commodo sem. Vestibulum
                at rhoncus faucibus, nisi iaculis aliquet ipsum, eu pharetra
                eros vitae orci. Mauris ut rhoncus mi. Nulla rhoncus nunc
                accumsan, nec cursus nisi, vel eget et rutrum pharetra, lectus
                nisl suscipit purus, vel facilisis nisi tellus ac turpis.
              </TextComponent>
            </View>

            <View style={styles.listItem}>
              <TextComponent style={styles.listNumber}>2.</TextComponent>
              <TextComponent style={styles.listText}>
                Ut lacinia justo sit amet lorem sodales accumsan. Proin
                malesuada eleifend fermentum, nunc at rhoncus faucibus. Morbi
                quis commodo sem. Vestibulum at rhoncus faucibus, nisi iaculis
                aliquet ipsum, eu pharetra eros vitae orci. Duis laoreet, ex
                eget rutrum pharetra, lectus nisl suscipit purus, vel facilisis
                nisi tellus ac turpis.
              </TextComponent>
            </View>

            <View style={styles.listItem}>
              <TextComponent style={styles.listNumber}>3.</TextComponent>
              <TextComponent style={styles.listText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent pellentesque euismod, vel tincidunt tortor ut feugiat
                diam. Aenean in sagittis magna, ut feugiat diam. Nunc auctor
                tortor in dolor luctus, quis euismod urna tincidunt.
              </TextComponent>
            </View>

            <View style={styles.listItem}>
              <TextComponent style={styles.listNumber}>4.</TextComponent>
              <TextComponent style={styles.listText}>
                Nunc auctor tortor in dolor luctus, quis euismod urna tincidunt.
                Aenean arcu metus, bibendum at rhoncus at, volutpat ut lacus.
                Morbi pellentesque malesuada eros semper ultrices. Vestibulum
                lobortis enim vel neque auctor, a ultrices ex placerat. Mauris
                ut lacinia justo, sed suscipit porta. Nam egestas nulla posuere
                neque tincidunt porta.
              </TextComponent>
            </View>
          </View>

          {/* chừa chỗ để không bị nút che */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* FOOTER BUTTON */}
        <View style={styles.footer}>
          <Pressable
            onPress={() => {
              // TODO: accept policy
            }}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
          >
            <TextComponent style={styles.primaryButtonText}>
              {' '}
              Đồng ý{' '}
            </TextComponent>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ffd0d6' },
  screen: { flex: 1, backgroundColor: '#fff' },

  pressed: { opacity: 0.6 },

  header: {
    height: 80,
    backgroundColor: '#990012',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerBack: {
    position: 'absolute',
    left: 16,
    height: 80,
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '500',
  },

  content: { flex: 1 },
  contentContainer: { paddingHorizontal: 22, paddingTop: 14 },

  metaText: { fontSize: 12, color: '#333', marginBottom: 10, fontWeight: 600 },

  bodyText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
    marginBottom: 12,
  },

  sectionTitle: {
    marginTop: 10,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '700',
    color: '#990012',
  },

  list: { gap: 10 },
  listItem: { flexDirection: 'row', gap: 8 },
  listNumber: { width: 18, fontSize: 12, color: '#333' },
  listText: { flex: 1, fontSize: 12, color: '#333', lineHeight: 18 },

  footer: {
    paddingBottom: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  primaryButton: {
    height: 50,
    width: '40%',
    borderRadius: 26,
    backgroundColor: '#990012',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: { color: '#ffffffff', fontSize: 18, fontWeight: '500' },
});
