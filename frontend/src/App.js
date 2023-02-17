import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import MobileHeader from "./components/layout/Header/MobileHeader.js";
import Header from "./components/layout/Header/Header.js";
import Home from "./components/Home/Home.js";
import SingleProduct from "./components/layout/SingleProduct/SingleProduct.js";
import Shop from "./components/layout/Shop/Shop.js";
import Footer from "./components/layout/Footer/Footer.js";
import Registration from "./components/User/Registration/Registration.js";
import LogIn from "./components/User/LogIn/LogIn.js";
import Account from "./components/User/Account/Account.js";
import Protected from "./components/Route/Protected.js";

import "./App.css";
import store from "./store";

import { loadUser } from "./actions/userAction";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Rubik", "Roboto"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <MobileHeader />
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/:name/:id" element={<SingleProduct />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route path="/shop/:keyword" element={<Shop />} />
        <Route exact path="/register" element={<Registration />} />
        <Route exact path="/logIn" element={<LogIn />} />
        <Route exact path="/account" element={<Account />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
