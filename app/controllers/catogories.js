const Category = require("../models/categories");
const response = require('../config/response');

const create = async (req, res) => {
  try{
    if(await Category.findOne({ CategoryName: {
        $regex : new RegExp(req.body.CategoryName, "i") } })){
          response.failed("Already registered with the CategoryName " + req.body.CategoryName, res);
    } else {
      const category = new Category(req.body);
      await category.save();
      response.success("Category created succesfully", res);
    }
  } catch(err){
    response.internalError(res);
  }
};

const list = (req, res) => {
  try{
    const data = Category.find();
    response.success(data);
  }catch(err){
    response.internalError(res);
  }
};

const update = async (req, res) => {
  try{
    const data = await Category.findByIdAndUpdate(req.params.categoryId, {
                                      CategoryName: req.body.CategoryName,
                                      CategoryDescription: req.body.CategoryDescription,
                                      Active: req.body.Active
                                    },
                                    { new: true }
                            );
    if (!data) {
      response.failed("Product Not Found with the Update ID " + prodId, res);
    }
    response.success("Category updated Successfully", res);
  }catch(err){
    response.internalError(res);
  }
};
  

module.exports = {
  create,
  list,
  update
};
