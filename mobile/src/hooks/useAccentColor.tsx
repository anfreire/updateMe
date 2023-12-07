import {useTheme} from '@rneui/themed';
import useStorage from './useStorage';

export default function useAccentColor(
  theme: ReturnType<typeof useTheme>,
): [
  accentColor: () => Promise<{light: string; dark: string} | null>,
  setAccentColor: (accentColor: {light: string; dark: string}) => Promise<void>,
] {
  const [storage, setStorage] = useStorage<{light: string; dark: string}>(
    'accentColor',
  );
  const accentColor = async () => storage();

  const setAccentColor = async (accentColor: {light: string; dark: string}) => {
    theme.updateTheme({
      lightColors: {
        primary: accentColor.light,
      },
      darkColors: {
        primary: accentColor.dark,
      },
    });
    await setStorage(accentColor);
  };

  return [accentColor, setAccentColor];
}
