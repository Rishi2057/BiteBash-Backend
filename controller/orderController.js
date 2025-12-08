const orders = require("../model/orderModel");

exports.addOrdersController = async (req, res) => {
  const { cartItems, fullName, houseNo, landmark, area, city, fullprice, restuarent } = req.body;
  const usermail = req.payload
  try {
    const newOrder = new orders({ email: usermail, cartItems, fullName, houseNo, landmark, area, city, fullprice, restuarent });

    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);

  } catch (error) {

    res.status(500).json(error);
  }
}

// get orders

exports.getMyOrdersController = async (req, res) => {
  userMail = req.payload
  try {
    const myOrder = await orders.find({ email: userMail })
    res.status(200).json(myOrder)
  } catch (error) {
    res.status(500).json(error);
  }
}

// get all orders
exports.getAllOrdersController = async (req,res)=>{
  try {
    const allOrders = await orders.find()
    res.status(200).json(allOrders)
  } catch (error) {
     res.status(500).json(error);
  }
}


// get orders client
exports.getClientOrdersController = async (req, res) => {
  const { restuaratName } = req.params
  console.log(restuaratName);

  try {
    console.log("inside try");
    
    const myOrder = await orders.find({ restuarent: restuaratName })
    console.log("find order");
    
    res.status(200).json(myOrder)
  } catch (error) {
    res.status(500).json(error);
  }
}


// update status
exports.updateStatusController = async (req, res) => {
  const { id,status } = req.params
  console.log(status);
  try {
    const statusUpdate = await orders.findByIdAndUpdate({_id:id},{ status }, { new: true })
    res.status(200).json(statusUpdate)
  } catch (error) {
    res.status(500).json("Incorrect Email")
  }

}

// get restuarant orders
exports.getResOrdersController = async (req, res) => {
  const {itemData} = req.params
  try {
    const resOrder = await orders.find({restuarent:itemData})
    res.status(200).json(resOrder)
  } catch (error) {
    res.status(500).json(error);
  }
}


// get past orders of client

exports.getPastOrdersController = async (req,res)=>{

  const userMail = req.payload
  console.log(userMail);
  

  try {
    const pastOrder = await orders.find({email:userMail})
    res.status(200).json(pastOrder)
  } catch (error) {
    res.status(500).json(error)
  }
}

// get user orders adminside
exports.getUserOrdersAdminController = async (req, res) => {
  const {itemData} = req.params
  console.log(itemData);
  
  try {
    const myOrder = await orders.find({ email: itemData })
    res.status(200).json(myOrder)
  } catch (error) {
    res.status(500).json(error);
  }
}

exports.getWeeklyOrders = async (req, res) => {
  try {
    const weekly = await orders.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            week: { $week: "$date" }
          },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } }
    ]);

    res.json(weekly);
  } catch (err) {
    res.status(500).json(err);
  }
};
