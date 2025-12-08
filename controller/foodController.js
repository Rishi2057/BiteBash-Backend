// const { find } = require("../model/clientmodel");
const foods = require("../model/foodModel");


// add food
exports.addFoodController = async (req, res) => {
    const { picture, name, description, category, price, email, restuarent } = req.body
    console.log(picture, name, description, category, price, email, restuarent);

    const userMail = req.payload

    const picturePath = req.file.filename;

    console.log(`Attempting to add food: ${name} by user: ${userMail}`);

    try {
        const Newadditems = new foods({
            picture: picturePath, name, description, category, price, email: userMail, restuarent
        })

        await Newadditems.save()
        res.status(200).json(Newadditems)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get all foods
exports.getAllFoodController = async (req, res) => {
    const { search } = req.query
    console.log(search);



    try {
        const query = {
            name: {
                $regex: search, $options: "i"
            }

        }
        const allFoods = await foods.find(query)
        res.status(200).json(allFoods)
    } catch (error) {
        res.status(500).json(error)
    }
}

// foodlist client
exports.getFoodlistItemController = async (req, res) => {
    const userMail = req.payload
    try {
        const listitem = await foods.find({ email: userMail })
        res.status(200).json(listitem)
    } catch (error) {
        res.status(500).json(error)
    }
}

// deleet food controller

exports.deleteFoodController = async (req, res) => {
    const { id } = req.params
    try {
        const deleteItem = await foods.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteItem)
    } catch (error) {
        res.status(500).json(error)
    }
}

// foodmenu of client

exports.getHotelMenuController = async (req, res) => {
    const { itemData } = req.params;
    console.log(itemData);

    try {
        const getMenu = await foods.find({
            restuarent: { $regex: new RegExp(`^${itemData.trim()}$`, "i") },
        });

        // console.log(getMenu);
        res.status(200).json(getMenu);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json(error);
    }
};


