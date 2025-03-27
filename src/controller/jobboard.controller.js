import jobModel from "../model/job.model.js";

const getAllJobs = async (req, res) => {
    // const jobs = await jobModel.find();
    // res.send({
    //     message: "success",
    //     data: jobs
    // })
    res.render("index");
};

const getOneJobs = async (req, res) => {
    const { id } = req.params;

    if(!(id)){
        return res.status(400).send({
            message: `Given id: ${id} is not valid`
        });
    };

    const job = await jobModel.findById(id);

    if(!job){
        return res.status(404).send({
            message: `Job with id: ${id} not found`
        });
    };
    
    res.send({
        message: "success",
        data: job
    });
};

const createJobs = async (req, res) => {
    const { name } = req.body;

    const foundedJobs = await jobModel.findOne({ name });

    if (foundedJobs) {
        return res.status(409).send({
            message: `Job: ${name} allaqachon mavjud`,
        });
    }

    const job = await jobModel.create({ name })

    res.send({
        message: "success",
        data: job
    })
};

const updateJobs = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if(!(id)){
        return res.status(400).send({
            message: `Given id: ${id} is not valid`
        });
    };

    const job = await jobModel.findByIdAndUpdate(id, { name }, { new: true });

    if(!job){
        return res.status(404).send({
            message: `Job with id: ${id} not found`
        });
    };

    res.send({
        message: "success",
        data: job
    });
};

const deleteJobs = async (req, res) => {
    const { id } = req.params;

    if(!(id)){
        return res.status(400).send({
            message: `Given id: ${id} is not valid`
        });
    };

    const job = await jobModel.findByIdAndDelete(id);

    if(!job){
        return res.status(404).send({
            message: `Job with id: ${id} not found`
        });
    };

    res.send({
        message: "success",
        data: job
    });
};

export default { getAllJobs, createJobs, updateJobs, deleteJobs, getOneJobs }; 
