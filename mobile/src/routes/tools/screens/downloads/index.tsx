import {
  RefreshControl,
  ScrollView,
  Modal,
  View,
  TouchableOpacity,
} from 'react-native';
import Files from '../../../../modules/files';
import {useEffect, useState} from 'react';

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
import {} from 'rn-fetch-blob';
import DownloadsListItem from './components/listItem';
import {Icon, Text} from '@rneui/themed';
import DownloadInfoModal, {ModalControllerProps} from './components/infoModal';
import {deleteAllFiles} from '../../../../utils/apps';

export default function ToolsDownloads({navigation}: any) {
  const [files, setFiles] = useState<string[]>([]);
  const [modal, setModal] = useState<ModalControllerProps>({
    file: null,
    visible: false,
  });
  const [refreshing, setRefreshing] = useState(false);

  const update = () => {
    setRefreshing(true);
    Files.listFiles().then(files => {
      setFiles(files);
      setRefreshing(false);
      if (files.length == 0) navigation.setOptions({headerRight: undefined});
      else
        navigation.setOptions({
          headerRight: (
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
              }}
              onPress={() => {
                deleteAllFiles();
                update();
              }}>
              <Text
                style={{
                  color: 'rgba(255,0,0,0.5)',
                  fontSize: 20,
                  fontWeight: '100',
                }}>
                Delete all
              </Text>
              <Icon
                color="rgba(255,0,0,0.5)"
                size={25}
                name="delete"
                type="material-community"
              />
            </TouchableOpacity>
          ),
        });
    });
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <>
      <DownloadInfoModal modal={modal} setModal={setModal} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={update} />
        }>
        {files.length > 0 &&
          files.map((file, i) => (
            <DownloadsListItem
              key={i}
              file={file}
              files={files}
              i={i}
              setModal={setModal}
              update={update}
            />
          ))}
      </ScrollView>
      {files.length == 0 && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            gap: 15,
          }}>
          <Text h4>No files found</Text>
          <Icon size={30} name="emoticon-sad" type="material-community" />
        </View>
      )}
    </>
  );
}
