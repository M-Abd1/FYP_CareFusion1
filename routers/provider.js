const express= require("express");
const router = express.Router();
const {providerProfile,completejob, reject_job,confirm_job,assignJobs,provProfileAction, jobView, dashboard, profile, updateProfile, stats,applyjob} = require("../controller/provider");

router.route("/provProfile").get(providerProfile);
router.route("/provProfileAction").post(provProfileAction);
router.route("/viewJob").get(jobView);
router.route("/dashboard").get(dashboard);
router.route("/profile").get(profile);
router.route("/update-profileData").post(updateProfile);
router.route("/statistics").get(stats);
router.route("/completejob").get(completejob);
router.route("/applyjob").get(applyjob);
router.route("/assignJobs").get(assignJobs);
router.route("/confirm_job").get(confirm_job);
router.route("/reject_job").get(reject_job);

module.exports = router;