import {TouchableOpacity, View} from 'react-native';
import {Image, Text, Icon} from '@rneui/themed';
import Badge from './badge';
import {SourceProps, useSource} from '../../../../../hooks/source';
import {useCurrApp} from '../../../../../hooks/currApp';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeScreenTypes} from '../..';
import IListItem from '../../../../../common/listItem';
import {AppKeys} from '..';

type AppKeys = 'HDO' | 'YOUTUBE_YOUTUBE' | 'YOUTUBE_MUSIC' | 'SPOTIFY';

const routes: Record<AppKeys, string> = {
  HDO: 'Apps-HDO',
  YOUTUBE_YOUTUBE: 'Apps-Youtube',
  YOUTUBE_MUSIC: 'Apps-YoutubeMusic',
  SPOTIFY: 'Apps-Spotify',
};

export interface ListItemProps {
  name: AppKeys;
  navigation: NativeStackNavigationProp<
    HomeScreenTypes.RootStackParamList,
    'Apps-Main',
    undefined
  >;
}

export default function ListItem(props: ListItemProps) {
  const [_, setCurrentApp] = useCurrApp();
  const source = useSource()[0];

  return (
    <IListItem
      title={source[props.name].title}
      icon={
        <Image
          source={source[props.name].icon}
          resizeMode="contain"
          style={{
            width: 40,
            height: 40,
          }}
        />
      }
      rightIcon={
        <Badge
          packageName={source[props.name].package}
          version={source[props.name].version}
        />
      }
      onPress={() => {
        setCurrentApp(source[props.name]);
        props.navigation.navigate(routes[props.name] as any);
      }}
    />
  );
}
