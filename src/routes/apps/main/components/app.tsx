import {Button, Image, Text, useTheme} from '@rneui/themed';
import {ImageSourcePropType, View} from 'react-native';
import {useCurrApp} from '../../../../../hooks/currApp';
import {downloadAndInstall} from '../../../../../utils/apps';
import {useState} from 'react';
import {Divider, LinearProgress} from '@rneui/base';
import {useSource} from '../../../../../hooks/source';

export default function HomeApp() {
  const currApp = useCurrApp()[0];
  const source = useSource()[0];
  const theme = useTheme();
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}>
        <Image
          source={currApp?.icon as ImageSourcePropType}
          resizeMode="contain"
          style={{
            width: 100,
            height: 100,
          }}
        />
        <Text h1>{currApp?.title}</Text>
        <Button
          onPress={() => {
            downloadAndInstall(currApp?.link, setProgress);
          }}>
          Download
        </Button>
        <LinearProgress
          style={{marginTop: 30, width: 200, height: 10, borderRadius: 5}}
          color={theme.theme.colors.primary}
          value={progress}
          animation={false}
        />
      </View>
      {currApp?.title.toLowerCase().includes('youtube') ? (
        <>
          <Divider style={{opacity: 0.2, width: '100%', marginVertical: 30}} />
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}>
            <Image
              source={source.YOUTUBE_MICROG?.icon as ImageSourcePropType}
              resizeMode="contain"
              style={{
                width: 100,
                height: 100,
              }}
            />
            <Text h1>{source.YOUTUBE_MICROG.title}</Text>
            <Button
              onPress={() => {
                downloadAndInstall(source.YOUTUBE_MICROG.link, setProgress2);
              }}>
              Download
            </Button>
            <LinearProgress
              style={{marginTop: 30, width: 200, height: 10, borderRadius: 5}}
              color={theme.theme.colors.primary}
              value={progress2}
              animation={false}
            />
          </View>
        </>
      ) : null}
    </View>
  );
}
