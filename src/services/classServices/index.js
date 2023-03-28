const classSchema = require('../../model/classModel');

// Get all classes as list [SERVICES]
const getAllClassesService = async ()=> {
    try {
        const classList = await classSchema.find().populate(["handledBy", "subject"]);
        return {count: classList.length, data: classList};
    } catch (error) {
        console.log('[ERROR] Fetching all classes as list : SERVICE LAYER');
        console.log(error)
        return {count: 0, data: []};
    }
}

// Get Class by Title [SERVICES]
const getClassByClassTitle = async (classTitle)=> {
    const _class = await classSchema.findOne({classTitle});
    try {
        if(_class){
            return{exist: true, data: _class};
        }else {
            return{exist: false, data: {}};
        }
    }catch(err){
        console.log("[ERROR] Getting class by classTitle");
        console.log(err);
        return {success: false, data:{}};
    }    
};

// Create New Class [SERVICES]
const createNewClass = async (payload)=> {
    const data = {...payload, enrolled: [], archives: [], isActive: true};
    try {
        const newClass = new classSchema(data);
        await newClass.save()
        .then((doc)=>{
            console.log('[SUCCESS] New class doc saved successfully');
            console.log(doc);
        })
        .catch((error)=> {
            console.log('EXCEPTION-CAUGHT] Unable to save new class doc');
            console.log(error);
        });
        return newClass;
    }catch (error) {
        console.log("[EXCEPTION] Creating new class");
        console.log(error);
    }
};

// fetch Class by Id [SERVICES]
const getClassByIdService = async(id)=> {
    try{
        const _class = await classSchema.findById(id).populate(["handledBy", "subject", "archives"]);
        if(_class) {
            return { exist: true, data: _class};
        }else {
            return {exist: false, data: {}};
        }
    }catch(err) {
        console.log("[USER-SERVICE-EXCEPTION] Trying to get class by Id");
        return {exist: false, data: {}};
    }
}

// fetch Class by Tutor [SERVICES]
const getClassByTutorService = async(tutor)=> {
    try{
        const classList = await classSchema.find({handledBy: tutor}).populate(["handledBy", "subject"]);
        if(classList) {
            return { count: classList.length, data: classList};
        }else {
            return {count: 0, data: []};
        }
    }catch(err) {
        console.log("[CLASS-SERVICE-EXCEPTION] Trying to get class by Tutor");
        return {count: 0, data: []};
    }
}

// Update Class By Id [Service]
const updateClassById = async(id, data)=> {
    try {
        const updatedClass = await classSchema.findByIdAndUpdate(id, data, { new: true });
        return {updated : true, data: updatedClass};
      } catch (error) {
        console.log('[ERROR: SERVICE] Update class by id');
        console.log(error);
        return { updated: false, data: {}}
      }
}

// Update Notes to Class by Id
const updateNotesToClassService = async (id, data)=> {
    try {
        const updatedClass = await classSchema.findByIdAndUpdate(
            id,
            { $push: { archives: data } },
        );
        console.log(updatedClass);
        return updatedClass;
    }catch (error) {
        console.log("[EXCEPTION] pushing  new note to class");
    }
};

module.exports = {
    getAllClassesService,
    getClassByClassTitle,
    createNewClass,
    getClassByIdService,
    updateClassById,
    getClassByTutorService,
    updateNotesToClassService
}