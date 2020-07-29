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

const list = async (req, res) => {
  try{
    const data = await Category.find();
    response.success(data,res);
  }catch(err){
    console.log(err)
    response.internalError(res);
  }
};

const update = async (req, res) => {
  try{
    const data = await Category.findByIdAndUpdate(req.params.categoryId, {
                                      categoryName: req.body.categoryName,
                                      categoryDescription: req.body.categoryDescription,
                                      active: req.body.active
                                    },
                                    { new: true }
                            );
    if (!data) {
      response.failed("Category Not Found with the Update ID " + req.params.categoryId, res);
    } else {
      response.success("Category updated Successfully", res);
    }
  }catch(err){
    response.internalError(res);
  }
};
  

module.exports = {
  create,
  list,
  update
};
