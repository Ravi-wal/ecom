const Product = require("../models/products");
const ProductImages = require('../models/productImages');
const response = require('../config/response');
const _ = require('lodash');
var prodId;

const create = async (req, res) => {
  try{
    if(await Product.findOne({ productName: {
        $regex : new RegExp(req.body.productName, "i") } })){
        response.failed("Already registered with the ProductName " + req.body.productName, res);
    } else {
        const product = new Product(req.body);
        prodId = product._id;
        product.save();
        let imageIds = await uploadFiles(req);
        await Product.findByIdAndUpdate(prodId,{prodimages: imageIds},{ new: true });
        response.success("Product created succesfully", res);
    }
  } catch(err){
      response.internalError(res);
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
    response.success(prodData, res);
};

const update = async (req, res) => {
    prodId =req.params.productId;
    try{
      const data = await Product.findByIdAndUpdate(prodId,{
                                          categoryId: req.body.categoryId,
                                          productName: req.body.productName,
                                          productDescription: req.body.productDescription,
                                          price: req.body.price,
                                          active: req.body.active
                                        },
                                        { new: true }
                                );
      if (!data) {
        response.failed("Product Not Found with the Update ID " + prodId, res);
      }

      await ProductImages.deleteMany({productId: prodId});
      let imageIds = await uploadFiles(req);
      await Product.findByIdAndUpdate(prodId,{prodimages: imageIds},{ new: true });
      response.success("Product updated Successfully", res);

    } catch(err) {
      response.internalError(res);
    }
}

module.exports = {
  create,
  list,
  update
};
