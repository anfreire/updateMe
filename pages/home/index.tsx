import {ScrollView, View} from 'react-native';
import {Divider, List} from 'react-native-paper';
import theme from '../../modules/theme';
import AppItem from './components/AppItem';
import {DownloadModal} from './components/downloadModal';

const DATA = [
  {
    title: 'Youtube',
    iconSource: 'youtube',
    iconColor: '#ff0000',
  },
  {
    title: 'Spotify',
    iconSource: 'spotify',
    iconColor: '#1db954',
  },
];

export default function Home() {
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}>
      <ScrollView>
        <List.Section
          style={{
            width: '100%',
          }}>
          {DATA.map((item, index) => (
            <View key={index} style={{width: '100%'}}>
              <AppItem
                key={item.title}
                title={item.title}
                iconSource={item.iconSource}
                iconColor={item.iconColor}
              />
              {index !== DATA.length - 1 ? (
                <Divider
                  style={{
                    borderColor: theme.border1,
                    backgroundColor: theme.border1,
                  }}
                />
              ) : null}
            </View>
          ))}
        </List.Section>
      </ScrollView>
    </View>
  );
}
