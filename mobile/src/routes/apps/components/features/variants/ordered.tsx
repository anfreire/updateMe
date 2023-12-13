import {View} from 'react-native';
import React from 'react';
import {Text, useTheme} from '@rneui/themed';
import ThemeModule from '../../../../../modules/theme';

const FeatureNumber = ({number}: {number: number}) => {
  const {theme} = useTheme();

  return (
    <View
      style={{
        width: 60,
        height: 60,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: theme.colors.primary,
          opacity: 0.5,
          position: 'absolute',
        }}
      />
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: theme.colors.primary,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 25,
            opacity: 1,
          }}>
          {number}
        </Text>
      </View>
    </View>
  );
};

function OrderedFeature({
  side,
  number,
  title,
  description,
}: {
  side: 'LEFT' | 'RIGHT';
  number: number;
  title: string;
  description: string;
}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: side === 'LEFT' ? 'flex-start' : 'flex-end',
        padding: 10,
        marginVertical: 20,
        gap: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: ThemeModule.Colors.grey[1],
      }}>
      {side === 'LEFT' && <FeatureNumber number={number} />}
      <View
        style={{
          width: '80%',
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: side === 'LEFT' ? 'left' : 'right',
            fontSize: 20,
            marginBottom: 10,
          }}>
          {title}
        </Text>
        <Text
          style={{
            textAlign: side === 'LEFT' ? 'left' : 'right',
            fontSize: 15,
          }}>
          {description}
        </Text>
      </View>
      {side === 'RIGHT' && <FeatureNumber number={number} />}
    </View>
  );
}

export interface OrderedFeaturesType {
  title: string;
  description: string;
}

export interface OrderedFeaturesProps {
  features: OrderedFeaturesType[];
}

export default function OrderedFeatures({features}: OrderedFeaturesProps) {
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
        <OrderedFeature
          key={index}
          side={index % 2 === 0 ? 'LEFT' : 'RIGHT'}
          number={index + 1}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </View>
  );
}
