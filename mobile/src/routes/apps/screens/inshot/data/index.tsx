import React from 'react';
import {Text} from '@rneui/themed';

export type InshotVariants = 'What Is Inshot?' | '#1 on Play Store';

export const InshotKeys: InshotVariants[] = [
  'What Is Inshot?',
  '#1 on Play Store',
];

export const inshotContent: Record<InshotVariants, React.ReactNode> = {
  'What Is Inshot?': (
    <Text
      style={{
        textAlign: 'center',
        fontSize: 15,
      }}>
      Inshot is a powerful video editing & Photo editing app for your Android
      device. Inshot offers you amazing filters for merging videos, slideshows,
      video effects, adding text and much more. It provides you all the premium
      features and advanced video editing features.
    </Text>
  ),
  '#1 on Play Store': (
    <Text
      style={{
        textAlign: 'center',
        fontSize: 15,
      }}>
      Inshot has received hundreds of millions of users and has become one
      of the #1 Most Propular editing App on Google Play since its launch in
      2004.
    </Text>
  ),
};

export const inshotFeatures = [
  '4k Editing',
  'No Ads',
  'Premium Unlocked',
  'AI Effects Unlocked',
]