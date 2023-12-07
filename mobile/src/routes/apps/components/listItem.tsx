import {Image} from '@rneui/themed';
import Badge from './badge';
import {useSource} from '../../../hooks/useSource';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeScreenTypes} from '..';
import IListItem from '../../../common/listItem';
import {AppKeys} from '../screens';

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
          packageName={source[props.name].packageName}
          version={source[props.name].version}
        />
      }
      onPress={() => {
        props.navigation.navigate(routes[props.name] as any);
      }}
    />
  );
}
