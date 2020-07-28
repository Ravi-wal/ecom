const Product = require("../models/products");
const ProductImages = require('../models/productImages');
const _ = require('lodash');
var prodId;

const create = async (req, res) => {
  try{
    if(await Product.findOne({ ProductName: {
        $regex : new RegExp(req.body.ProductName, "i") } })){
      return res.status(422).json({
        status: false, 
        message: "Already registered with the ProductName " + req.body.ProductName
      });
    } else {
      const product = new Product(req.body);
      prodId = product._id;
      product.save().catch(err => {
        throw err;
      });
      uploadFiles(req);
      res.status(200).json({ status: true, message: "Product created succesfully" });
    }
  } catch(err){
      console.log(err);
    return res.status(500).json({ status: false,  message: "Something went wrong" });
  }
};

const uploadFiles = (req,res) => {
    if(req.files){
        let data = []; 
        if(req.files.ProductImages.length > 1){
            _.forEach(_.keysIn(req.files.ProductImages), (key) => {
                let ProductImage = req.files.ProductImages[key];
                let newName = Date.now()+'_'+ProductImage.name;
                ProductImage.mv('/Users/ravikumar/Documents/node/ecom/app/uploads/' + newName);
                data.push({
                    ProductId: prodId,
                    ImageURL: newName,
                    Active: 1
                });
            });
        } else {
            let ProductImage = req.files.ProductImages;
            let newName = Date.now()+'_'+ProductImage.name;
            ProductImage.mv('/Users/ravikumar/Documents/node/ecom/app/uploads/' + newName);
            data.push({
                ProductId: prodId,
                ImageURL: newName,
                Active: 1
            });
        }
        ProductImages.insertMany(data);
    }
}

const list = (req, res) => {
    Product.findOne({ProductName: "Dell Laptop"})
    .populate("prodimages")
    .exec(data => {
       
      return res.status(200).json(data);
    })
};

const update = (req, res) => {
    prodId =req.params.productId;
    Product.findByIdAndUpdate(
        prodId,
      {
        CategoryId: req.body.CategoryId,
        ProductName: req.body.ProductName,
        ProductDescription: req.body.ProductDescription,
        Price: req.body.Price,
        Active: req.body.Active
      },
      { new: true }
    ).then(async data => {
        if (!data) {
          return res.status(404).json({
            success: false,
            message: "Product Not Found with the Update ID " + prodId
          });
        }
        await ProductImages.deleteMany({ProductId: prodId});
        uploadFiles(req);
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
