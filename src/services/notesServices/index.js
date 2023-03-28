const notesSchema = require('../../model/notesModel');

// Create New Note [SERVICES]
const createNewNote = async (payload)=> {
    try {
        const newNote = new notesSchema(payload);
        await newNote.save()
        .then((doc)=>{
            console.log('[SUCCESS] New note doc saved successfully');
            console.log(doc);
        })
        .catch((error)=> {
            console.log('EXCEPTION-CAUGHT] Unable to save new note doc');
            console.log(error);
        });
        return newNote;
    }catch (error) {
        console.log("[EXCEPTION] Creating new note");
        console.log(error);
    }
};

// Fetch not by id [SERVICES]
const getNoteByIdService = async(id)=> {
    try{
        console.log(id);
        const note = await notesSchema.findById(id).populate(["subject", "createdBy"]);
        if(note) {
            return { exist: true, data: note};
        }else {
            return {exist: false, data: {}};
        }
    }catch(err) {
        console.log("[USER-SERVICE-EXCEPTION] Trying to get note by Id");
        return {exist: false, data: {}};
    }
}

module.exports = {
    createNewNote,
    getNoteByIdService
}