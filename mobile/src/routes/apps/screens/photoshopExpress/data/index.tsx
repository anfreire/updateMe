import React from 'react';
import {Text} from '@rneui/themed';
import {LongFeatureType} from '../../../components/features';
import { View } from 'react-native';

export type PhotoshopExpressVariants =
  | 'What Is Photoshop Express?'
  | 'Why Photoshop Express?';

export const PhotoshopExpressKeys: PhotoshopExpressVariants[] = [
  'What Is Photoshop Express?',
  'Why Photoshop Express?',
];

export const photoshopExpressContent: Record<
  PhotoshopExpressVariants,
  React.ReactNode
> = {
  'What Is Photoshop Express?': (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 10,
      }}>
      <Text style={{textAlign: 'center', fontSize: 15}}>
        Elevate your photo editing with Photoshop Express, an all-in-one editor
        packed with professional tools and modern features.
      </Text>
      <Text style={{textAlign: 'center', fontSize: 15}}>
        Its sleek interface and extensive toolset, including multi-layer edits,
        empower you to transform photos with precision and creativity.
      </Text>
    </View>
  ),
  'Why Photoshop Express?': (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 10,
      }}>
      <Text style={{textAlign: 'center', fontSize: 15}}>
        Unleash your creativity on the go! Photoshop Express offers an array of
        templates, background swapping, font editing, and AI-enhanced details.
      </Text>
      <Text style={{textAlign: 'center', fontSize: 15}}>
        Create stunning collages, highlight hidden details, and achieve
        professional-level photo edits right from your mobile device.
      </Text>
    </View>
  ),
};

export const photoshopExpressFeatures: LongFeatureType[] = [
  {
    title: 'Professional Editing Tools',
    icon: {
      name: 'edit',
      type: 'material',
    },
    description:
      'Access a complete set of professional editing tools for detailed and realistic photo enhancements.',
  },
  {
    title: 'Versatile Templates',
    icon: {
      name: 'image-filter-black-white',
      type: 'material-community',
    },
    description:
      'Choose from a variety of templates to instantly transform your photos and add eye-catching effects.',
  },
  {
    title: 'Background Swapping',
    icon: {
      name: 'image-filter-center-focus-strong',
      type: 'material-community',
    },
    description:
      'Effortlessly change backgrounds with AI assistance, ensuring sharp and perfect edges.',
  },
  {
    title: 'Creative Font Editing',
    icon: {
      name: 'format-font-size-increase',
      type: 'material-community',
    },
    description:
      'Explore a dense font system with countless variations to add artistic flair to your photo content.',
  },
  {
    title: 'AI-Enhanced Details',
    icon: {
      name: 'eye',
      type: 'material-community',
    },
    description:
      'Utilize built-in AI to reveal hidden details, adjust brightness, balance, and highlight specific beauties in your photos.',
  },
  {
    title: 'Aesthetic Collages',
    icon: {
      name: 'grid',
      type: 'material-community',
    },
    description:
      'Craft artistic collages with various templates, editing options, and attractive patterns for striking results.',
  },
];
