const express = require("express");
const router = express.Router();
const {services, architect, babySitter, chef, eventPlanner, gym, maid, makeUp, tutor, availFormAction} = require("../controller/services")
router.route("/services").get(services)
router.route("/architect").get(architect)
router.route("/babySitter").get(babySitter)
router.route("/chef").get(chef)
router.route("/eventPlanner").get(eventPlanner)
router.route("/gym").get(gym)
router.route("/maid").get(maid)
router.route("/makeUp").get(makeUp)
router.route("/tutor").get(tutor)
router.route("/availFormAction").post(availFormAction)
module.exports = router;