import {View} from 'react-native';
import {IconProps} from '../../../../../common/types';
import {Icon, Text, useTheme} from '@rneui/themed';
import React from 'react';
import {greys} from '../../../../../utils/theme';

export interface GridFeauturesItemProps {
  title: string;
  description: string;
  icon: IconProps;
}

function GridFeaturesItem({title, description, icon}: GridFeauturesItemProps) {
  const {theme} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        borderColor: greys[1],
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 15,
        paddingHorizontal: 10,
        gap: 10,
      }}>
      <View
        style={{
          position: 'relative',
          width: 75,
          height: 75,
        }}>
        <View
          style={{
            position: 'absolute',
            width: 75,
            height: 75,
            borderRadius: 50,
            backgroundColor: theme.colors.primary,
            opacity: 0.3,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 75,
              height: 75,
            }}>
            <Icon name={icon.name} type={icon.type} size={50} />
          </View>
        </View>
      </View>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
          }}>
          {description}
        </Text>
      </View>
    </View>
  );
}

function GridFeauturesRow({items}: {items: GridFeauturesItemProps[]}) {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
      }}>
      {items.map((item, index) => (
        <GridFeaturesItem
          key={index}
          title={item.title}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </View>
  );
}

export interface GridFeaturesProps {
  items: GridFeauturesItemProps[];
  width?: number;
  height?: number;
}

export default function GridFeatures({items, width}: GridFeaturesProps) {
  width ||= Math.floor(Math.sqrt(items.length));
  const rows = [];
  for (let i = 0; i < items.length; i += width) {
    if (i + width > items.length) rows.push(items.slice(i));
    else rows.push(items.slice(i, i + width));
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 15,
      }}>
      {rows.map((row, index) => (
        <GridFeauturesRow key={index} items={row} />
      ))}
    </View>
  );
}
