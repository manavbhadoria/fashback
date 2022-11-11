const { verifyTokenandAdmin, verifyToken } = require("../middleware/Auth");
const Product = require("../models/Product");

//create product post

module.exports.createproduct = (verifyTokenandAdmin, async (req,res) => {
    const newProduct = new Product(req.body)
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json("success!");
    }
    catch(err){
        res.status(500).json(err);
    }
})

//update product description
module.exports.updateproduct = (verifyTokenandAdmin, async (req,res) => {
    try{
        
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

//pagination of products

module.exports.paginate = (verifyToken, async(req,res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.seach || "";
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
		let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = "asc";
		}
		const products = await Product.find({ name: { $regex: search, $options: "i" } })
			.sort(sortBy)
			.skip(page * limit)
			.limit(limit);

		const total = await Product.countDocuments({
			name: { $regex: search, $options: "i" },
		});

		const response = {
			error: false,
			total,
			page: page + 1,
			limit,
			products,
		};

		res.status(200).json(response);
    }
    catch(error){
        res.status(400).send({success:false,msg:error.message});
    }
})



