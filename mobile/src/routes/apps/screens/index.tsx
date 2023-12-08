import {Divider, FAB, Icon, useTheme} from '@rneui/themed';
import {useEffect} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import ListItem from '../components/listItem';
import {RoutesKeys, useSource} from '../../../hooks/useSource';
import {HomeScreenTypes} from '..';
import React from 'react';
export default function AppsMain({
  navigation,
}: HomeScreenTypes.StackScreenProps<'Apps-Main'>) {
  const [source, updateSource] = useSource();
  const {theme} = useTheme();

  useEffect(() => {
    updateSource();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={updateSource} />
        }>
        {RoutesKeys.map((key, i) => (
          <View key={i}>
            <ListItem
              appSource={source[key]}
              microgSource={source.YOUTUBE_MICROG}
              navigation={navigation}
            />
            {i !== RoutesKeys.length - 1 && <Divider style={{opacity: 0.2}} />}
          </View>
        ))}
      </ScrollView>
      <FAB
        style={{
          position: 'absolute',
          bottom: 25,
          right: 25,
        }}
        buttonStyle={{
          backgroundColor: theme.colors.primary,
        }}
        size="large"
        onPress={updateSource}>
        <Icon name="refresh" type="material-comunity" />
      </FAB>
    </View>
  );
}