import {TouchableOpacity} from 'react-native';
import {IconProps} from './types';
import React from 'react';
import {colors} from '../utils/theme';
import {Icon, Text, useTheme} from '@rneui/themed';

export interface IButtonProps {
  color: 'primary' | 'GREEN' | 'YELLOW' | 'RED';
  text: string;
  onPress: () => void;
  leftIcon?: IconProps;
  rightIcon?: IconProps;
}

const opaqueColors = (
  theme: any,
  color: 'primary' | 'GREEN' | 'YELLOW' | 'RED',
) => {
  switch (color) {
    case 'GREEN':
      return colors.GREEN.opaque;
    case 'YELLOW':
      return colors.YELLOW.opaque;
    case 'RED':
      return colors.RED.opaque;
    default:
      return theme.colors.primary;
  }
};

const transparentColors = {
  primary: 'transparent',
  GREEN: colors.GREEN.transparent,
  YELLOW: colors.YELLOW.transparent,
  RED: colors.RED.transparent,
};

export default function GhostButton({
  color,
  text,
  onPress,
  leftIcon,
  rightIcon,
}: IButtonProps) {
  const {theme} = useTheme();
  return (
    <TouchableOpacity
      style={{
        borderRadius: 5,
        padding: 5,
        borderColor: opaqueColors(theme, color),
        backgroundColor: transparentColors[color],
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}>
      {leftIcon && (
        <Icon
          name={leftIcon.name}
          type={leftIcon.type}
          color={opaqueColors(theme, color)}
        />
      )}
      <Text
        style={{
          color: opaqueColors(theme, color),
        }}>
        {text}
      </Text>
      {rightIcon && (
        <Icon
          name={rightIcon.name}
          type={rightIcon.type}
          color={opaqueColors(theme, color)}
        />
      )}
    </TouchableOpacity>
  );
}
