const ResturentModel = require("../models/ResturentModel");

// GET USER INFGO
const createResturantController = async (req, res) => {
    try {
        const resturentData = req.body;

        // Optional: Manual required field check (in case you want more control)
        if (!resturentData.title) {
            return res.status(400).send({
                success: false,
                message: "Restaurant title is required",
            });
        }

        // Create and save new restaurant
        const resturent = new ResturentModel(resturentData);
        const savedResturent = await resturent.save();

        // Response
        res.status(201).send({
            success: true,
            message: "Restaurant Created Successfully",
            data: savedResturent,
        });

    } catch (error) {
        console.error("Create Restaurant Error:", error);
        res.status(500).send({
            success: false,
            message: "Error in Create Restaurant API",
            error: error.message,
        });
    }
};


const getAllResturantController = async (req, res) => {
    try {

        const resturants = await ResturentModel.find({});


        //validation
        if (!resturants) {
            return res.status(404).send({
                success: false,
                message: "No Resturant Availible",
            });
        }

        res.status(200).send({
            success: true,
            totalCount: resturants.length,
            resturants
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

const getAllByResturantController = async (req, res) => {
    try {
        const resturants = await ResturentModel.findById({ _id: req.params.id });
        //validation
        if (!resturants) {
            return res.status(404).send({
                success: false,
                 message: "Error In Get ALL Resturat API",
            });
        }

        res.status(200).send({
            success: true,
            totalCount: resturants.length,
            resturants
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror in Get Resturent API",
            error: error.message
        });
    }
};
//DElete Resturent
const deleteResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
console.log(resturantId)
    if (!resturantId) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid restaurant ID",
      });
    }

    const deletedResturant = await ResturentModel.findByIdAndDelete(resturantId);

    if (!deletedResturant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully",
      data: deletedResturant,
    });

  } catch (error) {
    console.error("Delete Restaurant Error:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting restaurant",
      error: error.message,
    });
  }
};



module.exports = {
    createResturantController,
    getAllResturantController,
    getAllByResturantController,
    deleteResturantController,
    // resetPasswordController,
    // deleteProfileController
}