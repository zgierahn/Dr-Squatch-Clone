import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import Footer from "./components/Footer";
import ReviewForm from "./components/ReviewForm";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";


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

          <Route exact path="/collections/:categories">
            <Products />
          </Route>

          <Route exact path="/collections/products/:productId">
            <SingleProduct />
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
