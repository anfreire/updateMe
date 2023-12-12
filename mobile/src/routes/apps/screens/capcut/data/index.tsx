import {View} from 'react-native';
import {LongFeatureType} from '../../../components/features';
import {Text} from '@rneui/themed';
import React from 'react';

export const CapCutInfo = {
  title: 'What Is Capcut?',
  content: (
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
        CapCut is a video editing app that was originally developed by Bytedance
        on April 10, 2020. It has every video editing tool you need to have in
        order to make personal or even professional videos. Later on, CapCut
        released many new versions over the time with latest features and
        updates.
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
        }}>
        This version was created by third-party developers to unlock all of the
        premium features that you can use without having to pay for premium
        memberships.
      </Text>
    </View>
  ),
};

export const CapcutFeatures: LongFeatureType[] = [
  {
    title: 'Latest tools',
    icon: {
      name: 'crop',
      type: 'material',
    },
    description:
      'Say no to old-school methods of video editing and embrace the beauty of the latest video editing tools. You can edit any video clip by trimming, cutting, splitting or joining them together. Or you can also merge the video clips, and make use of tools to change the video speed to rotate or flip them.',
  },
  {
    title: 'Audio Editing',
    icon: {
      name: 'volume-up',
      type: 'material',
    },
    description:
      'Other than videos, you get a chance of editing audio as well. You can use the audio tool to adjust the volume levels or make them audible by reducing the noise. Moreover, you can add music or voice-overs to your required videos.',
  },
  {
    title: 'Filters & Effects',
    icon: {
      name: 'star',
      type: 'material',
    },
    description:
      'Gone are the days when professional editors were required to create catchy and beautifully edited videos. Today this is possible with the help of filters and effects. CapCut offers you tons of filters and Effects to add visual appeal to the videos. You can use color correction to remove any unwanted dull colors from the videos. Also, changing the effects can keep your video content catchy and attractive to a large number of eyeballs.',
  },
  {
    title: 'Sound Effects',
    icon: {
      name: 'microphone',
      type: 'material-community',
    },
    description:
      'You can download CapCut to add a large variety of music to your videos without any watermark. A royalty-free music library helps you enjoy a large amount of music to enhance the audio experience of your videos.',
  },
  {
    title: 'Friendly UI',
    icon: {
      name: 'page-layout-sidebar-right',
      type: 'material-community',
    },
    description:
      'The best part of the CapCut is its user-friendly interface with easy-to-use tools. I remember I had zero experience in video editing when I sarted using this app and it immediately made me capable of creating quality video content. You don’t need to be a professional video editor in order to start. Just download the app and you are all set to go.',
  },
  {
    title: 'Advanced Features',
    icon: {
      name: 'palette-advanced',
      type: 'material-community',
    },
    description:
      'You get tons of new features with advanced options in this CapCut version. If you are a happy-go-lucky kind of person like me, use pre-designed montage templates that can help you edit the videos faster. Furthermore, using keyframe animation can help you have precise control and scale throughout the content. All these advanced tools speed up the process with precision, accuracy, and attention to detail.',
  },
];
