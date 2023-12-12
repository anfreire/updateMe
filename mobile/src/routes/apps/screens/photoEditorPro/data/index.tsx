import {Text} from '@rneui/themed';
import {LongFeatureType} from '../../../components/features';
import React from 'react';

export type PhotoEditorProVariants =
  | 'What Is Photo Editor Pro?'
  | 'Why Photo Editor Pro?';

export const PhotoEditorProKeys: PhotoEditorProVariants[] = [
  'What Is Photo Editor Pro?',
  'Why Photo Editor Pro?',
];

export const photoEditorProContent: Record<
  PhotoEditorProVariants,
  React.ReactNode
> = {
  'What Is Photo Editor Pro?': (
    <>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
        }}>
        Photo Editor Pro is a modern photo editing application packed with
        unique features to transform your photos into stunning visuals.
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
        }}>
        Elevate your photo editing experience with a perfect combination of
        modern features suitable for various purposes.
      </Text>
    </>
  ),
  'Why Photo Editor Pro?': (
    <>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
        }}>
        Enjoy a powerful editing tool with Photo Editor Pro, recently updated
        with new features for a perfect editing experience.
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
        }}>
        Explore over 100 filters, in-depth customizations, body retouch options,
        and an aesthetic photo editor for unique and impressive images.
      </Text>
    </>
  ),
};

export const photoEditorProFeatures: LongFeatureType[] = [
  {
    title: 'Hundreds of Photo Effects',
    icon: {
      name: 'image-filter-black-white',
      type: 'material-community',
    },
    description:
      'Explore a vast collection of over 100 photo effects, including sparkles, glitters, vintage filters, and more.',
  },
  {
    title: 'In-Depth Customizations',
    icon: {
      name: 'tune',
      type: 'material',
    },
    description:
      'Make detailed changes to your images with crop, rotate, brightness, contrast, warmth, saturation adjustments, and more.',
  },
  {
    title: 'Body Retouch Options',
    icon: {
      name: 'human',
      type: 'material-community',
    },
    description:
      'Enhance your body shapes with options to slim down, elongate, change hairstyles, add muscles, and customize tattoos.',
  },
  {
    title: 'Aesthetic Photo Editor',
    icon: {
      name: 'style',
      type: 'material',
    },
    description:
      'Experience profound visual effects with aesthetic styles, glitch effects, blur background, and unique lighting effects.',
  },
  {
    title: 'Create Stunning Collages',
    icon: {
      name: 'grid',
      type: 'material-community',
    },
    description:
      'Arrange your images in beautiful collages with customizable grids, frames, filters, and backgrounds.',
  },
];
