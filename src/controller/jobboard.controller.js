import jobModel from "../model/job.model.js";

const getAllJobs = async (req,res) => {
    const jobs = await jobModel.find();
    res.send({
        message: "success",
        data: jobs
    })
}


export default {getAllJobs}
