import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import React from 'react';
import {AppealingFeatures, YoutubeCOmpleteFeautures} from './data';
import GridFeatures from '../../components/features/variants/grid';
import Frame from '../../../../common/frame';
import {Text} from '@rneui/themed';
import {View} from 'react-native';
import {InfoCollapse} from '../../components/info';

export default function AppsYoutube() {
  const source = useSource()[0];

  return (
    <ScreenBase
      source={source.YOUTUBE_YOUTUBE}
      microgSource={source.YOUTUBE_MICROG}>
      <Frame>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
          }}>
          This Youtube version is a free and open-source modification of the
          official YouTube app.
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
          }}>
          It offers a number of features that are not available in the official
          app
        </Text>
      </Frame>
      <GridFeatures items={AppealingFeatures} width={2} />
      <InfoCollapse
        title="All features"
        content={
          <View>
            {YoutubeCOmpleteFeautures.map((item, index) => (
              <Text
                key={index}
                style={{
                  fontSize: 16,
                  padding: 5,
                  textAlign: 'left',
                }}>
                - {item}
              </Text>
            ))}
          </View>
        }
      />
    </ScreenBase>
  );
}
