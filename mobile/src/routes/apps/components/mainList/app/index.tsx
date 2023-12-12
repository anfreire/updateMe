import {Image, ListItem} from '@rneui/themed';
import {SourceKeysType, useSource} from '../../../../../hooks/useSource';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

export interface AppListItemProps {
  app: SourceKeysType;
}

export default function AppListItem(props: AppListItemProps) {
  const source = useSource()[0];
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate({
          name: source[props.app].route,
        } as never);
      }}>
      <ListItem>
        <ListItem.Content
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginLeft: 15,
            gap: 15,
          }}>
          <Image
            source={source[props.app].icon}
            resizeMode="contain"
            style={{
              width: 40,
              height: 40,
            }}
          />
          <ListItem.Title
            style={{
              fontSize: 18,
            }}>
            {source[props.app].title}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
}
