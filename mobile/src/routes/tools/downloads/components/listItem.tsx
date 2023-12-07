import {View} from 'react-native';
import IListItem from '../../../../../common/listItem';
import {Divider, Icon, ListItem} from '@rneui/themed';
import {ModalControllerProps} from './infoModal';
import Files from '../../../../../modules/files';
import {Button} from '@rneui/base';
import {colors} from '../../../../../utils/theme';

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
      <ListItem.Swipeable
        rightWidth={75}
        minSlideWidth={75}
        leftWidth={75}
        leftContent={action => (
          <Button
            containerStyle={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 255, 0.2)',
            }}
            type="clear"
            onPress={() => {
              action();
              setModal({
                visible: true,
                file,
              });
            }}>
            <Icon name="info" type="material" />
          </Button>
        )}
        rightContent={action => (
          <Button
            containerStyle={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: colors.RED.transparent,
            }}
            type="clear"
            icon={<Icon name="delete-outline" type="material" />}
            onPress={() => {
              action();
              Files.deleteFile(file).then(update);
            }}
          />
        )}>
        <ListItem.Chevron style={{transform: [{rotate: '180deg'}]}} />
        {file.endsWith('.apk') ? (
          <Icon color="#9FC037" name="android" type="font-awesome" size={35} />
        ) : (
          <Icon name="question" type="font-awesome" />
        )}
        <ListItem.Content>
          <ListItem.Title style={{fontSize: 25, fontWeight: '100'}}>
            {getTitle(file)}
          </ListItem.Title>
          <ListItem.Subtitle style={{fontSize: 12}}>{file}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
      {i !== files.length - 1 && <Divider style={{opacity: 0.2}} />}
    </View>
  );
}
