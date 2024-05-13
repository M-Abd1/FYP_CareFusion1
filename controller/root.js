const signup = require("../model/signup");
const provProfile = require("../model/provider");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const service = require("../routers/services");
const complain_ = require("../model/complain");

const signupAction = async (req, res) => {
  const { name, uname, emailId, pass, service } = req.body;

  const sname = await signup.find({ username: uname });
  const semail = await signup.find({ email: emailId });
  if (sname.length == 0 && semail.length == 0) {
    const saveSignup = new signup({
      fullname: name,
      username: uname,
      email: emailId,
      password: pass[0],
      signedUpAs: service,
    });
    try {
      await saveSignup.save();
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
    req.session.user = name;
    req.session.email = emailId;
    res.redirect("/services/services");
  } else {
    var message = "Username or Email already exists";
    const redirectUrl = "/signup?message=" + encodeURIComponent(message);
    res.redirect(redirectUrl);
  }
};

const loginAction = async (req, res) => {
  const { username, password } = req.body;

  const user = await signup.find(req.body).limit(1);
  // console.log(user)
  if (user.length != 0) {
    req.session.user = user[0].fullname;
    req.session.email = user[0].email;
    req.session.signUpAs = user[0].signedUpAs;

    const profile = await provProfile.findOne({ email: user[0].email });
    let profileImage = "";

    if (profile) {
      let profileImage = profile.profilePicture;
      req.session.image = profileImage;
    }
    // console.log(req.session.user, "  ", req.session.email);
    res.render("home", {
      user: req.session.signUpAs,
      profileImage: profileImage,
    });
  } else {
    var message = "Invalid uername or password";
    const redirectUrl = "/login?message=" + encodeURIComponent(message);
    res.redirect(redirectUrl);
  }
};

const signOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/"); // Redirect to the home page
    }
  });
};
const login = (req, res) => {
  const message = req.query.message || "";
  res.render("login", { message });
};
const signUp = (req, res) => {
  const message = req.query.message || "";
  res.render("signup", { message });
};
const forgotAction = async (req, res) => {
  try {
    console.log("Request received in forgotAction");
    var email = req.body.email;
    console.log(req.body);
    const userData = await signup.findOne({ email: email });
    console.log(userData);
    if (userData) {
      const min = 1000;
      const max = 9999;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

      await signup.updateOne(
        { email: email },
        { $set: { token: randomNumber } }
      );

      const recipientEmail = userData.email;
      const emailSubject = "Reset Password";
      const emailBody = `<p>Hello ${userData.fullname} , 
        
        Your <b>OTP</b> for reseting password is:
        
        <h1>${randomNumber}</h1>
        
        Enter this OTP to reset password`;
      sendEmail(recipientEmail, emailSubject, emailBody);

      res.json({ message: "yes", email: email });
    } else {
      //var message = "Email does not exists";
      res.json({ message: "no", email: email });
    }
  } catch (error) {
    console.log(error);
  }
};
function createTransporter() {
  console.log("In Create Transporter");
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 25,
    secure: false,
    auth: {
      user: "official.carefusion@gmail.com",
      pass: "carr vlgu dtrg vfac",
    },
  });
}
// Function to send an email
function sendEmail(to, subject, text) {
  const transporter = createTransporter();
  console.log("Receiver mail : " + to);
  const mailOptions = {
    from: "official.carefusion@gmail.com",

    to: to,
    subject: subject,
    html: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

const resetPassword = async (req, res, err) => {
  console.log("In reset password function");
  try {
    console.log("Request received in resetPassword");
    var newPass = req.body.pass[0];
    var email = req.body.email;
    await signup.updateOne(
      { email: email }, // Filter criteria to find the user
      { $set: { password: newPass } } // Update operation
    );
    const message = "Passward updated successfully";
    res.render("login", { message });
  } catch (err) {
    console.log(err);
  }
};

const OTP = async (req, res) => {
  console.log("In OTP function");
  try {
    console.log("Request received in OTP");
    var otp = req.body.otp;
    var email = req.body.email;
    console.log(req.body);
    const userData = await signup.findOne({ email: email });
    console.log(userData);
    if (userData) {
      if (otp == userData.token) {
        res.json({ message: "yes", email: email });
      } else {
        res.json({ message: "no", email: email });
      }
    } else {
      res.send("no");
    }
  } catch (error) {
    console.log(error);
  }
};
const forgetPassword = async (req, res) => {
  const message = req.query.message || "";
  res.render("forget-password", { message });
};
const chatView = async (req,res)=>{
  res.render("chat",{uname: req.session.user});
}
const complain = async (req,res)=>{
  if (req.session.user === undefined || req.session.user === "Visitor") {
    res.render("login", { message: "Please login to get Account details" });
  } else {
  res.render("complain");
  }
}
const complaiaction = async (req,res)=>{
  const compla = new complain_({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    service: req.body.service,
    complain: req.body.complain,
    
  });
  try {
    await compla.save();
    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data:", error);
  }
  res.redirect("/");
}
const security = async (req,res)=>{
  res.render("security");
}
const insurance = async (req,res)=>{
  res.render("insurance");
}
// New Code

module.exports = {
  signupAction,
  loginAction,
  forgotAction,
  login,
  signUp,
  forgetPassword,
  signOut,
  resetPassword,
  OTP,
  chatView,
  complain,
  security,
  insurance,
  complaiaction
};
