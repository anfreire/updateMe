import {Divider, Icon, ListItem, Text} from '@rneui/themed';
import React from 'react';
import {Categories, CategoryKeyType, CategoryKeys} from './data';
import {useSource} from '../../../../../hooks/useSource';
import AppListItem from '../app';
import {View} from 'react-native';

export interface CategoryListItemProps {
  category: CategoryKeyType;
  index: number;
}

export default function CategoryListItem(props: CategoryListItemProps) {
  const [open, setOpen] = React.useState(false);
  const source = useSource()[0];
  return (
    <>
      <ListItem.Accordion
        isExpanded={open}
        onPress={() => setOpen(prev => !prev)}
        icon={<Icon name={'chevron-down'} type="material-community" />}
        content={
          <ListItem.Content
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingVertical: 10,
              gap: 15,
            }}>
            <Icon
              name={Categories[props.category].icon.name}
              type={Categories[props.category].icon.type}
              size={30}
            />
            <ListItem.Title
              style={{
                fontSize: 22,
              }}>
              {Categories[props.category].title}
            </ListItem.Title>
          </ListItem.Content>
        }>
        <View
          style={{
            marginBottom: open ? 20 : 0,
          }}>
          {Categories[props.category].apps.map(app => (
            <AppListItem key={app} app={app} />
          ))}
        </View>
      </ListItem.Accordion>
      {props.index < CategoryKeys.length - 1 && (
        <Divider
          style={{
            opacity: 0.4,
          }}
        />
      )}
    </>
  );
}
