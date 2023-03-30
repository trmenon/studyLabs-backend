const enrollmentSchema = require('../../model/enrollmentModel');

// Get Enrollment by User [SERVICES]
const getEnrollmentByUserId = async (user)=> {
    const enrollment = await enrollmentSchema.findOne({student: user}).populate(["classes", "student"]);
    try {
        if(enrollment){
            return{exist: true, data: enrollment};
        }else {
            return{exist: false, data: {}};
        }
    }catch(err){
        console.log("[ERROR] Getting enrollment by user");
        console.log(err);
        return {success: false, data:{}};
    }    
};

// Create New Enrollment [SERVICES]
const createNewEnrollment = async (payload)=> {    
    try {
        const newEnrollment = new enrollmentSchema(payload);
        await newEnrollment.save()
        .then((doc)=>{
            console.log('[SUCCESS] New enrollment doc saved successfully');
            console.log(doc);
        })
        .catch((error)=> {
            console.log('EXCEPTION-CAUGHT] Unable to save new enrollment doc');
            console.log(error);
        });
        return newClass;
    }catch (error) {
        console.log("[EXCEPTION] Creating new enrollment");
        console.log(error);
    }
};

// Update enrollment to student by Id
const updateClassEnrollmentService = async (id, data)=> {
    try {
        const updatedEnrollment = await enrollmentSchema.findByIdAndUpdate(
            id,
            { $push: { classes: data } },
        );
        return updatedEnrollment;
    }catch (error) {
        console.log("[EXCEPTION] pushing  new class to enrollment");
    }
};

module.exports = {
    getEnrollmentByUserId,
    createNewEnrollment,
    updateClassEnrollmentService
}