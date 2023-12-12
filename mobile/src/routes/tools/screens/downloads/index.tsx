import {
  RefreshControl,
  ScrollView,
  Modal,
  View,
  TouchableOpacity,
} from 'react-native';
import Files from '../../../../modules/files';
import {useEffect, useState} from 'react';

import DownloadsListItem from './components/listItem';
import {Icon, Text} from '@rneui/themed';
import DownloadInfoModal, {ModalControllerProps} from './components/infoModal';
import {deleteAllFiles} from '../../../../utils/apps';
import React from 'react';
import {ToolsScreenTypes} from '../..';
import Permissions from '../../../../modules/permissions';

const getHeaderRightFiles = (onPress: () => void) => (
  <TouchableOpacity
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    }}
    onPress={onPress}>
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
);

const getHeaderRightEmpty = (onPress: () => void) => (
  <TouchableOpacity
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    }}
    onPress={onPress}>
    <Icon size={25} name="refresh" type="material-community" />
  </TouchableOpacity>
);

export default function ToolsDownloads({
  navigation,
  route,
}: ToolsScreenTypes.StackScreenProps<'Tools-Downloads'>) {
  const [files, setFiles] = useState<string[]>([]);
  const [modal, setModal] = useState<ModalControllerProps>({
    file: null,
    visible: false,
  });
  const [refreshing, setRefreshing] = useState(false);

  const update = () => {
    setRefreshing(true);
    Files.listFiles().then(files => {
      setFiles(files.filter(file => file.endsWith('.apk')));
      setRefreshing(false);
    });
  };

  useEffect(() => {
    if (files.length == 0)
      navigation.setOptions({headerRight: _ => getHeaderRightEmpty(update)});
    else
      navigation.setOptions({
        headerRight: _ =>
          getHeaderRightFiles(() => deleteAllFiles(files).then(update)),
      });
  }, [files]);

  useEffect(() => {
    if (route.name === 'Tools-Downloads') {
      Permissions.getPermissions('READ').then(res =>
        !res ? Permissions.requestPermissions('READ') : null,
      );
      Permissions.getPermissions('WRITE').then(res =>
        !res ? Permissions.requestPermissions('WRITE') : null,
      );
      update();
    }
  }, [route]);

  return (
    <>
      {files.length > 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={update} />
          }>
          {files.map((file, i) => (
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
      ) : (
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
      <DownloadInfoModal modal={modal} setModal={setModal} />
    </>
  );
}
