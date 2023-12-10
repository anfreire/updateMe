import {Divider, FAB, Icon, useTheme} from '@rneui/themed';
import {useEffect} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import ListItem from '../components/listItem';
import {RoutesKeys, useSource} from '../../../hooks/useSource';
import {HomeScreenTypes} from '..';
import React from 'react';
import useAccentColor from '../../../hooks/useAccentColor';

export default function AppsMain({
  navigation,
}: HomeScreenTypes.StackScreenProps<'Apps-Main'>) {
  const [source, updateSource, _] = useSource();
  const [refreshing, setRefreshing] = React.useState(false);
  const theme = useTheme();
  const accentColor = useAccentColor(theme)[0];

  const update = () => {
    setRefreshing(true);
    updateSource().then(() => {
      setRefreshing(false);
    });
  };

  useEffect(() => {
    accentColor().then(accent => {
      if (accent) {
        theme.updateTheme({
          lightColors: {
            primary: accent.light,
          },
          darkColors: {
            primary: accent.dark,
          },
        });
      }
    });
    update();
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
          <RefreshControl refreshing={refreshing} onRefresh={update} />
        }>
        {source &&
          RoutesKeys.map((key, i) => (
            <View key={i}>
              <ListItem
                appSource={source[key]}
                microgSource={
                  key === 'YOUTUBE_YOUTUBE' || key === 'YOUTUBE_MUSIC'
                    ? source.YOUTUBE_MICROG
                    : undefined
                }
                navigation={navigation}
              />
              {i !== RoutesKeys.length - 1 && (
                <Divider style={{opacity: 0.2}} />
              )}
            </View>
          ))}
      </ScrollView>
      <FAB
        style={{
          position: 'absolute',
          bottom: 15,
          right: 15,
        }}
        buttonStyle={{
          backgroundColor: theme.theme.colors.primary,
        }}
        size="large"
        onPress={update}>
        <Icon name="refresh" type="material-comunity" />
      </FAB>
    </View>
  );
}
