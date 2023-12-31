import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import Footer from "./components/Footer";
import ReviewForm from "./components/ReviewForm";
import ProfilePage from "./components/ProfilePage";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import ReactGA from 'react-ga';
const TRACKING_ID = "G-3Q98YQM47R"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path="/" >
            <LandingPage />
            <Footer />
          </Route>

          <Route exact path="/login" >
            <LoginFormPage />
          </Route>

          <Route exact path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path="/account/:userId/:type">
            <ProfilePage />
            <Footer />
          </Route>

          <Route exact path="/collections/:categories">
            <Products />
            <Footer />
          </Route>

          <Route exact path="/collections/products/:productId">
            <SingleProduct />
            <Footer />
          </Route>

          <Route exact path="/products/:productId/reviews/new" >
            <ReviewForm />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
