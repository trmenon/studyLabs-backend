const { enrollmentServices} = require('../../services');

// fetching all enrollment for user [CONTROLLER]
const fetchAllEnrollmentByUserController = async ( req, res)=> {
    try{
        const enrollmentData = await enrollmentServices.getEnrollmentByUserId(req?.params?.id);
        if(enrollmentData?.exist === true) {
            res.status(200).json({
                success: true, 
                message: "Student enrollment archived", 
                data: enrollmentData?.data
            });
        }else {
            res.status(200).json({
                success: false, 
                message: "Unable to get data of enrollment for user", 
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
    fetchAllEnrollmentByUserController
}