// types/lesson.ts
export type Lesson = {
  id: string;
  title: string;
  video: string;
  order: number;
};

export type LessonWithProgress = Lesson & {
  isComplete: boolean;
};
