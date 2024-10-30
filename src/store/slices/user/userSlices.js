import { createSlice } from '@reduxjs/toolkit';
import { trimEmail } from '@utils';

const initialState = {
  currency: {
    code: 'USD',
    symbol: '$',
  },
  country: null,
  email: null,
  device: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setEmail: (state, action) => {
      state.email = trimEmail(action.payload);
    },
    setDevice: (state, action) => {
      state.device = action.payload;
    },
  },
});

export const { setCurrency, setCountry, setEmail, setDevice } = userSlice.actions;

export const selectCurrency = (state) => state.user.currency;
export const selectCountry = (state) => state.user.country;
export const selectEmail = (state) => state.user.email;
export const selectDevice = (state) => state.user.device;

export default userSlice.reducer;
