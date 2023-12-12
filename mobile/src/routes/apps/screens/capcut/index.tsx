import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import InfoCollapse from '../../components/infoCollapse';
import {Text} from '@rneui/themed';
import {View} from 'react-native';
import {LongFeatures, ShortFeatures} from '../../components/features';
import {CapcutFeatures} from './data';

export type Variants = 'What Is Capcut?';

type ExpandedVariants = null | Variants;

export default function AppsCapcut() {
  const source = useSource()[0];

  return (
    <>
      <ScreenBase source={source.CAPCUT}>
        <InfoCollapse
          title="What Is Capcut?"
          content={
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                gap: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                }}>
                CapCut is a video editing app that was originally developed by
                Bytedance on April 10, 2020. It has every video editing tool you
                need to have in order to make personal or even professional
                videos. Later on, CapCut released many new versions over the
                time with latest features and updates.
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                }}>
                This version was created by third-party developers to unlock all
                of the premium features that you can use without having to pay
                for premium memberships.
              </Text>
            </View>
          }
        />
        <View
          style={{
            marginVertical: 10,
          }}>
          <ShortFeatures
            features={['No Watermark', 'No Ads', 'Premium Unlocked']}
          />
        </View>
        <LongFeatures features={CapcutFeatures} />
      </ScreenBase>
    </>
  );
}
