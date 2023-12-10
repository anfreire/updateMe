import {Image} from '@rneui/themed';
import Badge from './badge';
import {SourceType} from '../../../hooks/useSource';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeScreenTypes} from '..';
import IListItem from '../../../common/listItem';
import React from 'react';

export interface ListItemProps {
  appSource: SourceType;
  microgSource?: SourceType;
  navigation: NativeStackNavigationProp<
    HomeScreenTypes.RootStackParamList,
    'Apps-Main',
    undefined
  >;
}

export default function ListItem(props: ListItemProps) {
  return (
    <IListItem
      title={props.appSource.title}
      icon={
        <Image
          source={props.appSource.icon}
          resizeMode="contain"
          style={{
            width: 40,
            height: 40,
          }}
        />
      }
      rightIcon={
        <Badge appSource={props.appSource} microgSource={props.microgSource} />
      }
      onPress={() => {
        props.navigation.navigate(props.appSource.route as any);
      }}
    />
  );
}
