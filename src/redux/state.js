import { createSlice} from "@reduxjs/toolkit"

const initialState = {
  user: null,
  token: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setListings: (state, action) => {
      state.listings = action.payload.listings
    },
    setListingSell: (state, action) => {
      state.listingSell = action.payload.listingSell
    },
    setWishList: (state, action) => {
      state.user.wishList = action.payload
    },

  }
})

export const { setLogin, setLogout, setListings, setListingSell, setWishList } = userSlice.actions
export default userSlice.reducer