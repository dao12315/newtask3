import { getApp } from '@react-native-firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  query,
  orderByChild,
  get,
} from '@react-native-firebase/database';
import { AuthStorage } from '../stores/auth.storage';
import database from '@react-native-firebase/database';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  createdAt: number;
}

class ChatService {
  private getDb() {
    return getDatabase(getApp());
  }

  private async getUid(): Promise<string> {
    const user = await AuthStorage.getUser();

    if (!user?.uid) {
      throw new Error('User not logged in');
    }
    return user.uid;
  }

  // 🔥 KHÔNG async
  subscribeMessages(callback: (messages: ChatMessage[]) => void): () => void {
    let isMounted = true;
    let messagesQuery: ReturnType<typeof query> | null = null;

    this.getUid().then(uid => {
      if (!isMounted) return;

      const db = this.getDb();
      const messagesRef = ref(db, `chat_rooms/${uid}/messages`);

      messagesQuery = query(messagesRef, orderByChild('createdAt'));

      onValue(messagesQuery, snapshot => {
        if (!snapshot.exists()) {
          callback([]);
          return;
        }

        const data = snapshot.val();

        const messages: ChatMessage[] = Object.entries(
          data as Record<string, any>,
        )
          .map(([id, value]) => ({
            id,
            ...(value as Omit<ChatMessage, 'id'>),
          }))
          .sort((a, b) => a.createdAt - b.createdAt);

        callback(messages);
      });
    });

    return () => {
      isMounted = false;

      if (messagesQuery) {
        messagesQuery.off('value');
      }
    };
  }

  async sendMessage(text: string, sender: 'user' | 'admin') {
    const uid = await this.getUid();
    const db = this.getDb();

    const messagesRef = ref(db, `chat_rooms/${uid}/messages`);
    const newMessageRef = push(messagesRef);

    await set(newMessageRef, {
      text,
      sender,
      createdAt: Date.now(),
    });
  }
}

export const chatService = new ChatService();
