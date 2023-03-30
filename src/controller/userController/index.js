const { userServices, walletServices, enrollmentServices }= require('../../services');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

// Create Admin [Controller]
const createAdminUser = async (req,res)=> {
    const userQuery = await userServices.getUserByEmail(req?.body?.email);
    try{
        if(userQuery?.exist== true) {
            res.status(200).json({
                success: false, 
                message:"User already Exist", 
                data: userQuery?.data
            });            
        }
        if(userQuery?.exist== false) {
            // Call to create new user            
            const data = {...req.body, admin: true, student: false, tutor: false, isDeleted: false};  
            const newUser = await userServices.createNewUser(data);
            console.log(newUser);
            res.status(200).json({
                success: true, 
                message: "New user created", 
                data: newUser
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
// Create Tutor [Controller]
const createTutorUser = async (req,res)=> {
    
    const userQuery = await userServices.getUserByEmail(req?.body?.email);
    try{
        if(userQuery?.exist== true) {
            res.status(200).json({
                success: false, 
                message:"User already Exist", 
                data: userQuery?.data
            });            
        }
        if(userQuery?.exist== false) {
            // Call to create new user            
            const data = {
                firstName: req.body?.firstName, 
                lastName: req.body?.lastName, 
                email: req.body?.email, 
                password: req.body?.password, 
                admin: false, 
                student: false, 
                tutor: true, 
                isDeleted: false
            };  
            const newUser = await userServices.createNewUser(data);
            const newWallet = await walletServices.createNewWallet({
                user: newUser?._id,
                credits: 0,
            })
            res.status(200).json({
                success: true, 
                message: "New user created", 
                data: newUser
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
// Create Student [Controller]
const createStudentUser = async (req,res)=> {
    console.log('Controller');
    console.log(req?.body);
    const userQuery = await userServices.getUserByEmail(req?.body?.email);
    try{
        if(userQuery?.exist== true) {
            res.status(200).json({
                success: false, 
                message:"User already Exist", 
                data: userQuery?.data
            });            
        }
        if(userQuery?.exist== false) {
            // Call to create new user            
            const data = {
                firstName: req.body?.firstName, 
                lastName: req.body?.lastName, 
                email: req.body?.email, 
                password: req.body?.password, 
                admin: false, 
                student: true, 
                tutor: false, 
                isDeleted: false
            };  
            const newUser = await userServices.createNewUser(data);
            const newWallet = await walletServices.createNewWallet({
                user: newUser?._id,
                credits: 0,
            })
            const newEnrollment = await enrollmentServices.createNewEnrollment({
                student: newUser?._id,
                classes: [],
            })
            res.status(200).json({
                success: true, 
                message: "New user created", 
                data: newUser
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

// User Signin [CONTROLLER]
const signin = async(req, res)=> {
    const userQuery = await userServices.getUserByEmail(req.body?.email);
    try{
        if(userQuery?.exist== false) {
            res.status(200).json({
                success: false, 
                message: "User not registered", 
                data: {}
            });
        }
        if(userQuery?.exist== true) {
            // Getting encrypted password 
            const validpassword = await bcrypt.compare(
                req.body?.password,
                userQuery?.data?.password
            );
            if(validpassword) {
                // JWT Authentication
                const secret = config.get("jwt.secret");
                const token = jwt.sign(
                    {_id: userQuery?.data._id},
                    secret,
                    {expiresIn: '1d'}
                );
                res.cookie('token', token, {expiresIn:'1d'});
                res.status(200).json({
                    success: true, 
                    message: "Signin success", 
                    data: userQuery?.data, 
                    token
                });
            }else {
                res.status(200).json({
                    success: false, 
                    message: "Incorrect Password", 
                    data: {}
                });
            }                  
        }
    }catch(err){
        console.log("[ERROR] User Signin terminated");
        console.log(err);   
        res.status(200).json({
            success: false, 
            message: "API failed", 
            data: {}
        });     
    }
};

// User Signout [CONTROLLER]
const signout = (req, res)=> {
    res.clearCookie('token');
    res.json({
        success: true,
        message: "Signout success"
    });
};

// Fetch all users [CONTROLLER]
const getAllUsersController = async(req, res)=> {
    try{
        const userList = await userServices.getAllUsersService();
        if(userList) {
            res.status(200).json({
                success: true, 
                message: "Users archived", 
                data: userList
            });
        }else {
            res.status(200).json({
                success: false, 
                message: "Unable to fetch users at the moment", 
                data: {}
            });
        }
        
    }catch(err) {
        console.log('[ERROR: CONTROLLER] Getting all users');
        console.log(err);
        res.status(200).json({
            success: false, 
            message: "API failed", 
            data: {}
        });    
    }
}

// Fetch all tutors [CONTROLLER]
const getAllTutorsController = async(req, res)=> {
    try{
        const userList = await userServices.getAllTutorsService();
        if(userList) {
            res.status(200).json({
                success: true, 
                message: "Tutors archived", 
                data: userList
            });
        }else {
            res.status(200).json({
                success: false, 
                message: "Unable to fetch tutors at the moment", 
                data: {}
            });
        }
        
    }catch(err) {
        console.log('[ERROR: CONTROLLER] Getting all tutors');
        console.log(err);
        res.status(200).json({
            success: false, 
            message: "API failed", 
            data: {}
        });    
    }
}

// Fetching User by ID [CONTROLLER]
const getUserByIdController = async (req, res)=> {
    try {
        if(req?.params?.id) {
            const user = await userServices.getUserByIdService(req?.params?.id);
            if(user?.exist === false) {
                res.status(200).json({
                    success: false, 
                    message: "User does not exist", 
                    data: {}
                });
            }
            if(user?.exist === true) {
                res.status(200).json({
                    success: true, 
                    message: "User Profile archived", 
                    data: user?.data
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
        console.log("[ERROR] User Profile Card Fetch");
        console.log(err);   
        res.status(200).json({
            success: false, 
            message: "API failed", 
            data: {}
        });    
    }    
}

// Marking user as deleted [CONTROLLER]
const markUserAsDeletedById = async(req, res)=> {
    if(req?.params?.id) {
        const user = await userServices.getUserByIdService(req?.params?.id);
            if(user?.exist === false) {
                res.status(200).json({
                    success: false, 
                    message: "User does not exist", 
                    data: {}
                });
            }
            if(user?.exist === true) {
                const data = {isDeleted: user?.data?.isDeleted === false};
                const updatedUser = await userServices.updateUserById(req?.params?.id, data);
                if(updatedUser?.updated === true) {
                    res.status(200).json({
                        success: true, 
                        message: "User status has been changed", 
                        data: updatedUser?.data
                    });
                }
                if(updatedUser?.updated === false) {
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
            message: "User Id not requested", 
            data: {}
        }); 
    }
}

module.exports= {
    createAdminUser,
    createTutorUser,
    createStudentUser,
    signin,
    signout,
    getUserByIdController,
    getAllUsersController,
    markUserAsDeletedById,
    getAllTutorsController
}