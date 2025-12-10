import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  try {
    const { name, description, price, category, userId } = req.body;
    const image = req.file?.filename;

    if (!name || !description || !price || !category || !image) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image,
      userId,
    });

    await food.save();

    return res.json({
      success: true,
      message: "Food added successfully",
    });
  } catch (err) {
    console.error("Add food error:", err);
    return res.json({
      success: false,
      message: "Error adding food",
    });
  }
};
const listFood = async (req, res) => {

  try{
    const food = await foodModel.find({});
    res.json({success:true,data:food})
  }catch(err){
    console.error("List food error:", err);
    return res.json({
      success: false,
      message: "Error listing food",
    });
  }
}
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    fs.unlink(`./uploads/${food.image}`, (err) => {
      if (err) console.log("Image delete error:", err);
    });

    await foodModel.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "food removed successfully" });
  } catch (err) {
    res.json({ success: false, message: "Error removing food" });
  }
};

export { addFood,listFood,removeFood  };
