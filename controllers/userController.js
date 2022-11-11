const { verifyToken, verifyTokenAndAdmin } = require("../middleware/Auth");
const User = require("../models/User");

//deleting a user 

module.exports.deleteuser = ("/:id", verifyToken, async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    }
    catch(err){
        res.status(500).json("error");
    }
});

//getting all users
module.exports.getuser = ("/getuser", verifyTokenAndAdmin, async (req,res) => {
    const query = req.query.new;
    try{
        const user = query ? await User.find().limit(5) : await User.find(req.params.id);

        res.status(200).json(user);
    }
    catch(err){
        console.log(err);
    }
});