import * as fs from "fs";
import * as path from "path"

fs.readFile(path.resolve(__dirname, "./input.txt"), "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  /**
   * 1. Extract valid pattern matches
   */

  let matches = data.match(/mul\(\d+,\d+\)/g);
  console.log(matches)

  /**
   * 2. Parse formulas and evaluate
   */

  const sumOfMultiples = matches?.reduce((sum, cur) => {
    const nums = cur.match(/\d+/g);
    console.log('nums: ', nums)
    if (!nums || nums.length != 2) {
        throw Error('Did not parse 2 numbers to multiply');
    }
    return sum + (parseInt(nums[0]) * parseInt(nums[1]))
  }, 0)

  console.log(sumOfMultiples)
});

console.log("hello world");
