export type CourseCategory =
  | 'THUONG_GAP'
  | 'BENH_NEN'
  | 'PHAN_BIET'
  | 'BENH_NHI';

export type CourseLevel = 'Cơ bản' | 'Trung bình' | 'Nâng cao';

export type CourseItem = {
  id: string;
  title: string;
  level: string;
  category: string;
  rating: number; // ⭐ NEW
  description: string;
  image: string;

  progress: number;
  status: string;
};

export type Course = {
  id: string;
  title: string;
  level: string;
  category: 'BENH_NEN' | 'BENH_NHI' | 'PHAN_BIET' | 'THUONG_GAP';
  rating: number; // ⭐ NEW
  description: string;
  image: string;
  totalLessons: number;
  status: 'active' | 'inactive';
  createdAt: number;
};

export type UserLessonProgress = {
  lessonId: string;
  isComplete: boolean;
};

export type UserCourse = {
  courseId: string;
  progress: number; // %
  status: 'learning' | 'completed';
  startedAt: number;
  lessons: Record<string, UserLessonProgress>;
};
