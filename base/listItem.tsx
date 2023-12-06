import {Icon, Text} from '@rneui/themed';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

const DefaultRightComponent = ({icon}: {icon: React.ReactNode}) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
    }}>
    {icon}
    <Icon
      size={40}
      name="chevron-right"
      type="material-community"
      color="#888888"
    />
  </View>
);

export interface IListItemProps {
  title: string;
  icon: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightComponent?: React.ReactNode;
  onPress: () => void;
}

export default function IListItem(props: IListItemProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15,
          width: '75%',
        }}>
        {props.icon}
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: 25,
          }}>
          {props.title}
        </Text>
      </View>
      {props.rightComponent ? (
        props.rightComponent
      ) : (
        <DefaultRightComponent icon={props.rightIcon} />
      )}
    </TouchableOpacity>
  );
}
