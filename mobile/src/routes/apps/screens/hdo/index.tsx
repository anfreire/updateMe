import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {Linking, ScrollView, TouchableOpacity, View} from 'react-native';
import {FAB, Icon, ListItem, Text, useTheme} from '@rneui/themed';
import {greys} from '../../../../utils/theme';
import InstallButton from '../../components/installButton';

type ExpandedVariants = null | 'What Is HDO BOX?' | 'Why HDO BOX?';

export default function AppsHDO() {
  const hdoSource = useSource()[0].HDO;
  const [expanded, setExpanded] = React.useState<ExpandedVariants>(null);
  return (
    <>
      <ScrollView>
        <ScreenBase source={hdoSource}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              margin: 5,
              gap: 10,
            }}>
            <View>
              <InstallButton source={hdoSource} />
            </View>
            <ListItem.Accordion
              isExpanded={expanded === 'What Is HDO BOX?'}
              onPress={() =>
                setExpanded(prev =>
                  prev === 'What Is HDO BOX?' ? null : 'What Is HDO BOX?',
                )
              }
              icon={<Icon name={'chevron-down'} type="material-community" />}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: greys[2],
              }}
              content={<Text h3>What Is HDO BOX?</Text>}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: greys[1],
                  gap: 15,
                  padding: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                  }}>
                  With HDO BOX on Android phone, you can able to watch the hd
                  film content and shows. The User Interface that you see in the
                  app is truly the best thing about it. Easy navigation and
                  responsive design made it stand at the top of the list.
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                  }}>
                  It will display all the trending content from Action, Comedy,
                  Sci-Fi and other genres at the home page for the best user
                  experience. Moreover, you will get to read the complete
                  information about any particular movie including IMDB Rating,
                  Year Of Release, Start Cast, etc.
                </Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="movie" />
                    <Text
                      style={{
                        fontWeight: 'bold',
                      }}>
                      10000
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                      }}>
                      Movies and Shows
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="person" />
                    <Text
                      style={{
                        fontWeight: 'bold',
                      }}>
                      20000
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                      }}>
                      Users
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="download" />
                    <Text
                      style={{
                        fontWeight: 'bold',
                      }}>
                      50000
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                      }}>
                      Total Downloads
                    </Text>
                  </View>
                </View>
              </View>
            </ListItem.Accordion>
            <ListItem.Accordion
              isExpanded={expanded === 'Why HDO BOX?'}
              onPress={() =>
                setExpanded(prev =>
                  prev === 'Why HDO BOX?' ? null : 'Why HDO BOX?',
                )
              }
              icon={<Icon name={'chevron-down'} type="material-community" />}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: greys[2],
                marginTop: expanded === 'What Is HDO BOX?' ? 15 : 0,
              }}
              content={<Text h3>Why HDO BOX?</Text>}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: greys[1],
                  gap: 15,
                  padding: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                  }}>
                  Actually, there are a ton of options available when it comes
                  to movie apps for android devices. But there is no single app
                  available with the best attributes such as HD Movies, HD TV
                  Shows. Subtitles Support, Fast Loading, Responsive Design,
                  Great Technical Support, Wide Range of content from different
                  genres.
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                  }}>
                  So, if you are looking for the movie app that works best on
                  your phone, HDO BOX is the right choice for you because it has
                  got a plenty great features that you can check below.
                </Text>
              </View>
            </ListItem.Accordion>
          </View>
        </ScreenBase>
      </ScrollView>
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => Linking.openURL('https://hdo.app/')}
        color={useTheme().theme.colors.primary}
        icon={<Icon name="link" />}></FAB>
    </>
  );
}
