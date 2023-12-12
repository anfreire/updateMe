import {Icon, Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {OrderedFeaturesType} from '../../../components/features';

export type HDOVariants = 'What Is HDO BOX?' | 'Why HDO BOX?';

export const HDOKeys: HDOVariants[] = ['What Is HDO BOX?', 'Why HDO BOX?'];

export const HDOContent: Record<HDOVariants, React.ReactNode> = {
  'What Is HDO BOX?': (
    <>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
        }}>
        With HDO BOX on Android phone, you can able to watch the hd film content
        and shows. The User Interface that you see in the app is truly the best
        thing about it. Easy navigation and responsive design made it stand at
        the top of the list.
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
        }}>
        It will display all the trending content from Action, Comedy, Sci-Fi and
        other genres at the home page for the best user experience. Moreover,
        you will get to read the complete information about any particular movie
        including IMDB Rating, Year Of Release, Start Cast, etc.
      </Text>
      <View
        style={{
          marginVertical: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Icon size={30} name="movie" />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            10000
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
            }}>
            Movies and Shows
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Icon size={30} name="person" />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            20000
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
            }}>
            Users
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Icon size={30} name="download" />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            50000
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
            }}>
            Total Downloads
          </Text>
        </View>
      </View>
    </>
  ),
  'Why HDO BOX?': (
    <>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
        }}>
        Actually, there are a ton of options available when it comes to movie
        apps for android devices. But there is no single app available with the
        best attributes such as HD Movies, HD TV Shows. Subtitles Support, Fast
        Loading, Responsive Design, Great Technical Support, Wide Range of
        content from different genres.
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
        }}>
        So, if you are looking for the movie app that works best on your phone,
        HDO BOX is the right choice for you because it has got a plenty great
        features that you can check below.
      </Text>
    </>
  ),
};

export const HDOFeatures: OrderedFeaturesType[] = [
  {
    title: '1 Click To Play',
    description:
      'The app is so simple to use. Just one click and you ready to play.',
  },
  {
    title: 'Completely Free App',
    description:
      'HDO BOX is completely free. You can watch any movies, TV shows, and anime for free.',
  },
  {
    title: 'Coolest User Interface',
    description:
      "It has a very cool user interface and users will fall in love with the app's design and navigation. User may not do a lot to find out their favorite flick because they will see everything right on the home screen of the app.",
  },
  {
    title: 'Subtitles',
    description:
      'You may choose the default language of the subtitles to English or any other language. It supports over 25 Languages such as Spanish, Romanian, Portuguese, Polish, Latin, French, Thai, Turkish, Arabic and German, etc.',
  },
  {
    title: 'Regular Updates',
    description:
      "HDO BOX is very keen to provide regular updates to the app to keep it bug free. So, users will get timely updates to the content and to the app's version as well.",
  },
  {
    title: 'HD Content Options',
    description:
      "It has a big catalogue of HD Movies and TV Shows for all it's users.",
  },
];
