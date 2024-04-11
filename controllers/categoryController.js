import slugify from "slugify"
import categorymodel from "../models/categorymodel.js"

export const createCategoryController = async(req, res) =>{
try{
    const {name} = req.body
    if(!name) {
        return res.status(401).send({message :'Name is required'})
    }
    const existingCategory = await categorymodel.findOne({name})

    if(existingCategory) {
        res.status(200).send({
            success: true,
            message : "Category already exists"

    })
}
const category = await new categorymodel({name, slug:slugify(name)}).save()
res.status(200).send({
    success: true,
    message : "Category added successfully"
})

} catch(error){
    console.log(error)
    res.status(500).send({
        success: false,
        error,
        message: "Error creating category"
    })
}
}


//update category
export const updateCategoryController = async(req, res) => {
try{

    const {name} = req.body
    const {id} = req.params
    const category = await categorymodel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})

    res.status(200).send({
        success: true,
        message: "category updated successfully",
        category,
    })

} catch(error){
    console.log(error)
    res.status(404).send({
        success: false,
        error,
        message: "Error updating category",
    })
}
}

//categories controller

export const categoryController = async(req, res) =>{
try{

    const category = await categorymodel.find({});
     res.status(200).send({
        success: true,
        message: "Getting All categories",
        category,
    })

}catch(error){
    console.log(error)
    res.status(500).send({
        success: false,
        error,
        message: "Error in fetching categories",
    })
}
}

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Getting Single Category SUccessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await categorymodel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};