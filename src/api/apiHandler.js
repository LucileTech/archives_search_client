import axios from "axios";

const apiHandler = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

apiHandler.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

//! Error handling to use in the catch
function errorHandler(error) {
  if (error.data) {
    console.log(error.data && error.data.message);
    throw error;
  }
  throw error;
}

const service = {
  // Service is spread to have access to the basics get/post...
  ...apiHandler,

  //GET
  // we are getting all artists

  getAllArtists() {
    return service
      .get("/artists")
      .then((res) => {
      
        return res.data;
      })
      .catch(errorHandler);
  },

    // we are getting the cart

  getOrderCart() {
    return service
      .get("/orderCart")
      .then((res) => {
        
        return res.data;
      })
      .catch(errorHandler);
  },

    // we are getting all creations

  getAllCreations() {
    return service
      .get("/creations")
      .then((res) => {
        
        return res.data;
      })
      .catch(errorHandler);
  },

    // we are getting all orders

  getAllOrders() {
    return service
      .get("/orders")
      .then((res) => {
       
        return res.data;
      })
      .catch(errorHandler);
  },

    // we are getting one specific creation

  getOneCreation(id) {
    return service
      .get(`/creations/${id}`)
      .then((res) => {
        
        return res.data;
      })
      .catch(errorHandler);
  },

      // we are getting one specific artist

  getOneArtist(id) {
    return service
      .get(`/artists/${id}`)
      .then((res) => {
        
        return res.data;
      })
      .catch(errorHandler);
  },

      // we are getting the creations of a specific artists

  getArtistCreations(id) {
    return service
      .get(`/artists/${id}/creations`)
      .then((res) => {
        
        return res.data;
      })
      .catch(errorHandler);
  },

      // we are getting one specific artist

  getMyArtist() {
    return service
      .get("/myartist")
      .then((res) => {
        
        return res.data;
      })
      .catch(errorHandler);
  },

      // we are getting creations of artist connected

  getMyCreations() {
    return service
      .get("/mycreations")
      .then((res) => {
        
        return res.data;
      })
      .catch(errorHandler);
  },

  // POST

    // We add a specific creation to the cart

  postAddToCart(id) {
    return service
      .post(`/creations/${id}/addtocart`)
      .then((res) => {
       
        return res.data;
      })
      .catch(errorHandler);
  },

  // Create the profile of the artist

  createArtist(formDataArtist) {
    return service 
    .post("/artists/form", formDataArtist)
    .then((res) => {
        return res.data;
      })
    .catch(err => {
      throw err.response.data.message
    });
  },

  // Create a new creation for the artist connected

  createCreation(formDataCreation) {
    return service 
    .post("/creations/form", formDataCreation)
    .then((res) => {
        return res.data;
      })
    .catch(err => {
      throw err.response.data.message
    });
  },

  // PATCH

  // we increment the number of a creation in cart

  patchIncrementCreationToOrder(creationId) {
    return service
      .patch(`/orderCart/increment/${creationId}`)
      .then((res) => {
      
        return res.data;
      })
      .catch(errorHandler);
  },

    // we decrement the number of a creation in cart

  patchDecrementCreationToOrder(creationId) {
    return service
      .patch(`/orderCart/decrement/${creationId}`)
      .then((res) => {
        
        return res.data;
      })
      .catch(errorHandler);
  },

  // update a specific creation of the artist connected

  patchUpdateCreation(formDataUpdatedCreation, id) {
    return service 
    .patch(
      `/myCreation/${id}/update`,
      formDataUpdatedCreation
    )
    .then((res) => {
        return res.data;
      })
    .catch(err => {
      throw err.response.data.message
    })
  },

    // update the artist page

  patchUpdateArtist(formDataUpdatedArtist) {
    return service 
    .patch(
      "/myArtist/update",
      formDataUpdatedArtist
    )
    .then((res) => {
        return res.data;
      })
    .catch(err => {
      throw err.response.data.message
    })
  },

// PUT

  // add a date to the order so the cart become an order

  buyCart() {
    return service
      .put(`/orderCart/buy`)
      .then((res) => {
      
        return res.data;
      })
      .catch(errorHandler);
  },

  // DELETE
  // Delete all cart

  deleteCart() {
    return service
      .delete(`/orderCart/delete`)
      .then((res) => {
      
        return res.data;
      })
      .catch(errorHandler);
  },

  // Delete one creation in cart

  deleteCreationCart(productId) {
    return service
      .patch(`/orderCart/${productId}`)
      .then((res) => {
      
        return res.data;
      })
      .catch(errorHandler);
  },

  // Delete artist profile
  deleteArtist() {
    return service
      .delete(`/myArtist/delete`)
       .then((res) => {
      
        return res.data;
      })
      .catch(errorHandler);
  },
      
 
// Delete one creation in the artist profile
  deleteCreationArtistProfile(id) {
    return service
      .delete(`/creationinprofile/${id}/delete`)
      .then((res) => {
       
        return res.data;
      })
      .catch(errorHandler);
  },

  //
  //
  // AUTHENTICATION

  //signup
  signup(userInfo) {
    return service
      .post("/auth/signup", 
        userInfo
      )
      .then((res) => res.data)
      .catch(errorHandler);
  },
 //loggedin
  isLoggedIn() {
    return service
      .get("/auth/me")
      .then((res) => res.data)
      .catch(errorHandler);
  },

//signin
  signin(userInfo) {
    return service
      .post("/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};

// export default apiHandler

export default service;
