// Fetch User Roles Controller
const fetchAllUserRolesController = async (req, res)=> {
    try{
        const data = {
            user_roles: [
                {key: 'USER_ROLE_ADMIN', value: 'admin', label: 'Adminstrator'},
                {key: 'USER_ROLE_TUTOR', value: 'tutor', label: 'Tutor'},
                {key: 'USER_ROLE_STUDENT', value: 'student', label: 'Student'},
                {key: 'USER_ROLE_ALL', value: 'all', label: 'All'},
            ]
        };
        res.status(200).json({
            success: true, 
            message: "All user roles archived", 
            data: data
        });
    }catch(err) {
        res.status(200).json({
            success: false, 
            message: "Call not acheived", 
            data: {}
        });
    }
}

module.exports = {
    fetchAllUserRolesController
}