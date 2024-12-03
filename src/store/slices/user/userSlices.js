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
    setEmail: (state, action) => {
      state.email = trimEmail(action.payload);
    },
    setDevice: (state, action) => {
      state.device = action.payload;
    },
  },
});

export const { setCurrency, setEmail, setDevice, setCookieInfo } = userSlice.actions;

export const selectCurrency = (state) => state.user.currency;
export const selectEmail = (state) => state.user.email;
export const selectDevice = (state) => state.user.device;
export const selectCookieInfo = (state) => state.user.cookieInfo;

export default userSlice.reducer;
