const { subjectServices, classServices} = require('../../services');

// Create Subject [Controller]
const createSubjectController = async (req,res)=> {
    const subjectQuery = await subjectServices.getSubjectbyTitle(req?.body?.subjectTitle);
    try{
        if(subjectQuery?.exist=== true) {
            res.status(200).json({
                success: false, 
                message:"Subject already Exist", 
                data: subjectQuery?.data
            });            
        }
        if(subjectQuery?.exist== false) {
            // Call to create new subject   
            const newSubject = await subjectServices.createNewSubjectService(req?.body);
            res.status(200).json({
                success: true, 
                message: "New subject created", 
                data: newSubject
            });
        }
    }catch(err){
        res.status(200).json({
            success: false, 
            message: "Call not acheived", 
            data: {}
        });
    }
};

// Fetch all subjects [CONTROLLER]
const getAllSubjectsController = async(req, res)=> {
    try{
        const subjectList = await subjectServices.getAllSubjectsService();
        if(subjectList) {
            res.status(200).json({
                success: true, 
                message: "Subjects archived", 
                data: subjectList
            });
        }else {
            res.status(200).json({
                success: false, 
                message: "Unable to fetch subjects at the moment", 
                data: {}
            });
        }
        
    }catch(err) {
        console.log('[ERROR: CONTROLLER] Getting all subjects');
        console.log(err);
        res.status(200).json({
            success: false, 
            message: "API failed", 
            data: {}
        });    
    }
}

// Fetching Subject by ID [CONTROLLER]
const getSubjectByIdController = async (req, res)=> {
    try {
        if(req?.params?.id) {
            const subject = await subjectServices.getSubjectByIdService(req?.params?.id);
            if(subject?.exist === false) {
                res.status(200).json({
                    success: false, 
                    message: "Subject does not exist", 
                    data: {}
                });
            }
            if(subject?.exist === true) {
                res.status(200).json({
                    success: true, 
                    message: "Subject Profile archived", 
                    data: subject?.data
                });
            }
        }else {
            res.status(200).json({
                success: false, 
                message: "Subject Id not requested", 
                data: {}
            }); 
        }        
    }catch(err) {
        console.log("[ERROR] Subject Profile Card Fetch");
        console.log(err);   
        res.status(200).json({
            success: false, 
            message: "API failed", 
            data: {}
        });    
    }    
}

// Getting all details of subjects [CONTROLLER]
const getSubjectDetailsController = async (req, res)=> {
    try{
        const data = await subjectServices.getAllSubjectsService();
        if(data && data?.data && Array.isArray(data?.data)){
            const response = await data?.data.map(async (item)=> {
                return{
                    _id: item?._id,
                    subjectTitle: item?.subjectTitle,
                    subjectDescription: item?.subjectDescription,
                    classes: await classServices.getClassBySubjectId(item?._id)
                }
            });
            await Promise.all(response)
            .then((responseObject)=> {
                res.status(200).json({
                    success: true,
                    message: "surplus inventory count obtained and archived",
                    data: responseObject
                });
            }).catch((errorObject)=> {
                res.status(200).json({
                    success: true,
                    message: "No surplus available at the moment. try again later",
                    data: []
                });
            });
        }else {
            res.status(200).json({
                success: false, 
                message: "Call not acheived", 
                data: {}
            });
        }
    }catch(err){
        res.status(200).json({
            success: false, 
            message: "Call not acheived", 
            data: {}
        });
    }
}

module.exports = {
    createSubjectController,
    getAllSubjectsController,
    getSubjectByIdController,
    getSubjectDetailsController
}