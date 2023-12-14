import {
  GridFeauturesItemProps,
  LongFeatureType,
} from '../../../components/features';

export const TwitterFeauturesGrid: GridFeauturesItemProps[] = [
  {
    title: 'Download everything',
    description:
      'You can download all videos (with the possibility to choose resolution), photos and GIF posts.',
    icon: {
      name: 'download',
      type: 'material-community',
    },
  },
  {
    title: 'Full control',
    description:
      'You can remove all promoted tweets, promoted users, promoted trend hashtags. A completely ad-free and fluid experience.',
    icon: {
      name: 'control-camera',
      type: 'material',
    },
  },
  {
    title: 'Better experience',
    description:
      'You can prevent Twitter from suggesting various things on your discover/search page and homepage based on your likes or content you follow.',
    icon: {
      name: 'trophy-award',
      type: 'material-community',
    },
  },
  {
    title: 'Privacy',
    description:
      "You can hide read or writing messages! The people you are chatting to will not know if their messages have been read, but you can know if the messages you've sent have been read",
    icon: {
      name: 'shield-account',
      type: 'material-community',
    },
  },
];
