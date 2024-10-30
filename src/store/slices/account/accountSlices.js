import { createSlice } from '@reduxjs/toolkit';
import { trimEmail } from '@utils';

const initialState = {
  emailAccount: null,
  passwordAccount: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setEmailAccount: (state, action) => {
      state.emailAccount = trimEmail(action.payload);
    },
    setPasswordAccount: (state, action) => {
      state.passwordAccount = action.payload;
    },
  },
});

export const { setEmailAccount, setPasswordAccount } = accountSlice.actions;

export const selectEmailAccount = (state) => state.account.emailAccount;
export const selectPasswordAccount = (state) => state.account.passwordAccount;

export default accountSlice.reducer;
