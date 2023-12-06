import {View} from 'react-native';
import IListItem from '../../../../../common/listItem';
import {Divider, Icon} from '@rneui/themed';
import {ModalControllerProps} from './infoModal';
import Files from '../../../../../modules/files';

const getTitle = (file: string) => {
  const lowerFile = file.toLowerCase();
  switch (true) {
    case lowerFile.includes('music'):
      return 'YouTube Music';
    case lowerFile.includes('microg'):
      return 'MicroG';
    case lowerFile.includes('youtube'):
      return 'YouTube';
    case lowerFile.includes('spotify'):
      return 'Spotify';
    default:
      return file;
  }
};

export default function DownloadsListItem({
  file,
  i,
  files,
  setModal,
  update,
}: {
  file: string;
  i: number;
  files: string[];
  setModal: React.Dispatch<React.SetStateAction<ModalControllerProps>>;
  update: () => void;
}) {
  return (
    <View>
      <IListItem
        title={getTitle(file)}
        icon={
          file.endsWith('.apk') ? (
            <Icon
              color="#9FC037"
              name="android"
              type="font-awesome"
              size={35}
            />
          ) : (
            <Icon name="question" type="font-awesome" />
          )
        }
        rightComponent={
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
            }}>
            <Icon
              onPress={() => setModal({file, visible: true})}
              size={40}
              name="info"
              color="#1e92f4"
            />
            <Icon
              onPress={() => Files.deleteFile(file).then(update)}
              size={40}
              name="delete"
              type="material-community"
              color="#d11a2a"
            />
          </View>
        }
        onPress={() => {}}
      />
      {i !== files.length - 1 && <Divider style={{opacity: 0.2}} />}
    </View>
  );
}
