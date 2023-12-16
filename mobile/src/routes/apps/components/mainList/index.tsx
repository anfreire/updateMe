import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {CategoryKeys} from './categories/data';
import CategoryListItem from './categories';
import {
  SourceKeys,
  SourceKeysType,
  useSource,
} from '../../../../hooks/useSource';
import useRouteEffect from '../../../../hooks/useRouteEffect';
import Frame from '../../../../common/frame';
import {Icon, Text} from '@rneui/themed';
import ThemeModule from '../../../../modules/theme';
import {useNavigation} from '@react-navigation/native';

export interface MainListProps {
  refreshing: boolean;
  onRefresh: () => void;
}

type updateType = {
  title: string;
  macro: string;
};

type RootStackParamList = {
  Tools: undefined;
  'Tools-Updates': undefined;
  // add other screen names here
};

export const WarningUpdate = () => {
  const navigation = useNavigation();
  const [titles, setTitles] = useState<updateType[]>([]);
  const source = useSource()[0];

  const update = () => {
    setTitles([]);
    SourceKeys.forEach(key => {
      if (source[key].state === 'NOT_UPDATED') {
        setTitles(prev => [...prev, {title: source[key].title, macro: key}]);
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
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigation.navigate('Tools', {
            screen: 'Tools-Updates',
          })
        }>
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
              {titles.map(app => (
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    padding: 7,
                    backgroundColor: ThemeModule.Colors.grey[2],
                    borderRadius: 5,
                  }}
                  key={app.title}>
                  {app.title}
                </Text>
              ))}
            </View>
          </View>
        </Frame>
      </TouchableOpacity>
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
