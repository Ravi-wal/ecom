const Product = require("../models/products");
const ProductImages = require('../models/productImages');
const response = require('../config/response');
const _ = require('lodash');
const fs = require('fs');
const AWS = require('aws-sdk');
var prodId;

const ID = 'AWS_S3_ID_XXXXXXXX';
const SECRET = 'AWS_S3_SECRET_XXXXXXXX';

const BUCKET_NAME = 'AWS_S3_test-bucket';
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});


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

                /* Start: Code to save in local server */
                productImage.mv('/Users/ravikumar/Documents/node/ecom/app/uploads/' + newName);
                /* End: Code to save in local server  */

                /* Start: Code to save the files in Amazon s3 */
                var fileContent = fs.readFileSync(productImage);
                var params = {
                    Bucket: BUCKET_NAME,
                    Key: newName, 
                    Body: fileContent
                };
                var uploadData = s3.upload(params);
                /* End: Code to save the files in Amazon s3 */

                data.push({
                  imageUrl: uploadData.Location,
                  active: 1,
                  productId: prodId
                });
            });
        } else {
            let productImage = req.files.productImages;
            let newName = Date.now()+'_'+productImage.name;

            /* Start: Code to save in local server */
            productImage.mv('/Users/ravikumar/Documents/node/ecom/app/uploads/' + newName);
            /* End: Code to save in local server */

            /* Start: Code to save the files in Amazon s3 */
            var fileContent = fs.readFileSync(productImage);
            var params = {
                Bucket: BUCKET_NAME,
                Key: newName, 
                Body: fileContent
            };
            var uploadData = s3.upload(params);
            /* End: Code to save the files in Amazon s3 */

            data.push({
                imageUrl: uploadData.Location,
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
