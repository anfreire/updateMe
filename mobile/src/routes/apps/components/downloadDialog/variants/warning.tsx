import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {CheckBox, Icon, Overlay, Text} from '@rneui/themed';
import React from 'react';
import {colors} from '../../../../../utils/theme';
import {useDownload} from '../../../../../hooks/useDownload';
import GhostButton from '../../../../../common/ghostButton';

const checkboxesBuilder = (warnings: string[]) => {
  const checkboxes: Record<string, boolean> = {};
  warnings.forEach(warning => {
    checkboxes[warning] = false;
  });
  return checkboxes;
};

function WarningCheckbox({
  warning,
  checkboxes,
  setCheckboxes,
}: {
  warning: string;
  checkboxes: Record<string, boolean>;
  setCheckboxes: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 300,
        gap: 30,
      }}>
      <View
        style={{
          width: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <CheckBox
          checkedColor={colors.YELLOW.opaque}
          checked={checkboxes[warning]}
          onIconPress={() => {
            setCheckboxes(prev => {
              prev[warning] = !prev[warning];
              return {...prev};
            });
          }}
          containerStyle={{
            backgroundColor: 'transparent',
          }}
          style={{
            borderColor: colors.YELLOW.opaque,
          }}
        />
      </View>
      <View
        style={{
          width: 250,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Text
          style={{
            textAlign: 'left',
            fontWeight: '600',
            fontSize: 15,
          }}>
          {warning}
        </Text>
      </View>
    </View>
  );
}

export default function DownloadDialog_Warning({
  setWarningsAccepted,
}: {
  setWarningsAccepted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {data, setData} = useDownload();
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>(
    checkboxesBuilder(data?.warnings ?? []),
  );

  useEffect(() => {
    if (data && data.warnings.length === 0) {
      setWarningsAccepted(true);
    }
  }, [data]);

  const accept = () => {
    if (Object.values(checkboxes).every(checkbox => checkbox)) {
      setWarningsAccepted(true);
    }
  };

  return (
    <Overlay
      isVisible={data !== null}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon
        name="warning"
        size={50}
        type="material"
        color={colors.YELLOW.opaque}
        style={{
          marginTop: 10,
        }}
      />
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 15,
          padding: 15,
        }}>
        {data?.warnings.map((warning, index) => (
          <WarningCheckbox
            key={index}
            warning={warning}
            checkboxes={checkboxes}
            setCheckboxes={setCheckboxes}
          />
        ))}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          gap: 15,
          marginTop: 10,
        }}>
        <GhostButton onPress={() => setData(null)} text="Cancel" color="RED" />
        <GhostButton text="Accept" color="YELLOW" onPress={accept} />
      </View>
    </Overlay>
  );
}
