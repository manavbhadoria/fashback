const Razorpay  = require('razorpay');

const instance = new Razorpay({
  key_id: 'rzp_test_sZjCX5qKaBvtn2',
  key_secret: 'RII31o07PI8xAvwFfm8i4IJF',
});


module.exports.pay = ("/payment", async (req,res) => {
    const {amount} = req.body;

    try{
        const order = await instance.orders.create({
            amount : amount * 100,
            currency: "INR",
            receipt: "reciept"
        })
        res.status(201).json({
            success : true,
            order,
            amount,
        });
    }
    catch(err)
    {
        res.status(401).json("Invalid payment");
    }

})
