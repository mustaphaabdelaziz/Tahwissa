const express = require("express"),
	passport = require("passport"),
	router = express.Router();
const User = require("../models/user");
const middleware = require("../middleware");

// ========== The home page route ============
router.get("/",(request,response) =>{
	response.render("landing");
});

// =========== AUTH ROUTES ================

// SHOW register routes 
router.get("/register",(request,response) => {
	response.render("register");
});
// SIGN UP the USER 
router.post("/register",(request,response) => {
	var username = request.body.username;
	var password = request.body.password;
	User.register(new User({username:username}),password, (err,user)=>{
		if (err) {
			console.log(err);
			return response.render("register");
		}
		passport.authenticate("local")(request,response,()=> {
			response.redirect("/campgrounds");
		});
	});
});

// SHOW LOGIN FORM
router.get("/login",(request,response)=>{
	response.render("login");
});
// app.post("/login",Middleware, callback);
router.post("/login",passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}),(request,response)=>{
	response.send("LOGIN Susccessfully");
});

// Lougout ROUTES 
router.get("/logout",(request,response)=>{
	request.logout();
	response.redirect("back");
});

module.exports = router;