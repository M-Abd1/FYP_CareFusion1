const express = require("express");
const router = express.Router();
const {signupAction,insurance,complaiaction,loginAction,security,chatView,complain,forgotAction,login,signUp, forgetPassword,  signOut,OTP,resetPassword} = require("../controller/root")



router.route("/").get((req,res)=>{
    if(req.session.signUpAs === undefined) {
        req.session.signUpAs = "Visitor";
    } res.render("home", {user: req.session.signUpAs,profileImage:""})});
router.route("/login").get(login);
router.route("/signup").get(signUp);
router.route("/T&C-PP").get((req,res)=>{res.render("T&C-PP")})
router.route("/signupAction").post(signupAction);
router.route("/loginAction").post(loginAction);
router.route("/forgotAction").post(forgotAction);
router.route("/forgotPassword").get(forgetPassword);
router.route("/signout").get(signOut);
router.route("/chat").get(chatView);
router.route("/OTP").post(OTP);
router.route("/resetpassword").post(resetPassword);
router.route("/otpform").get(async(req,res)=>{
    console.log("Rendering otp form");
    const message = req.query.message;
    const email = req.query.email;
    console.log("Message"+message);
    res.render("otp",{message,email})
});
router.route("/resetform").get(async(req,res)=>{
    console.log("Reseting password");
    const message = req.query.message;
    const email = req.query.email;
    console.log("Message"+message);
    res.render("pass",{message,email})
});

router.route("/resetpassword").get(resetPassword);
router.route("/complain").get(complain);
router.route("/security").get(security);
router.route("/insurance").get(insurance);
router.route("/complaiaction").post(complaiaction);


module.exports = router;