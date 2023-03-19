export function initStorage<T>(key: string, fallback: T): T {
  const string = window.localStorage.getItem(key);
  if (string) {
    try {
      return JSON.parse(string);
    } catch (error) {
      return fallback;
    }
  } else {
    return fallback;
  }
}

export function saveToStorage(key: string, value: any): void;
export function saveToStorage(
  key: string,
  value: any,
  callback: Function,
  params: any[]
): void;
export function saveToStorage(
  key: string,
  value: any,
  callback?: Function,
  params?: any[]
) {
  try {
    const string = JSON.stringify(value);
    window.localStorage.setItem(key, string);
  } catch (error) {
    console.log(error);
    if (callback) {
      if (Array.isArray(params)) {
        callback(...params);
      } else if (params) {
        callback(params);
      } else {
        throw new Error('Invalid Param');
      }
    }
  }
}
