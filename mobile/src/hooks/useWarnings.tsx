import useStorage from './useStorage';

export default function useWarnings(): {
  checkIfAccepted: (packageName: string) => Promise<boolean>;
  addWarning: (packageName: string) => Promise<void>;
} {
  const [storage, setStorage] = useStorage<string[]>('warnings');

  const checkIfAccepted = async (packageName: string) => {
    const warnings = await storage();
    return (warnings ?? []).includes(packageName);
  };

  const addWarning = async (packageName: string) => {
    const warnings = await storage();
    await setStorage([...(warnings ?? []), packageName]);
  };

  return {checkIfAccepted, addWarning};
}
