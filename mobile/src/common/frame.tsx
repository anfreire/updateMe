import {StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';
import ThemeModule from '../modules/theme';

type BorderColorType =
  | 'GREY-1'
  | 'GREY-2'
  | 'GREY-3'
  | 'RED'
  | 'GREEN'
  | 'YELLOW';
type BackgroundColorType = 'transparent' | 'RED' | 'GREEN' | 'YELLOW';

const borderColors: Record<BorderColorType, string> = {
  'GREY-1': ThemeModule.Colors.grey[1],
  'GREY-2': ThemeModule.Colors.grey[2],
  'GREY-3': ThemeModule.Colors.grey[3],
  RED: ThemeModule.Colors.red.opaque,
  GREEN: ThemeModule.Colors.green.opaque,
  YELLOW: ThemeModule.Colors.yellow.opaque,
};

const backgroundColors: Record<BackgroundColorType, string> = {
  transparent: 'transparent',
  RED: ThemeModule.Colors.red.transparent,
  GREEN: ThemeModule.Colors.green.transparent,
  YELLOW: ThemeModule.Colors.yellow.transparent,
};

export interface FrameProps {
  children: React.ReactNode;
  borderColor?: BorderColorType;
  backgroundColor?: BackgroundColorType;
  style?: StyleProp<ViewStyle>;
}

export default function Frame({
  children,
  borderColor = 'GREY-1',
  backgroundColor = 'transparent',
  style,
}: FrameProps) {
  return (
    <View
      style={{
        gap: 10,
        padding: 15,
        width: '100%',
        borderWidth: 1,
        display: 'flex',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: borderColors[borderColor],
        backgroundColor: backgroundColors[backgroundColor],
        ...(style ? {style} : {}),
      }}>
      {children}
    </View>
  );
}
