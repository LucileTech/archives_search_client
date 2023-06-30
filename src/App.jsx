import { Routes, Route } from "react-router-dom";
import apiHandler from "./api/apiHandler";
import React, { useEffect, useState } from "react";
import NavBar from "./components/Navbar/NavBar";
import HomePage from "./pages/Home/HomePage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProfileOrders from "./pages/ProfileOrders/ProfileOrders";
import ProfileUpdatecontributor from "./pages/ProfileUpdatecontributor/ProfileUpdatecontributor";
import ProfileUpdatearchive from "./pages/ProfileUpdatearchive/ProfileUpdatearchive";
import PrivateRoute from "./components/ProtectedRoute/PrivateRoute";
import IscontributorRoute from "./components/ProtectedRoute/IscontributorRoute";
import LoggedOut from "./components/LoggedOut/LoggedOut";
import Cart from "./pages/Cart/Cart";
import contributorsList from "./pages/contributorsList/contributorsList";
import Onecontributor from "./pages/Onecontributor/Onecontributor";
import archivesList from "./pages/archivesList/archivesList";
import Onearchive from "./pages/Onearchive/Onearchive";
import NotFound from "./pages/NotFound/NotFound";
import OrderValidation from "./pages/OrderValidation/OrderValidation";
import Footer from "./components/Footer/Footer";
import FormCreatecontributor from "./components/Forms/FormCreatecontributor";
import FormCreateObject from "./components/Forms/FormCreateObject";

function App() {
  const [archives, setarchives] = useState([]);
  const [contributors, setcontributors] = useState([]);

  useEffect(() => {
    apiHandler.getAllarchives().then((res) => {
      setarchives(res);
    });

    apiHandler.getAllcontributors().then((data) => {
      setcontributors(data);
    });
  }, []);

  // If there is no archives or no contributors load the page display "Loading"
  if (!archives.length || !contributors.length) {
    return <div className="middle-div-min">Loading...</div>;
  }

  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="middle-div-min">
        <Routes>
          {/* ROUTES FOR ALL*/}
          <Route path="/" element={<HomePage />} />
          {/* All contributors */}
          <Route path="/contributors" element={<contributorsList />} />
          {/* All archives */}
          <Route path="/archives" element={<archivesList />} />
          {/* One contributor */}
          <Route path="/contributor/:id" element={<Onecontributor />} />
          {/* NotFound */}
          <Route path="*" element={<NotFound />} />

          {/* ROUTES FOR LOGGEDIN */}
          <Route element={<PrivateRoute />}>
            {/* Profile */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/orders" element={<ProfileOrders />} />
            <Route element={<IscontributorRoute />}>
              <Route
                path="/profile/contributors/createcontributor"
                element={<FormCreatecontributor />}
              />
              <Route
                path="/profile/contributors/createobject"
                element={<FormCreateObject />}
              />
              <Route
                path="/profile/contributors/updateobjectpage/:id"
                element={<ProfileUpdatearchive />}
              />
              <Route
                path="/profile/contributors/updatecontributorpage"
                element={<ProfileUpdatecontributor />}
              />
            </Route>

            {/* Orders */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/order/validation" element={<OrderValidation />} />
            {/* archives */}
            <Route path="/archives" element={<archivesList />} />
            <Route path="/archives/:id" element={<Onearchive />} />
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
