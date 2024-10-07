import { configureStore } from '@reduxjs/toolkit'
import appReducer from "../redux/slices/appSlice"
import productReducer from "../redux/slices/productSlices"
import basketReducer from "../redux/slices/basketslice"


export const store = configureStore({
  reducer: {
    app: appReducer,
    product: productReducer,
    basket: basketReducer,
  },
})