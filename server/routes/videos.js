const app = require('express');
const router = app.Router();


router.get('/upload', (req,res) =>{
	console.log(req.body)
	res.json({success: true})
});