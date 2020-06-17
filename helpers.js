function mean(nums) {
  let sum = 0;
  for (let num of nums) {
    sum += num;
  }
  return sum / nums.length;
}

function median(nums) {
  if (nums.length % 2) {
    return nums[Math.floor(nums.length / 2)];
  }
  return (nums[nums.length / 2] + nums[(nums.length / 2) - 1]) / 2;
}

function mode(nums) {
  let counts = makeCounts(nums);
  let mode = Number.MIN_VALUE;
  let highestCount = 0;
  for (let numKey in counts) {//set mode to key with highest count
    if (counts[numKey] > highestCount) {
      mode = +numKey;
      highestCount = counts[numKey];
    }
  }
  return mode;
}

function makeCounts(nums) {
  let counts = {};
  for (let num of nums) {
    if (num in counts) {
      counts[num] += 1;
    }
    else {
      counts[num] = 1;
    }
  }
  return counts;
}



module.exports = { mean, median, mode };