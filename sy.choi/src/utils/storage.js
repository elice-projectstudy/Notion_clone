const storage = window.localStorage;

// JS 개체 저장 및 검색을 단순화 하기 위한 것.
// 해당 키로 항목 검색, 오류가 발생하거나 키가 없을 경우 defaultValue
export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

// 값을 문자열화 후 지정된 키에 저장
export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  storage.removeItem(key);
};
