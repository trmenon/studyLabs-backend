const { userServices, walletServices} = require('../../services');

// Creating new Wallet [CONTROLLER]
const createNewWalletController = async (req,res)=> {
    // Checking if user exist
    const userQuery = await userServices.getUserByIdService(req.body?.userId);
    try{
        if(userQuery?.exist === false) {
            res.status(200).json({
                success: false, 
                message:"User does not exist", 
                data: {}
            });
        }
        if(userQuery?.exist === true) {
            // Checking if user already has a wallet
            const walletQuery = await walletServices.getWalletByUserId(req.body?.userId);
            if(walletQuery?.exist === true) {
                res.status(200).json({
                    success: false, 
                    message:"User already has a wallet", 
                    data: walletQuery?.data
                });
            }
            if(walletQuery?.exist === false) {
                const payload = {
                    user: req.body?.userId,
                    credits: req.body?.credits,
                };
                const newWallet = await walletServices.createNewWallet(payload);
                res.status(200).json({
                    success: true, 
                    message:"User already has a wallet", 
                    data: newWallet
                });
            }
        }
    }catch(err){
        res.status(200).json({
            success: false, 
            message: "Call not acheived", 
            data: {}
        });
    }
};

// Fetch wallet by user-id [CONTROLLER]
const getWalletByUserController = async(req, res)=> {
    const userQuery = await userServices.getUserByIdService(req?.params?.id);
    try{
        if(userQuery?.exist === false) {
            res.status(200).json({
                success: false, 
                message:"User does not exist", 
                data: {}
            });
        }
        if(userQuery?.exist === true) {
            const wallet = await walletServices.getWalletByUserId(req.params?.id);
            if(wallet?.exist === true) {
                res.status(200).json({
                    success: true, 
                    message:"User wallet archived", 
                    data: wallet?.data
                });
            }else {
                res.status(200).json({
                    success: false, 
                    message:"User does not have wallet", 
                    data: {}
                });
            }            
        }
    }catch(err) {
        console.log('[ERROR:CONTROLLER] API failed to fetch wallet by user');
        console.log(err);
        res.status(200).json({
            success: false, 
            message:"API not acheived", 
            data: {}
        });
    }
}

// Update credits to wallet [CONTROLLER]
const updateWalletController = async (req, res)=> {
    const wallet = await walletServices.getWalletByIdService(req?.params?.id);
    try{
        if(wallet?.exist === true){
            const payload = { credits: wallet?.data?.credits + req?.body?.credits};
            const updatedWallet = await walletServices.updateWalletById(req?.params?.id, payload);
            if(updatedWallet?.updated === true) {
                res.status(200).json({
                    success: true, 
                    message: "Wallet has been updated", 
                    data: updatedWallet?.data
                });
            }
            if(updatedWallet?.updated === false) {
                res.status(200).json({
                    success: false, 
                    message: "Unable to update wallet", 
                    data: {}
                });
            }
        }
        if(wallet?.exist === false){
            res.status(200).json({
                success: false, 
                message: "Wallet does not exist", 
                data: {}
            });
        }
    }catch(err) {
        console.log('[ERROR: CONTROLLER] Updating wallet credits');
        console.log(err);
        res.status(200).json({
            success: false, 
            message: "Call not acheived", 
            data: {}
        });
    }
}

module.exports = {
    createNewWalletController,
    getWalletByUserController,
    updateWalletController
}