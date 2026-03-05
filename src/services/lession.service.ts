// services/lesson.service.ts
import { getDatabase, ref, get } from '@react-native-firebase/database';
import { getApp } from '@react-native-firebase/app';
import { Lesson, LessonWithProgress } from '../screens/Lession/type';

class LessonService {
  private db = getDatabase(getApp());

  /**
   * 🔹 Lấy danh sách lesson theo course (KHÔNG user)
   * Path: lessons/{courseId}
   */
  async getByCourse(courseId: string): Promise<Lesson[]> {
    const snapshot = await get(ref(this.db, `lessons/${courseId}`));

    if (!snapshot.exists()) return [];

    const data = snapshot.val();

    return Object.keys(data)
      .map(lessonId => ({
        id: lessonId,
        ...data[lessonId],
      }))
      .sort((a, b) => a.order - b.order);
  }

  /**
   * 🔹 Lấy lesson + trạng thái hoàn thành của user
   * Merge lessons + user_courses
   */
  async getByCourseWithUser(
    uid: string,
    courseId: string,
  ): Promise<LessonWithProgress[]> {
    const [lessonSnap, userCourseSnap] = await Promise.all([
      get(ref(this.db, `lessons/${courseId}`)),
      get(ref(this.db, `user_courses/${uid}/${courseId}/lessons`)),
    ]);

    if (!lessonSnap.exists()) return [];

    const lessons = lessonSnap.val();
    const userLessons = userCourseSnap.exists()
      ? userCourseSnap.val()
      : {};

    return Object.keys(lessons)
      .map(lessonId => ({
        id: lessonId,
        ...lessons[lessonId],
        isComplete: userLessons?.[lessonId]?.isComplete ?? false,
      }))
      .sort((a, b) => a.order - b.order);
  }

  /**
   * 🔹 Đánh dấu hoàn thành lesson
   */
  async markLessonComplete(
    uid: string,
    courseId: string,
    lessonId: string,
  ): Promise<void> {
    await getDatabase(getApp())
      .ref(`user_courses/${uid}/${courseId}/lessons/${lessonId}`)
      .update({
        isComplete: true,
      });
  }
}

export const lessonService = new LessonService();
