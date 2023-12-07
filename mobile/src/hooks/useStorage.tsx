import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useStorage<T>(
  key: string,
): [
  value: () => Promise<T | null>,
  setValue: (newValue: T | null) => Promise<void>,
] {
  const value = async () => {
    const _ = await AsyncStorage.getItem(key);
    return _ === 'null' || _ === null ? null : JSON.parse(_);
  };
  const setValue = async (newValue: T | null) => {
    return await AsyncStorage.setItem(key, JSON.stringify(newValue));
  };
  return [value, setValue];
}
