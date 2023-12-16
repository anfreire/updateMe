import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';

import {useState} from 'react';
import {Input, Text} from '@rneui/themed';
import GhostButton from '../../../../common/ghostButton';
import ThemeModule from '../../../../modules/theme';
import useStorage from '../../../../hooks/useStorage';
import useRouteEffect from '../../../../hooks/useRouteEffect';
import {SafeAreaView} from 'react-native-safe-area-context';

const Field = ({
  label,
  value,
  setValue,
  error,
  disabled,
  numberOfLines = 1,
}: {
  label: string;
  value: string;
  setValue: (text: string) => void;
  error: string;
  disabled: boolean;
  numberOfLines: number;
}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: 10,
      }}>
      <Text
        style={{
          fontSize: 20,
        }}>
        {label}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <TextInput
          editable={!disabled}
          multiline={numberOfLines > 1}
          numberOfLines={numberOfLines}
          style={{
            textAlignVertical: numberOfLines > 1 ? 'top' : 'center',
            height: numberOfLines > 1 ? 120 : undefined,
            padding: 10,
            borderWidth: 1,
            borderColor:
              error.length === 0 ? ThemeModule.Colors.grey[2] : 'red',
            borderRadius: 5,
            width: '85%',
          }}
          value={value}
          onChangeText={text => setValue(text)}
        />
      </View>
      {error.length > 0 && (
        <View
          style={{
            width: '85%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'red',
            }}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};

export default function ToolsReport() {
  const [value, setValue] = useStorage<Date>('report');

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
    if (data.name.trim() === '') {
      setErrors(prev => ({
        ...prev,
        name: 'Name is required',
      }));
      error = true;
    }
    if (data.item.trim() === '') {
      setErrors(prev => ({
        ...prev,
        item: 'Problem location is required',
      }));
      error = true;
    }
    if (data.description.trim() === '') {
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
    firebase
      .app()
      .database(
        'https://updateme-8f42b-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref('/reports')
      .push()
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
        setValue(new Date());
        Alert.alert('Success', 'Your report has been submitted');
      });
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 50,
      }}
      style={{
        flex: 1,
      }}>
      <Field
        label="What is your name?"
        value={data.name}
        setValue={text => {
          setData({...data, name: text});
          setErrors({...errors, name: ''});
        }}
        disabled={disabled}
        numberOfLines={1}
        error={errors.name}
      />
      <Field
        label="Where is the problem?"
        value={data.item}
        setValue={text => {
          setData({...data, item: text});
          setErrors({...errors, item: ''});
        }}
        disabled={disabled}
        numberOfLines={1}
        error={errors.item}
      />
      <Field
        label="What is the problem?"
        value={data.description}
        setValue={text => {
          setData({...data, description: text});
          setErrors({...errors, description: ''});
        }}
        disabled={disabled}
        numberOfLines={4}
        error={errors.description}
      />
      <View style={{}}>
        <GhostButton
          disabled={disabled}
          text="Submit"
          color="primary"
          onPress={submit}
        />
      </View>
    </ScrollView>
  );
}
