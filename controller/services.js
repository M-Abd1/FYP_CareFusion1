const availform = require("../model/availform")

const services = (req,res)=> {res.render("services", {user: req.session.signUpAs})}
const architect = (req,res)=> {res.render("architect")}
const babySitter = (req,res)=> {res.render("baby-sitter")}
const chef = (req,res)=> {res.render("chef")}
const eventPlanner = (req,res)=> {res.render("event-planner")}
const gym = (req,res) => {res.render("gym")}
const maid = (req,res) => {res.render("maid")}
const makeUp = (req,res) => {res.render("make-up")}
const tutor= (req,res) => {res.render("tutor")}

const availFormAction = async (req, res) => {
    const {serviceType, location, estimatedBudget, serviceDate, serviceTime} = req.body;
    console.log (req.body);
    const addDetail = new availform({
        serviceType: serviceType,
        location: location,
        estimatedBudget: estimatedBudget,
        serviceDate: serviceDate,
        serviceTime: serviceTime
    });
    try {
        await addDetail.save();
        console.log('Request successfully Recieved!');
    } catch (error) {
        console.error('Error in availing that service: ', error);
    }
}
module.exports = {services, architect, babySitter, chef, eventPlanner, gym, maid, makeUp, tutor, availFormAction}