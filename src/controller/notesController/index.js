const { notesServices, subjectServices, userServices } = require('../../services');

// Creating new Note [CONTROLLER]
const createNewNoteController = async (req,res)=> {
    const payLoad = {
        notesTitle: req?.body?.notesTitle,
        notesDescription: req?.body?.notesDescription,
        subject: req?.body?.subject,
        accessUrl: req?.body?.accessUrl,
        createdBy: req?.body?.createdBy,
    }
    // Validation Check for user
    const userQuery = await userServices.getUserByIdService(payLoad?.createdBy);
    // Validation for subject
    const subjectQuery = await subjectServices.getSubjectByIdService(payLoad?.subject);
    try{
        if(
            userQuery?.exist === true &&
            userQuery?.data?.tutor === true &&
            subjectQuery?.exist === true
        ) {
            // Calling service. All validation checks complete
            const newNote = await notesServices.createNewNote(payLoad);
            res.status(200).json({
                success: true, 
                message: "New note has been created", 
                data: newNote
            });
        }

        if(subjectQuery?. exist === false) {
            res.status(200).json({
                success: false, 
                message: "This is not a valid subject", 
                data: {}
            });
        }
        if(userQuery?. exist === false) {
            res.status(200).json({
                success: false, 
                message: "You are not a valid user", 
                data: {}
            });
        }
        if(userQuery?. exist === true && userQuery?.data?.tutor === false) {
            res.status(200).json({
                success: false, 
                message: "You do not have permission to upload files", 
                data: {}
            });
        }
    }catch(err) {
        res.status(200).json({
            success: false, 
            message: "Call not acheived", 
            data: {}
        });
    }
};

module.exports = {
    createNewNoteController
}