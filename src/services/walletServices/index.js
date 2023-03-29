const walletSchema = require('../../model/walletModel');

// fetch Wallet by Id [SERVICES]
const getWalletByIdService = async(id)=> {
    try{
        const wallet = await walletSchema.findById(id).populate("user");
        if(wallet) {
            return { exist: true, data: wallet};
        }else {
            return {exist: false, data: {}};
        }
    }catch(err) {
        console.log("[Wallet-SERVICE-EXCEPTION] Trying to get wallet by Id");
        return {exist: false, data: {}};
    }
}

// Get Wallet by User [SERVICES]
const getWalletByUserId = async (id)=> {
    const wallet = await walletSchema.findOne({user: id}).populate('user');
    try {
        if(wallet){
            return{exist: true, data: wallet};
        }else {
            return{exist: false, data: {}};
        }
    }catch(err){
        console.log("[ERROR] Getting wallet ny userId");
        console.log(err);
        return {success: false, data:{}};
    }    
};

// Create New Wallet [SERVICES]
const createNewWallet = async (payload)=> {
    
    try {
        const newWallet = new walletSchema(payload);
        await newWallet.save()
        .then((doc)=>{
            console.log('[SUCCESS] New wallet doc saved successfully');
            console.log(doc);
        })
        .catch((error)=> {
            console.log('EXCEPTION-CAUGHT] Unable to save new wallet doc');
            console.log(error);
        });
        return newWallet;
    }catch (error) {
        console.log("[EXCEPTION] Creating new wallet");
        console.log(error);
    }
};

// Update Wallet by Id
const updateWalletById = async(id, data)=> {
    try {
        const updatedWallet = await walletSchema.findByIdAndUpdate(id, data, { new: true });
        return {updated : true, data: updatedWallet};
      } catch (error) {
        console.log('[ERROR: SERVICE] Update wallet by id');
        console.log(error);
        return { updated: false, data: {}}
      }
}

module.exports = {
    getWalletByIdService,
    getWalletByUserId,
    createNewWallet,
    updateWalletById
}