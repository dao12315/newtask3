import { CourseItem } from "../../../../component/course/types";

export const RECOGNITION_LIST: CourseItem[] = [
  {
    id: '1',
    title: 'Ngộ độc',
    level: 'Cơ bản',
    rating: 2.5,
    description: 'Dấu hiệu ngộ độc thức ăn cần nhận biết sớm',
    progress: 0,
    status: 'Chưa học',
    image: require('../../../../assets/img/PhanBiet//ngo-doc.jpg'),
  },
  {
    id: '2',
    title: 'Vết rắn cắn',
    level: 'Cơ bản',
    rating: 2.5,
    description: 'Phân biệt rắn độc và rắn không độc cắn',
    progress: 0,
    status: 'Chưa học',
    image: require('../../../../assets/img/PhanBiet//ran-can.jpg'),
  },
  {
    id: '3',
    title: 'Dị ứng cấp',
    level: 'Trung bình',
    rating: 3,
    description: 'Nhận biết dấu hiệu dị ứng nghiêm trọng, sốc phản vệ',
    progress: 0,
    status: 'Chưa học',
    image: require('../../../../assets/img/PhanBiet//di-ung-cap.jpg'),
  },
  {
    id: '4',
    title: 'Chấn thương đầu',
    level: 'Trung bình',
    rating: 3,
    description: 'Nhận biết chấn thương đầu nguy hiểm cần cấp cứu',
    progress: 0,
    status: 'Chưa học',
    image: require('../../../../assets/img/PhanBiet//chan-thuong-dau.jpg'),
  },
];