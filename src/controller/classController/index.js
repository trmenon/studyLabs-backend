const { classServices, userServices, notesServices} = require('../../services');

// Fetch all classes [CONTROLLER]
const getAllClassesController = async(req, res)=> {
    try{
        const classList = await classServices.getAllClassesService();
        if(classList) {
            res.status(200).json({
                success: true, 
                message: "Classes archived", 
                data: classList
            });
        }else {
            res.status(200).json({
                success: false, 
                message: "Unable to fetch classes at the moment", 
                data: {}
            });
        }
        
    }catch(err) {
        console.log('[ERROR: CONTROLLER] Getting all classes');
        console.log(err);
        res.status(200).json({
            success: false, 
            message: "API failed", 
            data: {}
        });    
    }
}

// Creating new Class [CONTROLLER]
const createNewClassController = async (req,res)=> {
    const classQuery = await classServices.getClassByClassTitle(req?.body?.classTitle);
    try{
        if(classQuery?.exist== true) {
            res.status(200).json({
                success: false, 
                message:"Class with the title already exist. Can not duplicate. Please choose another name", 
                data: classQuery?.data
            });            
        }
        if(classQuery?.exist== false) {
            // Call to create new class 
            const newClass = await classServices.createNewClass(req?.body);
            res.status(200).json({
                success: true, 
                message: "New class created", 
                data: newClass
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

// Fetching Class by ID [CONTROLLER]
const getClassByIdController = async (req, res)=> {
    try {
        if(req?.params?.id) {
            const classQuery = await classServices.getClassByIdService(req?.params?.id);
            if(classQuery?.exist === false) {
                res.status(200).json({
                    success: false, 
                    message: "Class does not exist", 
                    data: {}
                });
            }
            if(classQuery?.exist === true) {
                res.status(200).json({
                    success: true, 
                    message: "Class Profile archived", 
                    data: classQuery?.data
                });
            }
        }else {
            res.status(200).json({
                success: false, 
                message: "Class Id not requested", 
                data: {}
            }); 
        }        
    }catch(err) {
        console.log("[ERROR] Class Profile Fetch");
        console.log(err);   
        res.status(200).json({
            success: false, 
            message: "API failed", 
            data: {}
        });    
    }    
}

// Fetching Class by Tutor [CONTROLLER]
const getClassByTutorController = async (req, res)=> {
    try {
        if(req?.params?.id) {
            const userQuery = await userServices.getUserByIdService(req?.params?.id);
            if(userQuery?.exist === false) {
                res.status(200).json({
                    success: false, 
                    message: "User does not exist", 
                    data: {}
                });
            }
            if(userQuery?.exist === true) {
                const classList = await classServices.getClassByTutorService(req?.params?.id);
                res.status(200).json({
                    success: true, 
                    message: "Class Profile archived", 
                    data: classList?.data
                });
            }
        }else {
            res.status(200).json({
                success: false, 
                message: "User Id not requested", 
                data: {}
            }); 
        }        
    }catch(err) {
        console.log("[ERROR] Class Profile Fetch");
        console.log(err);   
        res.status(200).json({
            success: false, 
            message: "API failed", 
            data: {}
        });    
    }    
}

// Toggle Class Status [CONTROLLER]
const toggleClassStatusController = async(req, res)=> {
    if(req?.params?.id) {
        const _class = await classServices.getClassByIdService(req?.params?.id);
            if(_class?.exist === false) {
                res.status(200).json({
                    success: false, 
                    message: "Class does not exist", 
                    data: {}
                });
            }
            if(_class?.exist === true) {
                const data = {isActive: _class?.data?.isActive === false};
                const updatedClass = await classServices.updateClassById(req?.params?.id, data);
                if(updatedClass?.updated === true) {
                    res.status(200).json({
                        success: true, 
                        message: "Class status has been changed", 
                        data: updatedClass?.data
                    });
                }
                if(updatedClass?.updated === false) {
                    res.status(200).json({
                        success: false, 
                        message: "Unable to perform action", 
                        data: {}
                    });
                }
                
            }
    }else {
        res.status(200).json({
            success: false, 
            message: "Class Id not requested", 
            data: {}
        }); 
    }
}

// Update notes to archives [CONTROLLER]
const updateNotesToArchiveController = async (req, res)=> {
    const classQuery = await classServices.getClassByIdService(req?.params?.id);
    console.log(req?.params)
    try{
        if(classQuery?.exist === true) {
            const note = await notesServices.getNoteByIdService(req?.params?.note);
            const updatedClass = await classServices.updateNotesToClassService(
                req?.params?.id, 
                note?.data
            );
            res.status(200).json({
                success: true, 
                message: "Notes updated to class", 
                data: updatedClass
            });
        }else {
            res.status(200).json({
                success: false, 
                message: "Invalid class not requested", 
                data: {}
            }); 
        }
    }catch(err) {
        res.status(200).json({
            success: false, 
            message: "Api not acheived", 
            data: {}
        }); 
    }
}

module.exports = {
    getAllClassesController,
    createNewClassController,
    getClassByIdController,
    toggleClassStatusController,
    getClassByTutorController,
    updateNotesToArchiveController
}