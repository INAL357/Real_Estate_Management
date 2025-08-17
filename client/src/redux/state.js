import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    TripList: [], 
    wishList: [], 
    propertyList: [],
    reservationList: [], 
    isAdmin: false, // Add this line
  },
  token: null,
  
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setlogin: (state, action) => {
      state.user = { ...action.payload.user, isAdmin: action.payload.user.isAdmin || false };
      state.token = action.payload.token;
    },
    setlogout: (state) => {
      state.user = {
        TripList: [],
        wishList: [],
        propertyList: [],
        reservationList: [],
        isAdmin: false, // Add this line
      };
      state.token = null;
    },
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
    setTripList: (state, action) => {
      state.user.TripList = action.payload; 
    },
    setwishList: (state, action) => {
      state.user.wishList = action.payload; 
    },
    setPropertyList: (state, action) => {
      state.user.propertyList = action.payload; 
    },
    setReservationList: (state, action) => {
      state.user.reservationList = action.payload; 
    },
  },
});

export const {
  setlogin,
  setlogout,
  setListings,
  setTripList,
  setwishList,
  setPropertyList,
  setReservationList,
} = userSlice.actions;


export default userSlice.reducer;



