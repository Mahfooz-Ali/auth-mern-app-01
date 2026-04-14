const ensureAuthenticated = require('../Middlewares/Auth.js');

const router = require('express').Router();


router.get('/',ensureAuthenticated,(req, res)=>{
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "TV",
            price: 25000
        }
    ])

});

module.exports = router;