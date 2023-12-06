import AsyncStorage from "@react-native-async-storage/async-storage";

namespace Storage {
  export async function getData(
    key: string,
    type: 'OBJECT' | 'STRING',
  ): Promise<null | string | object> {
    const storage = await AsyncStorage.getItem(key);
    return storage === 'null' || storage === null
      ? null
      : type === 'OBJECT'
      ? JSON.parse(storage)
      : storage;
  }

  export async function saveData(
    key: string,
    data: string | object,
  ): Promise<void> {
    return await AsyncStorage.setItem(
      key,
      typeof data === 'string' ? data : JSON.stringify(data),
    );
  }
}

export default Storage;
