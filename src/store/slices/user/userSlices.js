import { createSlice } from '@reduxjs/toolkit';
import { trimEmail } from '@utils';

const initialState = {
  currency: {
    code: 'EUR',
    symbol: '€',
  },
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

    setEmail: (state, action) => {
      state.email = trimEmail(action.payload);
    },
    setDevice: (state, action) => {
      state.device = action.payload;
    },
  },
});

export const { setCurrency, setEmail, setDevice } = userSlice.actions;

export const selectCurrency = (state) => state.user.currency;
export const selectEmail = (state) => state.user.email;
export const selectDevice = (state) => state.user.device;

export default userSlice.reducer;
