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
  // we are getting all contributors

  getAllcontributors() {
    return service
      .get("/contributors")
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

    // we are getting all archives

  getAllarchives() {
    return service
      .get("/archives")
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

    // we are getting one specific archive

  getOnearchive(id) {
    return service
      .get(`/archives/${id}`)
      .then((res) => {
        
        return res.data;
      })
      .catch(errorHandler);
  },

      // we are getting one specific contributor

  getOnecontributor(id) {
    return service
      .get(`/contributors/${id}`)
      .then((res) => {
        
        return res.data;
      })
      .catch(errorHandler);
  },

      // we are getting the archives of a specific contributors

  getcontributorarchives(id) {
    return service
      .get(`/contributors/${id}/archives`)
      .then((res) => {
        
        return res.data;
      })
      .catch(errorHandler);
  },

      // we are getting one specific contributor

  getMycontributor() {
    return service
      .get("/mycontributor")
      .then((res) => {
        
        return res.data;
      })
      .catch(errorHandler);
  },

      // we are getting archives of contributor connected

  getMyarchives() {
    return service
      .get("/myarchives")
      .then((res) => {
        
        return res.data;
      })
      .catch(errorHandler);
  },

  // POST

    // We add a specific archive to the cart

  postAddToCart(id) {
    return service
      .post(`/archives/${id}/addtocart`)
      .then((res) => {
       
        return res.data;
      })
      .catch(errorHandler);
  },

  // Create the profile of the contributor

  createcontributor(formDatacontributor) {
    return service 
    .post("/contributors/form", formDatacontributor)
    .then((res) => {
        return res.data;
      })
    .catch(err => {
      throw err.response.data.message
    });
  },

  // Create a new archive for the contributor connected

  createarchive(formDataarchive) {
    return service 
    .post("/archives/form", formDataarchive)
    .then((res) => {
        return res.data;
      })
    .catch(err => {
      throw err.response.data.message
    });
  },

  // PATCH

  // we increment the number of a archive in cart

  patchIncrementarchiveToOrder(archiveId) {
    return service
      .patch(`/orderCart/increment/${archiveId}`)
      .then((res) => {
      
        return res.data;
      })
      .catch(errorHandler);
  },

    // we decrement the number of a archive in cart

  patchDecrementarchiveToOrder(archiveId) {
    return service
      .patch(`/orderCart/decrement/${archiveId}`)
      .then((res) => {
        
        return res.data;
      })
      .catch(errorHandler);
  },

  // update a specific archive of the contributor connected

  patchUpdatearchive(formDataUpdatedarchive, id) {
    return service 
    .patch(
      `/myarchive/${id}/update`,
      formDataUpdatedarchive
    )
    .then((res) => {
        return res.data;
      })
    .catch(err => {
      throw err.response.data.message
    })
  },

    // update the contributor page

  patchUpdatecontributor(formDataUpdatedcontributor) {
    return service 
    .patch(
      "/mycontributor/update",
      formDataUpdatedcontributor
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

  // Delete one archive in cart

  deletearchiveCart(productId) {
    return service
      .patch(`/orderCart/${productId}`)
      .then((res) => {
      
        return res.data;
      })
      .catch(errorHandler);
  },

  // Delete contributor profile
  deletecontributor() {
    return service
      .delete(`/mycontributor/delete`)
       .then((res) => {
      
        return res.data;
      })
      .catch(errorHandler);
  },
      
 
// Delete one archive in the contributor profile
  deletearchivecontributorProfile(id) {
    return service
      .delete(`/archiveinprofile/${id}/delete`)
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
