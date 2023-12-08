import {Button, Dialog, Overlay, Text} from '@rneui/themed';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import Files from '../../../../../modules/files';
import React from 'react';

const getSize = (size: number) => {
  const kb = 1024;
  const mb = kb * 1024;
  const gb = mb * 1024;
  if (size < kb) return `${size} B`;
  if (size < mb) return `${Math.round(size / kb)} KB`;
  if (size < gb) return `${Math.round(size / mb)} MB`;
  return `${Math.round(size / gb)} GB`;
};

const getTitle = (time: number) => {
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
};

export interface ModalControllerProps {
  file: string | null;
  visible: boolean;
}
export default function DownloadInfoModal({
  modal,
  setModal,
}: {
  modal: ModalControllerProps;
  setModal: React.Dispatch<React.SetStateAction<ModalControllerProps>>;
}) {
  const [info, setInfo] = useState<Files.FileInfo | null>(null);

  useEffect(() => {
    if (!modal.file) return;
    Files.getFileInfos(modal.file).then(setInfo);
  }, [modal.file]);
  return (
    <Dialog
      isVisible={modal.visible}
      onBackdropPress={() => setModal({file: null, visible: false})}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 5,
          gap: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
            }}>
            File:
          </Text>
          <Text style={{width: '70%'}} numberOfLines={1} ellipsizeMode="middle">
            {modal.file}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
            }}>
            Location:
          </Text>
          <Text style={{width: '70%'}} numberOfLines={1} ellipsizeMode="head">
            {Files.dir}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
            }}>
            Size:
          </Text>
          <Text style={{width: '70%'}} numberOfLines={1} ellipsizeMode="tail">
            {info?.size ? getSize(info.size) : ''}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
            }}>
            Created:
          </Text>
          <Text style={{width: '70%'}} numberOfLines={1} ellipsizeMode="tail">
            {info?.lastModified ? getTitle(info.lastModified) : ''}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: 10,
          }}>
          <Button
            onPress={() => setModal({file: null, visible: false})}
            type="clear">
            OK
          </Button>
        </View>
      </View>
    </Dialog>
  );
}
