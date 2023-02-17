import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productReducer,
  productDetailsReducer,
} from "./reducers/productReducer";

import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
});

let intitialState = {};

const middleWare = [thunk];

const store = createStore(
  reducer,
  intitialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
