export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('risemeeState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('risemeeState', serializedState);
  } catch (err) {
    return undefined;
  }
};

export const loadStateSession = () => {
  try {
    const serializedState = sessionStorage.getItem(`risemeeSession`);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveStateSession = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(`risemeeSession`, serializedState);
  } catch (err) {
    return undefined;
  }
};
