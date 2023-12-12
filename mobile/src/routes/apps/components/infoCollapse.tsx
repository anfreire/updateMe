import {Icon, ListItem, Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {greys} from '../../../utils/theme';

export interface InfoCollapseProps {
  title: string;
  content: React.ReactNode;
}

export default function InfoCollapse({title, content}: InfoCollapseProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <ListItem.Accordion
      isExpanded={isExpanded}
      onPress={() => setIsExpanded(prev => !prev)}
      icon={<Icon name={'chevron-down'} type="material-community" />}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: greys[2],
      }}
      content={<Text h3>{title}</Text>}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: greys[1],
          gap: 15,
          padding: 10,
        }}>
        {content}
      </View>
    </ListItem.Accordion>
  );
}
