import React from 'react';
import {View} from 'react-native';
import {Text} from '@rneui/themed';
import ThemeModule from '../../../../../modules/theme';

export interface ShortFeaturesProps {
  title?: string;
  features: string[];
}

export default function ShortFeatures({
  title = 'Features',
  features,
}: ShortFeaturesProps) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: ThemeModule.Colors.grey[1],
        gap: 15,
        padding: 15,
      }}>
      <Text
        style={{
          marginBottom: 10,
        }}
        h3>
        {title}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 10,
          marginBottom: 10,
        }}>
        {features.map((feature, index) => (
          <Text
            key={index}
            style={{
              textAlign: 'center',
              fontSize: 15,
              borderRadius: 10,
              backgroundColor: ThemeModule.Colors.grey[1],
              padding: 10,
            }}>
            {feature}
          </Text>
        ))}
      </View>
    </View>
  );
}
