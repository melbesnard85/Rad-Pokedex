interface LocalStorage {
  set: <T>(key: string, value: T) => void;
  get: <T>(key: string, defaultValue: T) => T;
  clear: () => void;
  remove: (key: string) => void;
}

const LocalStorage: LocalStorage = {
  set: <T>(key: string, value: T) => {
    if (typeof window === 'undefined') return;
    if (value === undefined) return;
    const stringifyValue = JSON.stringify(value);
    window.localStorage.setItem(key, stringifyValue);
  },

  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    const stringifyValue = window.localStorage.getItem(key);
    if (stringifyValue === null || stringifyValue === '') return defaultValue;
    const valueFromLocalStorage: T = JSON.parse(stringifyValue);
    return valueFromLocalStorage !== null ? valueFromLocalStorage : defaultValue;
  },

  clear: () => {
    if (typeof window === 'undefined') return;
    window.localStorage.clear();
  },

  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
  },
};

export const PATY_STORAGE = 'party';

export default LocalStorage;