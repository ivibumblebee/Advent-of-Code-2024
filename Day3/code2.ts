import * as fs from "fs";
import * as path from "path"

fs.readFile(path.resolve(__dirname, "./input.txt"), "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  /**
   * 1. Remove anything between a dont() and do()
   * - get index of dont() and do()?
   */

  let keepTrying = true;
  let currentString = data;
  
  while (keepTrying) {
    const matchDont =  currentString.match(/don't\(\)/);
    
    if (matchDont?.index !== undefined) {
      // check for first do() after don't()
      const matchDo =  currentString.slice(matchDont.index+7).match(/do\(\)/);

      if (matchDo?.index) {
        // remove string up to next do
        let tempArray = currentString.split('');
        tempArray.splice(matchDont.index, matchDo.index+4)
        currentString = tempArray.join('')
      }
      else {
        // remove rest of the string
        currentString = currentString.slice(0, matchDont.index)
      }
    } else {
      keepTrying = false;
    }
    
  }




  /**
   * 2. Extract valid pattern matches
   */

  let matches = currentString.match(/mul\(\d+,\d+\)/g);

  /**
   * 3. Parse formulas and evaluate
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
