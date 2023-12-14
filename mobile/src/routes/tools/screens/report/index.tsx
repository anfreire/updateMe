import {Alert, View} from 'react-native';
import {firebase} from '@react-native-firebase/database';

import {useState} from 'react';
import {Input, Text} from '@rneui/themed';
import GhostButton from '../../../../common/ghostButton';
import ThemeModule from '../../../../modules/theme';
import useStorage from '../../../../hooks/useStorage';
import useRouteEffect from '../../../../hooks/useRouteEffect';

export default function ToolsReport() {
  const [value, setValue] = useStorage<Date>('report');
  const newReference = firebase
    .app()
    .database(
      'https://updateme-8f42b-default-rtdb.europe-west1.firebasedatabase.app/',
    )
    .ref('/reports')
    .push();
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState<{
    name: string;
    item: string;
    description: string;
  }>({
    name: '',
    item: '',
    description: '',
  });
  const [errors, setErrors] = useState<{
    name: string;
    item: string;
    description: string;
  }>({
    name: '',
    item: '',
    description: '',
  });

  useRouteEffect({
    onRoute: () => {
      value().then(val => {
        if (val) {
          const now = new Date();
          const before = new Date(val);
          const diff = now.getTime() - before.getTime();
          if (diff < 24 * 60 * 60 * 1000) {
            setDisabled(true);
            Alert.alert(
              'Report already submitted',
              'You have already submitted a report today',
            );
          }
        }
      });
    },
  });

  const submit = () => {
    var error = false;
    if (data.name === '') {
      setErrors(prev => ({
        ...prev,
        name: 'Name is required',
      }));
      error = true;
    }
    if (data.item === '') {
      setErrors(prev => ({
        ...prev,
        item: 'Problem location is required',
      }));
      error = true;
    }
    if (data.description === '') {
      setErrors(prev => ({
        ...prev,
        description: 'Problem description is required',
      }));
      error = true;
    }
    if (error) {
      return;
    }
    setDisabled(true);
    newReference
      .set({
        name: data.name,
        item: data.item,
        description: data.description,
      })
      .then(() => {
        setData({
          name: '',
          item: '',
          description: '',
        });
        // set the values for today
        setValue(new Date());
        Alert.alert('Success', 'Your report has been submitted');
      });
  };
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 20,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}>
        <Text h4>What is your name?</Text>
        <Input
          disabled={disabled}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: ThemeModule.Colors.grey[2],
            borderRadius: 5,
            width: '90%',
            height: 50,
          }}
          value={data.name}
          onChangeText={text => {
            setData({...data, name: text.trim()});
            setErrors({...errors, name: ''});
          }}
          errorMessage={errors.name}
          errorStyle={{color: 'red'}}></Input>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}>
        <Text h4>Where is the problem?</Text>
        <Input
          disabled={disabled}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: ThemeModule.Colors.grey[2],
            borderRadius: 5,
            width: '90%',
            height: 50,
          }}
          value={data.item}
          onChangeText={text => {
            setData({...data, item: text.trim()});
            setErrors({...errors, item: ''});
          }}
          errorMessage={errors.item}
          errorStyle={{color: 'red'}}></Input>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}>
        <Text h4>What is the problem?</Text>
        <Input
          disabled={disabled}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: ThemeModule.Colors.grey[2],
            borderRadius: 5,
            width: '90%',
            height: 150,
          }}
          inputStyle={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',

            textAlignVertical: 'top',
            textAlign: 'left',
          }}
          value={data.description}
          onChangeText={text => {
            setData({...data, description: text.trim()});
            setErrors({...errors, description: ''});
          }}
          errorMessage={errors.description}
          errorStyle={{color: 'red'}}></Input>
      </View>
      <View style={{}}>
        <GhostButton
          disabled={disabled}
          text="Submit"
          color="primary"
          onPress={submit}
        />
      </View>
    </View>
  );
}
