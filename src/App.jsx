import { Routes, Route } from "react-router-dom";
import apiHandler from "./api/apiHandler";
import React, { useEffect, useState } from "react";
import NavBar from "./components/Navbar/NavBar";
import HomePage from "./pages/Home/HomePage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProfileOrders from "./pages/ProfileOrders/ProfileOrders";
import ProfileUpdateArtist from "./pages/ProfileUpdateArtist/ProfileUpdateArtist";
import ProfileUpdateCreation from "./pages/ProfileUpdateCreation/ProfileUpdateCreation";
import PrivateRoute from "./components/ProtectedRoute/PrivateRoute";
import IsArtistRoute from "./components/ProtectedRoute/IsArtistRoute";
import LoggedOut from "./components/LoggedOut/LoggedOut";
import Cart from "./pages/Cart/Cart";
import ArtistsList from "./pages/ArtistsList/ArtistsList";
import OneArtist from "./pages/OneArtist/OneArtist";
import CreationsList from "./pages/CreationsList/CreationsList";
import OneCreation from "./pages/OneCreation/OneCreation";
import NotFound from "./pages/NotFound/NotFound";
import OrderValidation from "./pages/OrderValidation/OrderValidation";
import Footer from "./components/Footer/Footer";
import FormCreateArtist from "./components/Forms/FormCreateArtist";
import FormCreateObject from "./components/Forms/FormCreateObject";

function App() {
  const [creations, setCreations] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    apiHandler.getAllCreations().then((res) => {
      setCreations(res);
    });

    apiHandler.getAllArtists().then((data) => {
      setArtists(data);
    });
  }, []);

  // If there is no creations or no artists load the page display "Loading"
  if (!creations.length || !artists.length) {
    return <div className="middle-div-min">Loading...</div>;
  }

  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="middle-div-min">
        <Routes>
          {/* ROUTES FOR ALL*/}
          <Route path="/" element={<HomePage />} />
          {/* All artists */}
          <Route path="/artists" element={<ArtistsList />} />
          {/* All creations */}
          <Route path="/creations" element={<CreationsList />} />
          {/* One artist */}
          <Route path="/artist/:id" element={<OneArtist />} />
          {/* NotFound */}
          <Route path="*" element={<NotFound />} />

          {/* ROUTES FOR LOGGEDIN */}
          <Route element={<PrivateRoute />}>
            {/* Profile */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/orders" element={<ProfileOrders />} />
            <Route element={<IsArtistRoute />}>
              <Route
                path="/profile/artists/createartist"
                element={<FormCreateArtist />}
              />
              <Route
                path="/profile/artists/createobject"
                element={<FormCreateObject />}
              />
              <Route
                path="/profile/artists/updateobjectpage/:id"
                element={<ProfileUpdateCreation />}
              />
              <Route
                path="/profile/artists/updateartistpage"
                element={<ProfileUpdateArtist />}
              />
            </Route>

            {/* Orders */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/order/validation" element={<OrderValidation />} />
            {/* Creations */}
            <Route path="/creations" element={<CreationsList />} />
            <Route path="/creations/:id" element={<OneCreation />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* ROUTES FOR LOGGEDOUT */}
          <Route element={<LoggedOut />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
