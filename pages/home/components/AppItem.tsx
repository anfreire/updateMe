import {TouchableOpacity, View} from 'react-native';
import {Icon, Text, IconButton, Chip} from 'react-native-paper';
import Files from '../../../modules/files';
import {useRecoilState} from 'recoil';
import {downloadModalProgress, downloadModalVisible} from './downloadModal';
import Permissions from '../../../modules/permission';

interface AppItemProps {
  title: string;
  iconSource: string;
  iconColor: string;
}

export default function AppItem({title, iconSource, iconColor}: AppItemProps) {
  const [modalOpen, setModalOpen] = useRecoilState(downloadModalVisible);
  const [modalProgress, setModalProgress] = useRecoilState(
    downloadModalProgress,
  );
  return (
    <TouchableOpacity
      onPress={() => {
        Files.downloadAndInstall({
          url: 'https://github.com/j-hc/revanced-magisk-module/releases/download/20220912/youtube-revanced-v18.45.41-all.apk',
          fileName: 'youtube-revanced-v18.45.41-all.apk',
          onStart: () => {
            setModalOpen(true);
          },
          onProgress: progress => {
            setModalProgress(progress);
          },
          onCompleted: _ => {
            setModalOpen(false);
            setModalProgress(0);
            console.log('done');
          },
        });
      }}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          gap: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
          }}>
          <Icon size={60} color={iconColor} source={iconSource} />
          <Text
            style={{
              fontSize: 25,
            }}>
            {title}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 15,
          }}>
          <Chip
            style={{
              backgroundColor: '#9bf169a7',
            }}
            mode="outlined">
            Installed
          </Chip>
          <Chip mode="outlined">111</Chip>
          <IconButton icon="chevron-right" size={30} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
