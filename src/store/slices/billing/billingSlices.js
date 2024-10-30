import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clientSecret: null,
  subscriptionId: null,
  customerId: null,
  paymentStatus: null,
  minutesDiscount: 10,
  secondsDiscount: 0,
  prices: null,
};

export const billingSlices = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    setClientSecret: (state, action) => {
      state.clientSecret = action.payload;
    },
    setSubscriptionId: (state, action) => {
      state.subscriptionId = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    setMinutesDiscount: (state, action) => {
      state.minutesDiscount = action.payload;
    },
    setSecondsDiscount: (state, action) => {
      state.secondsDiscount = action.payload;
    },
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
  },
});

export const {
  setClientSecret,
  setSubscriptionId,
  setPaymentStatus,
  setMinutesDiscount,
  setSecondsDiscount,
  setCustomerId,
  setPrices,
} = billingSlices.actions;

export const selectClientSecret = (state) => state.billing.clientSecret;
export const selectCustomerId = (state) => state.billing.customerId;
export const selectSubscriptionId = (state) => state.billing.subscriptionId;
export const selectPaymentStatus = (state) => state.billing.paymentStatus;
export const selectMinutesDiscount = (state) => state.billing.minutesDiscount;
export const selectSecondsDiscount = (state) => state.billing.secondsDiscount;
export const selectPrices = (state) => state.billing.prices;

export default billingSlices.reducer;
