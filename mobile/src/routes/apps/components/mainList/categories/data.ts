import {IconProps} from '../../../../../common/types';
import {SourceKeysType} from '../../../../../hooks/useSource';

export type CategoryKeyType =
  | 'MOVIES AND TV SHOWS'
  | 'SOCIAL MEDIA'
  | 'MUSIC STREAMING'
  | 'VIDEO STREAMING'
  | 'PHOTO EDITING'
  | 'VIDEO EDITING';

export const CategoryKeys = [
  'MOVIES AND TV SHOWS',
  'MUSIC STREAMING',
  'VIDEO STREAMING',
  'SOCIAL MEDIA',
  'PHOTO EDITING',
  'VIDEO EDITING',
] as CategoryKeyType[];

export interface CategoryType {
  title: string;
  icon: IconProps;
  apps: SourceKeysType[];
}

export const Categories: Record<CategoryKeyType, CategoryType> = {
  'MOVIES AND TV SHOWS': {
    title: 'Movies and TV Shows',
    icon: {
      name: 'movie',
      type: 'material',
    },
    apps: ['HDO'],
  },
  'SOCIAL MEDIA': {
    title: 'Social Media',
    icon: {
      name: 'group',
      type: 'material',
    },
    apps: ['INSTAGRAM', 'WHATSAPP'],
  },
  'MUSIC STREAMING': {
    title: 'Music Streaming',
    icon: {
      name: 'music-note',
      type: 'material',
    },
    apps: ['SPOTIFY', 'YOUTUBE_MUSIC'],
  },
  'VIDEO STREAMING': {
    title: 'Video Streaming',
    icon: {
      name: 'video-collection',
      type: 'material',
    },
    apps: ['YOUTUBE_YOUTUBE'],
  },
  'PHOTO EDITING': {
    title: 'Photo Editing',
    icon: {
      name: 'image-edit',
      type: 'material-community',
    },
    apps: ['PHOTO_EDITOR_PRO', 'PHOTOSHOP_EXPRESS'],
  },
  'VIDEO EDITING': {
    title: 'Video Editing',
    icon: {
      name: 'movie-edit',
      type: 'material-community',
    },
    apps: ['INSHOT', 'CAPCUT'],
  },
};

export interface CategoryListItemProps {
  category: CategoryKeyType;
}
