import { CourseItem } from "../../../../component/course/types";

export const DISEASE_LIST: CourseItem[] = [
  {
    id: '1',
    title: 'Tụt huyết áp',
    level: 'Cơ bản',
    rating: 2.5,
    description: 'Xử trí khi bị tụt huyết áp như thế nào cho đúng cách',
    progress: 0,
    status: 'Chưa học',
    image: require('../../../../assets/img/BenhNen/tut-huyet-ap.jpg'),
  },
  {
    id: '2',
    title: 'Ngất xỉu',
    level: 'Cơ bản',
    rating: 2.5,
    description: 'Những cách sơ cứu người bị ngất xỉu và các lưu ý cần nhớ',
    progress: 0,
    status: 'Chưa học',
    image: require('../../../../assets/img/BenhNen/ngat-xiu.jpg'),
  },
  {
    id: '3',
    title: 'Co giật',
    level: 'Trung bình',
    rating: 3.5,
    description: 'Cách sơ cứu người bị co giật an toàn, đúng trình tự',
    progress: 0,
    status: 'Chưa học',
    image: require('../../../../assets/img/BenhNen/co-giat.jpg'),
  },
  {
    id: '4',
    title: 'Đột quỵ',
    level: 'Nâng cao',
    rating: 4,
    description: 'Sơ cứu đột quỵ tại nhà đúng cách, khoa học',
    progress: 0,
    status: 'Chưa học',
    image: require('../../../../assets/img/BenhNen/dot-quy.jpg'),
  },
];