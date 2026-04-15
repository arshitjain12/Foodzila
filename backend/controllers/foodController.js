import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from "cloudinary"; 

const addFood = async (req, res) => {
  try {
    const { name, description, price, category, userId } = req.body;
     const image = req.file?.path;

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

    // ✅ Cloudinary se image delete karo
    // URL se public_id nikalna padega
    // URL hoti hai: https://res.cloudinary.com/dbz0lez8l/image/upload/v123456/foodzila/abcdef.jpg
    // Public ID hota hai: foodzila/abcdef
    const urlParts = food.image.split("/");
    const filename = urlParts[urlParts.length - 1].split(".")[0]; // abcdef
    const publicId = `foodzila/${filename}`;

    await cloudinary.uploader.destroy(publicId);

    await foodModel.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Food removed successfully" });
  } catch (err) {
    res.json({ success: false, message: "Error removing food" });
  }
};

export { addFood,listFood,removeFood  };
