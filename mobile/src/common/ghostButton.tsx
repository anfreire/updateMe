import {TouchableOpacity} from 'react-native';
import {IconProps, StateColors} from './types';
import React from 'react';
import ThemeModule from '../modules/theme';
import {Icon, Text, useTheme} from '@rneui/themed';

export interface IButtonProps {
  color: 'primary' | StateColors;
  text: string;
  onPress: () => void;
  leftIcon?: IconProps;
  rightIcon?: IconProps;
  disabled?: boolean;
}

const opaqueColors = (theme: any, color: 'primary' | StateColors) => {
  switch (color) {
    case 'green':
      return ThemeModule.Colors.green.opaque;
    case 'yellow':
      return ThemeModule.Colors.yellow.opaque;
    case 'red':
      return ThemeModule.Colors.red.opaque;
    default:
      return theme.colors.primary;
  }
};

const transparentColors = {
  primary: 'transparent',
  green: ThemeModule.Colors.green.transparent,
  yellow: ThemeModule.Colors.yellow.transparent,
  red: ThemeModule.Colors.red.transparent,
};

export default function GhostButton({
  color,
  text,
  onPress,
  leftIcon,
  rightIcon,
  disabled,
}: IButtonProps) {
  const {theme} = useTheme();
  return (
    <TouchableOpacity
      disabled={disabled}
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
        opacity: disabled ? 0.5 : 1,
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
