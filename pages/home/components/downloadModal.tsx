import {Modal, ProgressBar} from 'react-native-paper';
import {useState} from 'react';
import React from 'react';
import {atom, useRecoilState} from 'recoil';

export const downloadModalVisible = atom<boolean>({
  key: 'download-modal-visible',
  default: false,
});

export const downloadModalProgress = atom<number>({
  key: 'download-modal-progress',
  default: 0,
});

export function DownloadModal() {
  const [open, _] = useRecoilState(downloadModalVisible);
  const [progress, __] = useRecoilState(downloadModalProgress);
  return (
    <Modal
      visible={open}
      style={{
        backgroundColor: 'black',
        padding: 20,
        margin: 60,
      }}>
      <ProgressBar
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
        progress={progress}
        color="white"
      />
    </Modal>
  );
}
