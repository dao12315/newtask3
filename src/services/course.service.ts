// services/course.service.ts
import { getDatabase, ref, get } from '@react-native-firebase/database';
import { getApp } from '@react-native-firebase/app';
import {
  Course,
  CourseCategory,
  CourseItem,
  UserCourse,
} from '../component/course/types';
import { AuthStorage } from '../stores/auth.storage';

class CourseService {
  /* ================= GET ALL COURSES ================= */
  async getAll(): Promise<Course[]> {
    const db = getDatabase(getApp());
    const snapshot = await get(ref(db, 'courses'));

    if (!snapshot.exists()) return [];

    const data = snapshot.val();

    return Object.keys(data).map(courseId => ({
      id: courseId,
      ...data[courseId],
    }));
  }

  /* ================= GET USER COURSES ================= */
  async getUserCourses(uid: string): Promise<UserCourse[]> {
    const db = getDatabase(getApp());
    const snapshot = await get(ref(db, `user_courses/${uid}`));

    if (!snapshot.exists()) return [];

    return snapshot.val();
  }

  /* ================= CALCULATE COURSE PROGRESS ================= */
  async calculateCourseProgress(courseId: string): Promise<{
    progress: number;
    status: string;
  }> {
    const user = await AuthStorage.getUser();
    if (!user) return { progress: 0, status: 'Chưa học' };

    const db = getDatabase(getApp());

    // 1️⃣ Lấy toàn bộ lesson của course
    const lessonSnapshot = await get(ref(db, `lessons/${courseId}`));
    if (!lessonSnapshot.exists())
      return { progress: 0, status: 'Chưa học' };

    const lessonsData = lessonSnapshot.val();
    const totalLessons = Object.keys(lessonsData).length || 1;

    // 2️⃣ Lấy progress của user theo course
    const progressSnapshot = await get(
      ref(db, `user_lesson_progress/${user.uid}/${courseId}`),
    );

    if (!progressSnapshot.exists())
      return { progress: 0, status: 'Chưa học' };

    const progressData = progressSnapshot.val();

    const completedCount = Object.values(progressData).filter(
      (lesson: any) => lesson.status === 'COMPLETED',
    ).length;

    // 3️⃣ Tính %
    const progress = Math.round(
      (completedCount / totalLessons) * 100,
    );

    const status =
      progress === 0
        ? 'Chưa học'
        : progress === 100
        ? 'Hoàn thành'
        : 'Đang học';

    return { progress, status };
  }

  /* ================= GET BY CATEGORY ================= */
  async getByCategory(category: CourseCategory): Promise<CourseItem[]> {
    const rawCourses = await this.getAll();

    const filteredCourses = rawCourses.filter(
      course => course.category === category,
    );

    const result: CourseItem[] = [];

    for (const course of filteredCourses) {
      const { progress, status } =
        await this.calculateCourseProgress(course.id);

      result.push({
        id: course.id,
        title: course.title,
        level: course.level,
        category: course.category,
        rating: course.rating ?? 0,
        description: course.description,
        image: course.image,
        progress,
        status,
      });
    }

    return result;
  }
}

export const courseService = new CourseService();