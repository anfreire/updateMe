import {StyleProp, View, ViewStyle} from 'react-native';
import {colors, greys} from '../utils/theme';
import React from 'react';

type BorderColorType =
  | 'GREY-1'
  | 'GREY-2'
  | 'GREY-3'
  | 'RED'
  | 'GREEN'
  | 'YELLOW';
type BackgroundColorType = 'transparent' | 'RED' | 'GREEN' | 'YELLOW';

const borderColors: Record<BorderColorType, string> = {
  'GREY-1': greys[1],
  'GREY-2': greys[2],
  'GREY-3': greys[3],
  RED: colors.RED.opaque,
  GREEN: colors.GREEN.opaque,
  YELLOW: colors.YELLOW.opaque,
};

const backgroundColors: Record<BackgroundColorType, string> = {
  transparent: 'transparent',
  RED: colors.RED.transparent,
  GREEN: colors.GREEN.transparent,
  YELLOW: colors.YELLOW.transparent,
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
