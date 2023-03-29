const express = require('express');
const router = express.Router();
const {walletController} = require('../../controller');
const { requireSignin} = require('../../middleware');

// Creating new wallet for user
router.post('/createWallet', requireSignin, walletController.createNewWalletController);

// getting wallet by user
router.get('/getWalletByUser/:id', requireSignin, walletController.getWalletByUserController);

// Update credits of wallet
router.put('/updateWallet/:id', requireSignin, walletController.updateWalletController);

module.exports = router;