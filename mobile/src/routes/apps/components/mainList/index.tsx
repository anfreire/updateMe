import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {CategoryKeys} from './categories/data';
import CategoryListItem from './categories';
import {SourceKeys, useSource} from '../../../../hooks/useSource';
import useRouteEffect from '../../../../hooks/useRouteEffect';
import Frame from '../../../../common/frame';
import {Icon, Text} from '@rneui/themed';
import ThemeModule from '../../../../modules/theme';

export interface MainListProps {
  refreshing: boolean;
  onRefresh: () => void;
}

export const WarningUpdate = () => {
  const [titles, setTitles] = useState<string[]>([]);
  const source = useSource()[0];

  const update = () => {
    setTitles([]);
    SourceKeys.forEach(key => {
      if (source[key].state === 'NOT_UPDATED') {
        setTitles(prev => [...prev, source[key].title]);
      }
    });
  };

  useEffect(() => {
    update();
  }, [source]);

  useRouteEffect({
    onRoute: () => {
      update();
    },
  });

  return titles.length > 0 ? (
    <View
      style={{
        padding: 10,
      }}>
      <Frame borderColor="YELLOW">
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 20,
            padding: 10,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 10,
            }}>
            <Icon
              name="warning"
              type="material"
              color={ThemeModule.Colors.yellow.opaque}
              size={25}
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: ThemeModule.Colors.yellow.opaque,
              }}>
              Updates available
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              gap: 10,
            }}>
            {titles.map(title => (
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  padding: 7,
                  backgroundColor: ThemeModule.Colors.grey[2],
                  borderRadius: 5,
                }}
                key={title}>
                {title}
              </Text>
            ))}
          </View>
        </View>
      </Frame>
    </View>
  ) : null;
};

export default function MainList(props: MainListProps) {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      }>
      <WarningUpdate />
      {CategoryKeys.map((category, index) => (
        <CategoryListItem key={category} index={index} category={category} />
      ))}
    </ScrollView>
  );
}
