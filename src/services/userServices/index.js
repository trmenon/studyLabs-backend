const userSchema = require('../../model/userModel');

// Get User By Email [SERVICES]
const getUserByEmail = async (email)=> {
    const user = await userSchema.findOne({email});
    try {
        if(user){
            return{exist: true, data: user};
        }else {
            return{exist: false, data: {}};
        }
    }catch(err){
        console.log("[ERROR] Getting user by email");
        console.log(error);
        return {success: false, data:{}};
    }    
};

// Getting user by id [SERVICES]
const getUserByIdService = async(id)=> {
    try{
        const user = await userSchema.findById(id);
        if(user) {
            return { exist: true, data: user};
        }else {
            return {exist: false, data: {}};
        }
    }catch(err) {
        console.log("[USER-SERVICE-EXCEPTION] Trying to get user by Id");
        return {exist: false, data: {}};
    }
}

// Create New User [SERVICES]
const createNewUser = async (user)=> {
    console.log(user);
    try {
        const newUser = new userSchema(user);
        await newUser.save()
        .then((doc)=>{
            console.log('[SUCCESS] New user doc saved successfully');
            console.log(doc);
        })
        .catch((error)=> {
            console.log('EXCEPTION-CAUGHT] Unable to save new user doc');
            console.log(error);
        });
        return newUser;
    }catch (error) {
        console.log("[EXCEPTION] Creating new user");
        console.log(error);
    }
};

// Get all users as list [SERVICES]
const getAllUsersService = async ()=> {
    try {
        const userList = await userSchema.find();
        return {count: userList.length, data: userList};
    } catch (error) {
        console.log('[ERROR] Fetching all users as list : SERVICE LAYER');
        console.log(error)
        return {count: 0, data: []};
    }
}

// Get all tutors [Services]
const getAllTutorsService = async ()=> {
    try {
        const userList = await userSchema.find({admin: false, tutor: true, student: false});
        return {count: userList.length, data: userList};
    } catch (error) {
        console.log('[ERROR] Fetching all users as list : SERVICE LAYER');
        console.log(error)
        return {count: 0, data: []};
    }
}

// Update User By Id [Service]
const updateUserById = async(id, data)=> {
    try {
        const user = await userSchema.findByIdAndUpdate(id, data, { new: true });
        return {updated : true, data: user};
      } catch (error) {
        console.log('[ERROR: SERVICE] Update user by id');
        console.log(error);
        return { updated: false, data: {}}
      }
}

module.exports= {
    getUserByEmail,
    createNewUser,
    getUserByIdService,
    getAllUsersService,
    updateUserById,
    getAllTutorsService
};