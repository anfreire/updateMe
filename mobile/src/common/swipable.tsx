import {Button, Icon, ListItem} from '@rneui/themed';
import React from 'react';

export default function ISwipable() {
  return (
    <ListItem.Swipeable
      rightWidth={75}
      minSlideWidth={75 as any}
      leftWidth={0}
      rightContent={action => (
        <Button
          containerStyle={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#f4f4f4',
          }}
          type="clear"
          icon={{name: 'delete-outline'}}
          onPress={action}
        />
      )}>
      <Icon name="label-important-outline" type="material" />
      <ListItem.Content>
        <ListItem.Title>Email from John Doe</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
}
