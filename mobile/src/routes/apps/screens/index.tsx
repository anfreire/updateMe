import {Divider, FAB, Icon, ListItem, useTheme} from '@rneui/themed';
import {useEffect} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {useSource} from '../../../hooks/useSource';
import {HomeScreenTypes} from '..';
import React from 'react';
import useAccentColor from '../../../hooks/useAccentColor';
import useRouteEffect from '../../../hooks/useRouteEffect';
import MainList from '../components/mainList';

export default function AppsMain({}: HomeScreenTypes.StackScreenProps<'Apps-Main'>) {
  const updateSource = useSource()[1];
  const [refreshing, setRefreshing] = React.useState(false);
  const theme = useTheme();
  const accentColor = useAccentColor(theme)[0];

  const update = () => {
    setRefreshing(true);
    updateSource().then(() => {
      setRefreshing(false);
    });
  };

  useRouteEffect({
    onRoute: update,
  });

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
      <MainList refreshing={refreshing} onRefresh={update} />
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
