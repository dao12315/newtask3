import { CourseItem } from "../../../../component/course/types";

export const PEDIATRIC_LIST: CourseItem[] = [
  {
    id: '1',
    title: 'Hóc dị vật',
    level: 'Cơ bản',
    rating: 2.5,
    description: 'Hướng dẫn sơ cứu trẻ bị hóc dị vật đường thở',
    progress: 0,
    status: 'Chưa học',
    image: require('../../../../assets/img/BenhNhi/hoc-di-vat.jpg'),
  },
  {
    id: '2',
    title: 'Sốt cao',
    level: 'Cơ bản',
    rating: 2.5,
    description: 'Hướng dẫn xử trí sốt cao co giật ở trẻ em đúng cách',
    progress: 0,
    status: 'Chưa học',
    image: require('../../../../assets/img/BenhNhi/sot-cao-tre-em.jpg'),
  },
  {
    id: '3',
    title: 'Tiêu chảy cấp',
    level: 'Cơ bản',
    rating: 3,
    description: 'Nhận biết và sơ cứu tiêu chảy cấp, mất nước ở trẻ nhỏ',
    progress: 0,
    status: 'Chưa học',
    image: require('../../../../assets/img/BenhNhi/tieu-chay-cap.jpg'),
  },
  {
    id: '4',
    title: 'Ngã – chấn thương',
    level: 'Trung bình',
    rating: 3,
    description: 'Xử trí khi trẻ bị ngã, va đập đầu và chấn thương nhẹ',
    progress: 0,
    status: 'Chưa học',
    image: require('../../../../assets/img/BenhNhi/chan-thuong-tre-em.jpg'),
  },
];
