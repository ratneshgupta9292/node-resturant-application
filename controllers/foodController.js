const FoodModel = require("../models/foodModel");

// GET CREATE INFGO
const createFoodController = async (req, res) => {
    try {
        const foodData = req.body;
        // Optional: Manual required field check (in case you want more control)
        if (!foodData.title) {
            return res.status(400).send({
                success: false,
                message: "Restaurant title is required",
            });
        }

        // Create and save new restaurant
        const Food = new FoodModel(foodData);
        const savedFood = await Food.save();

        // Response
        res.status(201).send({
            success: true,
            message: "Food Created Successfully",
            data: savedFood,
        });

    } catch (error) {
        console.error("Create Food Error:", error);
        res.status(500).send({
            success: false,
            message: "Error in Create Food API",
            error: error.message,
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

// const getAllByResturantController = async (req, res) => {
//     try {
//         const resturants = await ResturentModel.findById({ _id: req.params.id });
//         //validation
//         if (!resturants) {
//             return res.status(404).send({
//                 success: false,
//                  message: "Error In Get ALL Resturat API",
//             });
//         }

//         res.status(200).send({
//             success: true,
//             totalCount: resturants.length,
//             resturants
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Eror in Get Resturent API",
//             error: error.message
//         });
//     }
// };
//DElete Resturent
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



module.exports = {
    createFoodController,
    getAllFoodController,
    deleteFoodController,
    // deleteResturantController,
    // // resetPasswordController,
    // // deleteProfileController
}