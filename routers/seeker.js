//mongodb://127.0.0.1:27017/FYP_CareFusion
const express = require("express");
const router = express.Router();
const {getCategory,shortlist,getShortlisted,deleteShortlistedAssign,jobAssignAction,seekerDJRA,jobAssign,seekerDSL,seekerDJRI,jobPostAction,deleteShortlistedObject,jobPostCard,dashboard,findWorker,seekerDJD, postJob,seekerDA,seekerDJ,seekerDW,seekerDIN,seekerDJR,seekerDB,update_account} = require("../controller/seeker");


// for getting providers according to specific skills e.g.. Maid
router.route("/getCategory/:skills").get(getCategory);

// shortlist the providers for the specific user by using their mail
router.route("/shortlist/:skill/:prov_mail").get(shortlist);

// for getting all the shortlisted providers for specific provider
router.route("/getShortlisted").get(getShortlisted);

// for action comming from posting a job form
router.route("/jobPostAction").post(jobPostAction);
router.route("/update_account").post(update_account);

// for displaying job after filling the job post form
router.route("/jobPostCard").get(jobPostCard);

// for deleting provider from shortlisted
router.route("/deleteShortlistedObject/:email").get(deleteShortlistedObject);
router.route("/dashboard").get(dashboard);
router.route("/findWorker").get(findWorker);
router.route("/postJob").get(postJob);
router.route("/seekerDA").get(seekerDA);
router.route("/seekerDJ").get(seekerDJ);
router.route("/seekerDW").get(seekerDW);
router.route("/seekerDB").get(seekerDB);
router.route("/seekerDIN").get(seekerDIN);
router.route("/seekerDJR").get(seekerDJR);
router.route("/seekerDJD").get(seekerDJD);
router.route("/seekerDJRA").get(seekerDJRA);
router.route("/seekerDJRI").get(seekerDJRI);
router.route("/seekerDSL").get(seekerDSL);
router.route("/jobAssign").get(jobAssign);
router.route("/jobAssignAction").post(jobAssignAction);
router.route("/deleteShortlistedAssign").get(deleteShortlistedAssign);

module.exports = router;
