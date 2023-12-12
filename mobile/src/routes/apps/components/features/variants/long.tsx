import {View} from 'react-native';
import React from 'react';
import {Icon, Text} from '@rneui/themed';
import {greys} from '../../../../../utils/theme';
import {IconProps} from '../../../../../common/types';

const SingleLongFeature = ({
  side,
  title,
  iconName,
  iconType,
  description,
}: {
  side: 'LEFT' | 'RIGHT';
  title: string;
  iconName: string;
  iconType: string;
  description: string;
}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 10,
        width: '100%',
        justifyContent: side === 'LEFT' ? 'flex-start' : 'flex-end',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: side === 'LEFT' ? 'flex-start' : 'flex-end',
          justifyContent: side === 'LEFT' ? 'flex-start' : 'flex-end',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            backgroundColor: greys[2],
            padding: 15,
            borderRadius: 10,
          }}>
          {side === 'LEFT' ? (
            <Icon size={50} name={iconName} type={iconType} />
          ) : null}
          <Text
            style={{
              textAlign: side === 'LEFT' ? 'left' : 'right',
              fontWeight: 'bold',
              fontSize: 30,
            }}>
            {title}
          </Text>
          {side === 'RIGHT' ? (
            <Icon size={50} name={iconName} type={iconType} />
          ) : null}
        </View>
      </View>
      <View
        style={{
          gap: 10,
          backgroundColor: greys[1],
          padding: 10,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
        }}>
        <Text
          style={{
            textAlign: 'justify',
            fontSize: 15,
          }}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export interface LongFeatureType {
  title: string;
  icon: IconProps;
  description: string;
}

export interface LongFeaturesProps {
  features: LongFeatureType[];
}

export default function LongFeatures({features}: LongFeaturesProps) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        marginTop: 10,
        marginBottom: 10,
      }}>
      {features.map((feature, index) => (
        <SingleLongFeature
          key={index}
          side={index % 2 === 0 ? 'LEFT' : 'RIGHT'}
          title={feature.title}
          iconName={feature.icon.name}
          iconType={feature.icon.type}
          description={feature.description}
        />
      ))}
    </View>
  );
}
