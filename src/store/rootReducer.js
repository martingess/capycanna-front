import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/user/userSlices';
import billingSlices from './slices/billing/billingSlices';
import accountSlices from './slices/account/accountSlices';

const rootReducer = combineReducers({
  user: userSlice,
  billing: billingSlices,
  account: accountSlices,
});

export default rootReducer;
