// 1
const express = require("express")
const clientController = require("./controller/clientController")
const { registerController } = require("./controller/clientController")
const { loginController } = require("./controller/clientController")
const { adminRegisterController } = require("./controller/adminController")
const adminController = require("./controller/adminController")
const userController = require("./controller/userController")
const jwtMiddleware = require("./middleware/jwtMiddleware")
const multerConfig = require("./middleware/multerMiddleware")
const { addFoodController, getAllFoodController, getFoodlistItemController, deleteFoodController, getHotelMenuController } = require("./controller/foodController")
const { addOrdersController, getMyOrdersController, getClientOrdersController, updateStatusController, getAllOrdersController, getResOrdersController, getPastOrdersController, getUserOrdersAdminController, getWeeklyOrders } = require("./controller/orderController")
const { partnerRegisterController, getAllPartnersController, updatePartnerDetailsController, updatePartnerActionController } = require("./controller/partnerRegisterController")
const { updateBannerController, getBannerController } = require("./controller/bannerController")
const { postReviewController, getAllReviewsController, getUserReview } = require("./controller/reviewController")



// 2 new instance
const routes = new express.Router()


// --------------------client side -------------------------------
// path to register a user

routes.post("/register-admin",multerConfig.fields([{ name: "store", maxCount: 1 },{ name: "profile", maxCount: 1 }]),clientController.registerController)

// login
routes.post("/login-admin",clientController.loginController)

// add-items
routes.post("/add-items",jwtMiddleware,multerConfig.single("picture"),addFoodController)

// llist controll
routes.get("/list-item",jwtMiddleware,getFoodlistItemController)

// delete food
routes.delete("/delete-food/:id",deleteFoodController)

// get client details
routes.get("/get-client-details",jwtMiddleware,clientController.getClientDetailsController)

// update clieny active status
routes.put("/update-active",jwtMiddleware,clientController.updateActiveStatusController)

// update client logo
routes.put("/update-profile-client",jwtMiddleware, multerConfig.single("profile"),clientController.updateclientprofile)

// update store pic
routes.put("/update-storepic-client",jwtMiddleware,multerConfig.single("storepic") ,clientController.updateStorePicController)

// update client details
routes.put("/update-client-details",jwtMiddleware,clientController.updateClientDetailsController)

// --------------------admin side---------------------------------
// admin register
routes.post("/admin-register",adminController.adminRegisterController)
// adimn login
routes.post("/admin-login",adminController.adminLoginController)

// approveClient
routes.put("/approve-client/:id",adminController.approveClientController)

// get all orders
routes.get("/all-orders",getAllOrdersController)

// get res orders
routes.get("/all-res-orders/:itemData",getResOrdersController)

// update partner
routes.put("/update-partner/:id",updatePartnerDetailsController)

// approve partner
routes.put("/approve-partner/:id",updatePartnerActionController)

// update banner
routes.put("/update-banner",multerConfig.single("banner"),updateBannerController)

// get all reviews
routes.get("/all-reviews",getAllReviewsController)

routes.get("/user-details/:itemData",userController.getUserDetailsController)

// get user orders admin side
routes.get("/user-orders/:itemData",getUserOrdersAdminController)

// get user review 
routes.get("/user-review/:itemData",getUserReview)

routes.get("/weekly-orders", getWeeklyOrders);


//-------------------- user side ----------------------------------
// user register
routes.post("/register-user",userController.userRegisterController)

// user login
routes.post("/login-user",userController.userLogincontroller)

// add address
routes.put("/add-address",jwtMiddleware,multerConfig.single("profile"),userController.addUserAddressController)

// getAllAdress
routes.get("/user-address",jwtMiddleware,userController.getUserAdderssController)

// get all users
routes.get("/all-users",userController.getAllUsersController)

// get all clients
routes.get("/all-clients",clientController.getAllClientsController)

// get all menu
routes.get("/all-menu",getAllFoodController)

// get menu
routes.get("/menu/:itemData",getHotelMenuController)


// order
routes.post("/add",jwtMiddleware,addOrdersController)

// myorders
routes.get("/my-orders",jwtMiddleware,getMyOrdersController)

routes.get("/get-banner",getBannerController)

// past orders
routes.get("/past-orders",jwtMiddleware, getPastOrdersController)

// post review
routes.post("/post-review",jwtMiddleware,multerConfig.single("pic"),postReviewController)

// client side
// --------------------------------------------------------------------------------------------

// clientside orders
routes.get("/client-orders/:restuaratName",getClientOrdersController)

// status update
routes.put("/update-status/:id/:status",updateStatusController)

// 

// delivery partner register
routes.post("/register-partner",multerConfig.fields([{ name: "photo", maxCount: 1 },{ name: "document", maxCount: 1 }]),partnerRegisterController)

// get all partners
routes.get("/all-partners",getAllPartnersController)

module.exports = routes

