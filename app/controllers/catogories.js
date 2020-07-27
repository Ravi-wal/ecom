const Category = require("../models/categories");

const create = async (req, res) => {
  try{
    if(await Category.findOne({ CategoryName: {
        $regex : new RegExp(req.body.CategoryName, "i") } })){
      return res.status(422).json({
        status: false, 
        message: "Already registered with the CategoryName " + req.body.CategoryName
      });
    } else {
      await createCategory(req.body);
      res.status(200).json({ status: true, message: "Category created succesfully" });
    }
  } catch(err){
    return res.status(500).json({ status: false,  message: "Something went wrong" });
  }
};


function createCategory(details) {
  const category = new Category(details);
  category.save().catch(err => {
    throw err;
  });
}

const list = (req, res) => {
Category.find()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(400).json({ status: false, message: "Something went wrong" });
    });
};

const update = (req, res) => {
    Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        CategoryName: req.body.CategoryName,
        CategoryDescription: req.body.CategoryDescription,
        Active: req.body.Active
      },
      { new: true }
    )
      .then(data => {
        if (!data) {
          return res.status(404).json({
            success: false,
            message: "Category Not Found with the Update ID " + req.params.categoryId
          });
        }
        return res.status(200).json({success: true, message: "Category updated Successfully"});
      })
      .catch(err => {
        return res.status(500).json({
            success: false,
            message: "Some thing went wrong with the Update ID " + req.params.categoryId
        });
      });
  };
  

module.exports = {
  create,
  list,
  update
};
