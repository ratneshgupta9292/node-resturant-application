const FoodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

// CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    } = req.body;

    if (!title || !description || !price || !resturnat) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const newFood = new FoodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error,
    });
  }
};

//GET ALL fOODS
const getAllFoodController = async (req, res) => {
  try {

    const Food = await FoodModel.find({});


    //validation
    if (!Food) {
      return res.status(404).send({
        success: false,
        message: "No Food Availible",
      });
    }

    res.status(200).send({
      success: true,
      totalCount: Food.length,
      Food
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Get User API",
      error: error.message
    });
  }
};

//Delete Resturent
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    console.log(foodId)
    if (!foodId) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid restaurant ID",
      });
    }

    const deletedFood = await FoodModel.findByIdAndDelete(foodId);

    if (!deletedFood) {
      return res.status(404).send({
        success: false,
        message: "Foods not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Foods deleted successfully",
    });

  } catch (error) {
    console.error("Delete Foods Error:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting Foods",
      error: error.message,
    });
  }
};

//get All By IdFood Controller
const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    console.log(resturantId)
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await FoodModel.find({ resturnat: resturantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with htis id",
      });
    }
    res.status(200).send({
      success: true,
      message: "food base on restuatrn",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
};

//update Foods
const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    const updateData = req.body;

    if (!foodId) {
      return res.status(400).send({
        success: false,
        message: "Please provide a food ID",
      });
    }

    const updatedFood = await FoodModel.findByIdAndUpdate(
      foodId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedFood) {
      return res.status(404).send({
        success: false,
        message: "No food found with this ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "Food updated successfully",
      data: updatedFood,
    });

  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).send({
      success: false,
      message: "Error in update food API",
      error: error.message,
    });
  }
};

//Order Food

const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    console.log(cart)
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "please food cart or payemnt method",
      });
    }
    let total = 0;
    //cal
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order Placed successfully",
      newOrder,
    });

  } catch (error) {
    console.error("Error Order updating food:", error);
    res.status(500).send({
      success: false,
      message: "Error in otder update food API",
      error: error.message,
    });
  }

};


// CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    console.log(orderId)
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide valid Order id",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Order Status API",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  deleteFoodController,
  getFoodByResturantController,
  updateFoodController,
  placeOrderController,
  orderStatusController
}