import {Text} from '@rneui/themed';
import React from 'react';

export type PhotoEditorProVariants = 'Introduction' | 'What does it do?';

export const PhotoEditorProKeys: PhotoEditorProVariants[] = [
  'Introduction',
  'What does it do?',
];

export const PhotoEditorProContent: Record<
  PhotoEditorProVariants,
  React.ReactNode
> = {
  Introduction: (
    <Text>
      While you're now able to take incredible pictures with great details on
      most of your Android smartphones, it's still necessary for a few final
      touches to create amazing images that you can truly satisfy with. That
      being said, many people are still opt for going with the certain photo
      editor apps on their mobile devices. And speaking of which, for those of
      you who're looking for the actually “good” apps that can help you
      customizing the interesting visuals in your images, VSCO and PicsArt are
      certainly the two apps that you just can't overlook. Together with the
      release of this new app from InShot Inc, Android users will find
      themselves having access to another brilliant tool for editing your
      images.
    </Text>
  ),
  'What does it do?': (
    <Text>
      To allow Android users to fully utilize their smartphone cameras, Photo
      Editor Pro: Polish is a powerful editing tool that lets you retouch, add
      cool effects, and enhance your photos for a beautiful finish. comes with a
      variety of different customizations that you can have on your photos.
      Here, you can make complete changes to your photos with many available
      settings. Feel free to apply the different configurations from the
      simplest to the most advanced in-app features that Photo Editor Pro has to
      offer. With the app, you can easily edit your newly taken photos,
      artworks, and even downloaded images from the Internet with simple and
      accessible features. Find yourself completely in-control of your in-app
      settings and enjoy the simple UI in Photo Editor Pro as you easily create
      amazing arts from the available customizations in the app.
    </Text>
  ),
};
