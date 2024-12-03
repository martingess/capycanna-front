import { createSlice } from '@reduxjs/toolkit';
import { trimEmail } from '@utils';

const initialState = {
  currency: {
    code: 'EUR',
    symbol: '€',
  },
  email: null,
  device: null,
  cookieInfo: true,
  overYears: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setCookieInfo: (state, action) => {
      state.cookieInfo = action.payload;
    },
    setOverYears: (state, action) => {
      state.overYears = action.payload;
    },
    setEmail: (state, action) => {
      state.email = trimEmail(action.payload);
    },
    setDevice: (state, action) => {
      state.device = action.payload;
    },
  },
});

export const { setCurrency, setEmail, setDevice, setCookieInfo, setOverYears } = userSlice.actions;

export const selectCurrency = (state) => state.user.currency;
export const selectEmail = (state) => state.user.email;
export const selectDevice = (state) => state.user.device;
export const selectCookieInfo = (state) => state.user.cookieInfo;
export const selectOverYears = (state) => state.user.overYears;

export default userSlice.reducer;
