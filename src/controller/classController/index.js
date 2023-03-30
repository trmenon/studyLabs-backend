const { classServices, userServices, notesServices, walletServices, enrollmentServices} = require('../../services');

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

// New enrollment to class
const updateClassEnrollmentController = async (req, res)=> {
    // Validation for User
    const userQuery = await userServices.getUserByIdService(req?.body?.userId);
    // Validation for Class
    const classQuery = await classServices.getClassByIdService(req?.body?.classId);
    try{
        if(userQuery?.exist === true){
            if(userQuery?.data?.student === true){
                if(classQuery?.exist === true) {
                    // Getting Wallet Information
                    const walletQuery = await walletServices.getWalletByUserId(userQuery?.data?._id);
                    const tutorWalletQuery = await walletServices.getWalletByUserId(
                        classQuery?.data?.handledBy?._id
                    );
                    if(walletQuery?.exist === true && tutorWalletQuery?.exist === true){
                        if(walletQuery?.data?.credits > 9) {
                            const newStudentCredit = walletQuery?.data?.credits - 10;
                            const updatedStudentWallet = await walletServices.updateWalletById(
                                walletQuery?.data?._id,
                                {credits: newStudentCredit}
                            );
                            if(updatedStudentWallet?.updated === true) {
                                // Crediting to tutor
                                const updatedTutorWallet = await walletServices.updateWalletById(
                                    tutorWalletQuery?.data?._id,
                                    {credits: tutorWalletQuery?.data?.credits + 10}
                                );
                                if(updatedTutorWallet?.updated === true) {
                                    // Run Enrollment to Class
                                    const updatedClass = await classServices.updateEnrollmentToClassService(
                                        classQuery?.data?._id,
                                        userQuery?.data
                                    );
                                    // Run Enrollment to student
                                    const enrollmentQuery = await enrollmentServices.getEnrollmentByUserId(userQuery?.data?._id);
                                    const updatedEnrollment = await enrollmentServices.updateClassEnrollmentService(
                                        enrollmentQuery?.data?._id,
                                        classQuery?.data
                                    )
                                    res.status(200).json({
                                        success: true, 
                                        message: "Enrollment success", 
                                        data: {
                                            student: await userServices.getUserByIdService(userQuery?.data?._id),
                                            tutor: await userServices.getUserByIdService(classQuery?.data?.handledBy?._id),
                                            class: await classServices.getClassByIdService(classQuery?.data?._id),
                                            studentWallet: await walletServices.getWalletByIdService(walletQuery?.data?._id),
                                            tutorWallet: await walletServices.getWalletByIdService(tutorWalletQuery?.data?._id),
                                            enrollment: await enrollmentServices.getEnrollmentByUserId(userQuery?.data?._id),
                                            
                                        }
                                    }); 
                                }
                            }else {
                                res.status(200).json({
                                    success: false, 
                                    message: "Unable to debit student account at the moment", 
                                    data: {}
                                }); 
                            }
                        }else {
                            res.status(200).json({
                                success: false, 
                                message: "User does not have enough credits to enroll for the class", 
                                data: {}
                            }); 
                        }
                    }else {
                        res.status(200).json({
                            success: false, 
                            message: "User does not have a wallet", 
                            data: {}
                        }); 
                    }
                }else{
                    res.status(200).json({
                        success: false, 
                        message: "Invalid class", 
                        data: {}
                    }); 
                }
            }else{
                res.status(200).json({
                    success: false, 
                    message: "User does not have permissions to attend classes", 
                    data: {}
                }); 
            }
        }else {
            res.status(200).json({
                success: false, 
                message: "Invalid user", 
                data: {}
            }); 
        }
    }catch(err) {
        console.log('[ERROR:CONTROLLER] New enrollment to class');
        console.log(err);
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
    updateNotesToArchiveController,
    updateClassEnrollmentController
}