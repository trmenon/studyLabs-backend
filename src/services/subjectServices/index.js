const subjectSchema = require('../../model/subjectModel');

// Get Subject By title [SERVICES]
const getSubjectbyTitle = async (subjectTitle)=> {
    const subject = await subjectSchema.findOne({subjectTitle});
    try {
        if(subject){
            return{exist: true, data: subject};
        }else {
            return{exist: false, data: {}};
        }
    }catch(err){
        console.log("[ERROR] Getting subject by title");
        console.log(err);
        return {success: false, data:{}};
    }    
};

// Create New Subject [SERVICES]
const createNewSubjectService = async (subject)=> {
    try {
        const newSubject = new subjectSchema(subject);
        await newSubject.save()
        .then((doc)=>{
            console.log('[SUCCESS] New subject doc saved successfully');
            console.log(doc);
        })
        .catch((error)=> {
            console.log('EXCEPTION-CAUGHT] Unable to save new subject doc');
            console.log(error);
        });
        return newSubject;
    }catch (error) {
        console.log("[EXCEPTION] Creating new subject");
        console.log(error);
    }
};

// Get all subjects as list [SERVICES]
const getAllSubjectsService = async ()=> {
    try {
        const subjectList = await subjectSchema.find();
        return {count: subjectList.length, data: subjectList};
    } catch (error) {
        console.log('[ERROR] Fetching all subjects as list : SERVICE LAYER');
        console.log(error)
        return {count: 0, data: []};
    }
}

// Getting subject by id [SERVICES]
const getSubjectByIdService = async(id)=> {
    try{
        const subject = await subjectSchema.findById(id);
        if(subject) {
            return { exist: true, data: subject};
        }else {
            return {exist: false, data: {}};
        }
    }catch(err) {
        console.log("[SUBJECT-SERVICE-EXCEPTION] Trying to get subject by Id");
        return {exist: false, data: {}};
    }
}

module.exports = {
    getSubjectbyTitle,
    createNewSubjectService,
    getAllSubjectsService,
    getSubjectByIdService,
}