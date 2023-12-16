import {useEffect, useState} from 'react';
import {
  SourceKeys,
  SourceKeysType,
  useSource,
} from '../../../../hooks/useSource';
import {RefreshControl, ScrollView, TouchableOpacity} from 'react-native';
import {
  Image,
  Text,
  Icon,
  ListItem,
  LinearProgress,
  Divider,
  Button,
} from '@rneui/themed';
import FilesModule from '../../../../modules/files';
import {View} from 'react-native';
import ThemeModule from '../../../../modules/theme';
import GhostButton from '../../../../common/ghostButton';
import useRouteEffect from '../../../../hooks/useRouteEffect';

const getHeaderRightFiles = (onPress: () => void) => (
  <TouchableOpacity
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      borderRadius: 5,
      padding: 7,
      borderWidth: 1,
      borderColor: ThemeModule.Colors.grey[3],
    }}
    onPress={onPress}>
    <Text
      style={{
        fontSize: 15,
        fontWeight: '100',
      }}>
      Update all
    </Text>
    <Icon size={20} name="update" type="material-community" />
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

type updateType = {
  key: SourceKeysType;
  updating: boolean;
};

export default function ToolsUpdates({navigation}: any) {
  const [toUpdate, setToUpdate] = useState<updateType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [source, updateSource, _] = useSource();

  useRouteEffect({
    onRoute: () => update(),
  });

  const updateSetToUpdate = (key: SourceKeysType, updating: boolean) => {
    setToUpdate(prev => {
      const old = prev.filter(item => item.key !== key);
      const newOne = {key, updating};
      return [...old, newOne];
    });
  };

  const update = () => {
    setRefreshing(true);
    updateSource();
    setToUpdate([]);
    SourceKeys.forEach(key => {
      if (source[key].state === 'NOT_UPDATED') {
        updateSetToUpdate(key, false);
      }
    });
    setRefreshing(false);
  };

  const updateSingleApp = async (key: SourceKeysType) => {
    updateSetToUpdate(key, true);
    const path = await FilesModule.downloadApk(
      source[key].link!,
      source[key].fileName,
      () => {},
    );
    await FilesModule.installApk(path);
    updateSetToUpdate(key, false);
  };

  const updateAllApps = async () => {
    for (let i = 0; i < toUpdate.length; i++) {
      await updateSingleApp(toUpdate[i].key);
    }
  };

  useEffect(() => {
    if (toUpdate.length > 0) {
      navigation.setOptions({
        headerRight: (_: any) => getHeaderRightFiles(updateAllApps),
      });
    } else {
      navigation.setOptions({
        headerRight: (_: any) => getHeaderRightEmpty(update),
      });
    }
  }, [toUpdate]);
  return toUpdate.length == 0 ? (
    <View
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        gap: 15,
      }}>
      <Text h4>Everything is up to date</Text>
      <Icon size={25} name="check" type="material-community" />
    </View>
  ) : (
    <ScrollView
      style={{
        flex: 1,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={update} />
      }>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}>
        {toUpdate.map((key, index) => (
          <View key={index}>
            <ListItem>
              <ListItem.Content
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginLeft: 15,
                  gap: 15,
                }}>
                <Image
                  source={source[key.key].icon}
                  resizeMode="contain"
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
                <ListItem.Title
                  style={{
                    fontSize: 18,
                  }}>
                  {source[key.key].title}
                </ListItem.Title>
              </ListItem.Content>
              {key.updating ? (
                <Button type="clear" loading />
              ) : (
                <GhostButton
                  color="primary"
                  text="Update"
                  onPress={() => {
                    updateSingleApp(key.key);
                  }}
                />
              )}
            </ListItem>
            {index !== toUpdate.length - 1 && (
              <Divider
                style={{
                  opacity: 0.5,
                }}
              />
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
