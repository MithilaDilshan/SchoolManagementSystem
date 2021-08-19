//advanced part
//additional theory goes here
//complex error handling

const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = {...err };
    /*It's called spread attributes and its aim is to make the passing of props easier.

        Let us imagine that you have a component that accepts N number of properties. Passing these down can be tedious and unwieldy if the number grows.
        
        <Component x={} y={} z={} />
        Thus instead you do this, wrap them up in an object and use the spread notation
        
        var props = { x: 1, y: 1, z:1 };
        <Component {...props} /> */

    error.message = err.message;

    if (err.code === 11000) {
        const message = "Duplicate Field Value Enter ";
        error = new ErrorResponse(message, 400);
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    })

}

module.exports = errorHandler;