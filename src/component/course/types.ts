export type CourseItem = {
  id: string;
  title: string;
  level: 'Cơ bản' | 'Trung bình' | 'Nâng cao';
  rating: number;
  description: string;
  progress: number;
  status: 'Chưa học' | 'Tiến độ' | 'Hoàn thành';
  image: any;
};
