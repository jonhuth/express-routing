const express = require("express");
const ExpressError = require("./expressError");
const { mean, median, mode } = require("./helpers");

const app = express();

app.use(express.json());

app.get("/mean", function(req, res, next) {
  let nums = req.query.nums;
  try {
    if (!nums) throw new ExpressError("nums are required", 400);
    nums = nums.split(',').map(num => +num);
    if (nums.includes(NaN)) throw new ExpressError("input includes NaN", 400);

    let result = mean(nums);
    return res.json( {response: {
      operation: "mean",
      value: result
    }})
  } catch (err) {
    return next(err);
  }
    
})

app.get("/median", function(req, res, next) {
  try {
    let nums = req.query.nums;
    if (!nums) throw new ExpressError("nums are required", 400);
    nums = nums.split(',').map(num => +num);
    if (nums.includes(NaN)) throw new ExpressError("input includes NaN", 400);

    let result = median(nums);
    return res.json( {response: {
      operation: "median",
      value: result
    }})
  } catch (err) {
    return next(err);
  }
})
app.get("/mode", function(req, res, next) {
  try {
    let nums = req.query.nums;
    if (!nums) throw new ExpressError("nums are required", 400);
    nums = nums.split(',').map(num => +num);
    if (nums.includes(NaN)) throw new ExpressError("input includes NaN", 400);
    
    let result = mode(nums);

    return res.json( {response: {
      operation: "mode",
      value: result
    }})
  } catch(err) {
    return next(err);
  }
})

app.get("/all", function(req, res, next) {
  try {
    let nums = req.query.nums;
    if (!nums) throw new ExpressError("nums are required", 400);
    nums = nums.split(',').map(num => +num);
    if (nums.includes(NaN)) throw new ExpressError("input includes NaN", 400);

    return res.json( {response: {
      operation: "mode",
      mean: mean(nums),
      median: median(nums),
      mode: mode(nums)
    }})
  } catch(err) {
    return next(err);
  }
})



app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status }
  });
});

app.listen(3000, function() {
  console.log("App on port 3000");
})