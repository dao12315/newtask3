// services/course.service.ts
import { getDatabase, ref, get } from '@react-native-firebase/database';
import { getApp } from '@react-native-firebase/app';
import {
  Course,
  CourseCategory,
  CourseItem,
  UserCourse,
} from '../component/course/types';

class CourseService {
  async getAll(): Promise<Course[]> {
    const db = getDatabase(getApp());
    const snapshot = await get(ref(db, 'courses'));

    if (!snapshot.exists()) return [];

    const data = snapshot.val();

    // 🔑 Firebase trả object → convert sang array
    return Object.keys(data).map(courseId => ({
      id: courseId,
      ...data[courseId],
    }));
  }

  async getUserCourses(uid: string): Promise<UserCourse[]> {
    const db = getDatabase(getApp());
    const snapshot = await get(ref(db, `user_courses/${uid}`));
    if (!snapshot.exists()) return [];

    return snapshot.val();
  }

  async getByCategory(category: CourseCategory): Promise<CourseItem[]> {
    const rawCourses = await this.getAll();

    return rawCourses
      .filter(course => course.category === category)
      .map(course => ({
        id: course.id,
        title: course.title,
        level: course.level,
        category: course.category,
        rating: course.rating ?? 0,
        description: course.description,
        image: course.image,
        progress: 0,
        status: 'Chưa học',
      }));
  }
}

export const courseService = new CourseService();
