const Product = require("../models/products");
const ProductImages = require('../models/productImages');
const _ = require('lodash');
var prodId;

const create = async (req, res) => {
  try{
    if(await Product.findOne({ productName: {
        $regex : new RegExp(req.body.productName, "i") } })){
      return res.status(422).json({
        status: false, 
        message: "Already registered with the ProductName " + req.body.productName
      });
    } else {
      const product = new Product(req.body);
      prodId = product._id;
      product.save().catch(err => {
        throw err;
      });
      let imageIds = await uploadFiles(req);
      await Product.findByIdAndUpdate(prodId,{prodimages: imageIds},{ new: true });
      res.status(200).json({ status: true, message: "Product created succesfully" });
    }
  } catch(err){
      console.log(err);
    return res.status(500).json({ status: false,  message: "Something went wrong" });
  }
};

const uploadFiles = async (req,res) => {
    let imagesData = [];
    let imageIds = {};
    if(req.files){
        let data = []; 
        if(req.files.productImages.length > 1){
            _.forEach(_.keysIn(req.files.productImages), (key) => {
                let productImage = req.files.productImages[key];
                let newName = Date.now()+'_'+productImage.name;
                productImage.mv('/Users/ravikumar/Documents/node/ecom/app/uploads/' + newName);
                data.push({
                  imageUrl: newName,
                  active: 1,
                  productId: prodId
                });
            });
        } else {
            let productImage = req.files.productImages;
            let newName = Date.now()+'_'+productImage.name;
            productImage.mv('/Users/ravikumar/Documents/node/ecom/app/uploads/' + newName);
            data.push({
                imageUrl: newName,
                active: 1,
                productId: prodId
            });
        }
        imagesData = await ProductImages.insertMany(data);
        imageIds = imagesData.map(image => image._id);
    }
    return imageIds;
}

const list = async (req, res) => {
    const prodData = await Product.find()
                        .populate('categoryId', 'categoryName')
                        .populate('prodimages', 'imageUrl').exec();
    return res.status(200).json(prodData);
};

const update = (req, res) => {
    prodId =req.params.productId;
    Product.findByIdAndUpdate(
        prodId,
      {
        categoryId: req.body.categoryId,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        price: req.body.price,
        active: req.body.active
      },
      { new: true }
    ).then(async data => {
        if (!data) {
          return res.status(404).json({
            success: false,
            message: "Product Not Found with the Update ID " + prodId
          });
        }
        await ProductImages.deleteMany({productId: prodId});
        let imageIds = await uploadFiles(req);
        await Product.findByIdAndUpdate(prodId,{prodimages: imageIds},{ new: true });
        return res.status(200).json({success: true, message: "Product updated Successfully"});
      })
      .catch(err => {
        return res.status(500).json({
            success: false,
            message: "Some thing went wrong with the Update ID " + prodId
        });
      });
  };
  


module.exports = {
  create,
  list,
  update
};
