const provProfile = require("../model/provider");
const multer = require("multer");
const signup = require("../model/signup");
const jobpost = require("../model/JobPost");

const storage = multer.diskStorage({
  //destintation of uploading file
  destination: function (req, file, picture) {
    picture(null, "uploads");
  },
  filename: function (req, file, picture) {
    picture(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("profilePicture");
const provProfileAction = async (req, res) => {
  // Using Multer to handle the file upload
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log(req.session.email);
    // checking req.file is defined or not
    const profilePicture = req.file ? req.file.filename : null;
    if (req.session.email != null) {
      const prov = await signup.findOne({ email: req.session.email });

      const { phoneNo, cnic, address, dob, gender, hometown, skills, about } =
        req.body;
      skills.shift(); // removing the first null value and shifting the other values to left;
      const addProfile = new provProfile({
        fullname: prov.fullname,
        phoneNo: phoneNo,
        email: prov.email,
        cnic: cnic,
        address: address,
        dob: dob,
        gender: gender,
        hometown: hometown,
        skills: skills,
        about: about,
        profilePicture: profilePicture,
      });

      try {
        await addProfile.save();
        console.log("Profile Added successfully!");
      } catch (error) {
        console.error("Error adding in Profile:", error);
      }

      // Redirect or send a response as needed
      res.redirect("/");
    }
  });
};

const updateProfile = async (req, res) => {
  const { phoneNo, address, hometown, skills } = req.body;
  if (phoneNo != undefined || address != undefined || hometown != undefined) {
    if (phoneNo != undefined) {
      await provProfile.updateOne(
        { email: req.session.email },
        { phoneNo: phoneNo }
      );
    }
    if (address != undefined) {
      await provProfile.updateOne(
        { email: req.session.email },
        { address: address }
      );
    }
    if (hometown != undefined) {
      await provProfile.updateOne(
        { email: req.session.email },
        { hometown: hometown }
      );
    }

    res.status(200).json({ message: "Profile updated successfully!!" });
  } else {
    res.status(404).render("404");
  }
};

// const jobViewAction = async (req, res) => {

const jobView = async (req, res) => {
  try {
    const profile = await provProfile
      .find({ email: req.session.email })
      .limit(1);
    if (profile.length != 0) {
      const skil = "skills";
      const skill = profile[0][skil];
      const jobs = await jobpost.find({
        skill: { $in: skill },
        status: "Unassigned",
      });
      res.render("jobView", { jobs: jobs });
    } else {
      const jobs = [];
      res.render("jobView", { jobs: jobs });
    }
  } catch (err) {
    console.log(err);
  }
};

const providerProfile = (req, res) => {
  res.render("provProfile");
};
const dashboard = (req, res) => {
  res.render("prov-dashboard");
};
const profile = async (req, res) => {
  res.render("profile", {
    profileImage: req.session.image,
    data: await provProfile.findOne({ email: req.session.email }),
  });
};
const stats = async (req, res) => {
  if (req.session.user === undefined || req.session.user === "Visitor") {
    res.render("login", { message: "Please login to get Account details" });
  } else {
    const prov = await provProfile.find({ email: req.session.email });
    console.log("Provider: " + prov);
    const provID = prov[0]["_id"];
    const jobs = await jobpost.find({ status: "Assigned", assignProv: provID });
    res.render("statistics", { jobs: jobs });
  }
};
const completejob = async (req, res) => {
  if (req.session.user === undefined || req.session.user === "Visitor") {
    res.render("login", { message: "Please login to get Account details" });
  } else {
    const prov = await provProfile.find({ email: req.session.email });
    console.log("Provider: " + prov);
    const provID = prov[0]["_id"];
    const jobs = await jobpost.find({ status: "Complete", assignProv: provID });
    res.render("complete", { jobs: jobs });
  }
};
const applyjob = async (req, res) => {
  console.log(req.query);
  const user = await provProfile.find({ email: req.session.email }).limit(1);
  if (user.length != 0) {
    const prov_id = user[0]["_id"];
    await jobpost.updateOne(
      { _id: req.query.id },
      { $push: { reply: prov_id } }
    );
    res.redirect("/");
  } else {
    res.redirect("/provider/viewJob");
  }
};
const assignJobs = async (req, res) => {
  console.log(req.query);
  const user = await provProfile.find({ email: req.session.email }).limit(1);
  if (user.length != 0) {
    const prov = await provProfile.find({ email: req.session.email });
    console.log("Provider: " + prov);
    const provID = prov[0]["_id"];
    const jobs = await jobpost.find({ status: "Unapproved", assignProv: provID });
    res.render("confirmJob", { jobs: jobs });
  } else {
    res.redirect("/provider/viewJob");
  }
};
const confirm_job = async (req, res) => {
  const user = await provProfile.find({ email: req.session.email }).limit(1);
  if (user.length != 0) {
    const id = req.query.id;
    await jobpost.updateOne({ _id: id }, { status: "Assigned" });
    res.redirect("/provider/dashboard");
  } else {
    res.redirect("/provider/dashboard");
  }
};
const reject_job = async (req, res) => {
  const user = await provProfile.find({ email: req.session.email }).limit(1);
  if (user.length != 0) {
    const id = req.query.id;
    await jobpost.updateOne({ _id: id }, { status: "Rejected" });
    res.redirect("/provider/dashboard");
  } else {
    res.redirect("/provider/dashboard");
  }
};

module.exports = {
  assignJobs,
  providerProfile,
  completejob,
  provProfileAction,
  jobView,
  dashboard,
  profile,
  updateProfile,
  stats,
  applyjob,
  confirm_job,
  reject_job,
};
