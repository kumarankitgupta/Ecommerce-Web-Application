const router = require('express').Router();
const express  = require('express')
const Addauth = require('../middlewares/Addauth')
const SellerAuth = require('../middlewares/SellerAuth')
const multer = require('multer');
const upload = multer({dest:'uploads/'});
const Product = require('../models/productModel')
const Order = require('../models/orderModel');
const { addtheProduct, getMyProduts, recieveTheOrder, updateTheproduct, deleteMyProduct } = require('../controllers/SellerCon');
router.use(express.static("public"));
router.post('/addproduct',Addauth,upload.single('productImage'),addtheProduct)
router.post('/deleteproduct',SellerAuth,deleteMyProduct)
router.get('/myproducts',SellerAuth,getMyProduts)
router.get('/recieve_orders',SellerAuth,recieveTheOrder)
router.post('/updateprod',SellerAuth,updateTheproduct)
module.exports = router;