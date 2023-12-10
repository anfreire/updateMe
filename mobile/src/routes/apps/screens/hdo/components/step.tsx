import {View} from 'react-native';
import React from 'react';
import {Text, useTheme} from '@rneui/themed';
import {greys} from '../../../../../utils/theme';
export interface StepProps {
  side: 'LEFT' | 'RIGHT';
  number: number;
  title: string;
  description: string;
}

const JustifyVariants: Record<'LEFT' | 'RIGHT', 'flex-start' | 'flex-end'> = {
  LEFT: 'flex-start',
  RIGHT: 'flex-end',
};

const TextAlignVariants: Record<'LEFT' | 'RIGHT', 'left' | 'right'> = {
  LEFT: 'left',
  RIGHT: 'right',
};

const StepNumber = ({
  number,
}: {
  number: number;
}) => {
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

export default function Step({side, number, title, description}: StepProps) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: JustifyVariants[side],
        padding: 10,
        marginVertical: 20,
        gap: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: greys[1],
      }}>
      {side === 'LEFT' && <StepNumber number={number} />}
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
            textAlign: TextAlignVariants[side],
            fontSize: 20,
            marginBottom: 10,
          }}>
          {title}
        </Text>
        <Text
          style={{
            textAlign: TextAlignVariants[side],
            fontSize: 15,
          }}>
          {description}
        </Text>
      </View>
      {side === 'RIGHT' && (
        <StepNumber number={number}  />
      )}
    </View>
  );
}
