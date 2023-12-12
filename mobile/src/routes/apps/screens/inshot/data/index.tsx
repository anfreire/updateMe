import React from 'react';
import {Text} from '@rneui/themed';
import {LongFeatureType} from '../../../components/features';

export type InshotVariants = 'What Is Inshot?' | 'Why Inshot?';

export const InshotKeys: InshotVariants[] = ['What Is Inshot?', 'Why Inshot?'];

export const inshotContent: Record<InshotVariants, React.ReactNode> = {
  'What Is Inshot?': (
    <>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
        }}>
        Inshot is a powerful video and photo editing app designed for Android
        devices. With amazing filters, video effects, text additions, and more,
        it's an all-in-one editing solution.
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
        }}>
        Transform ordinary videos into artistic masterpieces with powerful
        filters, effects, and glitches.
      </Text>
    </>
  ),
  'Why Inshot?': (
    <>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
        }}>
        InShot is the #1 Most Popular editing app on Google Play, with hundreds
        of millions of users since its launch in 2004.
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
        }}>
        Elevate your editing experience with advanced features and premium
        options, making Inshot the go-to choice for video and photo editing on
        Android.
      </Text>
    </>
  ),
};

export const inshotFeatures: LongFeatureType[] = [
  {
    title: 'Powerful Editing Tools',
    icon: {
      name: 'scissors-cutting',
      type: 'material-community',
    },
    description:
      'Edit videos and photos effortlessly with advanced tools for trimming, cutting, and merging.',
  },
  {
    title: 'Stunning Filters and Effects',
    icon: {
      name: 'filter-alt',
      type: 'material',
    },
    description:
      'Enhance your content with a variety of filters, effects, and glitches to create visually appealing videos and photos.',
  },
  {
    title: 'User-Friendly Interface',
    icon: {
      name: 'application',
      type: 'material-community',
    },
    description:
      'Enjoy a seamless editing experience with a cool and intuitive user interface designed for easy navigation.',
  },
  {
    title: 'Wide Range of Visual Elements',
    icon: {
      name: 'format-shapes',
      type: 'material-community',
    },
    description:
      'Add animations, transitions, text, stickers, and more to make your videos stand out and capture attention.',
  },
];
