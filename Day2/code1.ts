import * as fs from "fs";
import * as path from "path"

fs.readFile(path.resolve(__dirname, "./input.txt"), "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }


  /**
   * 1. Parse into 2d array of numbers
   */

  const lines = data.trim()
    .split(/\r?\n/)
    .map((item) => item.split(/\s+/).map((innerItem) => parseInt(innerItem)));

  /**
   * 2. Set up reducer with logic for determining safe or unsage
   */


  const safe = lines.reduce((acc, curr) => {

    // Early bail out
    if (curr[0] === curr[1]) {
        return acc + 0; // Fail condition
    }

    const increasing = curr[0] < curr[1];

    for (let i = 0; i < curr.length - 1; i++) {
      /**
      * 3. Check increasing or decreasing logic
      */
      if (
        (curr[i + 1] <= curr[i] && increasing) ||
        (curr[i + 1] >= curr[i] && !increasing)
      ) {
        return acc + 0; // Fail condition
      }

      /**
      * 4. Check differences
      */
     const diff = Math.abs(curr[i + 1] - curr[i]);
      if (diff < 1 || diff > 3) {
        return acc + 0; // Fail condition
      }
    }

    return acc + 1; // Win condition
  }, 0);

  console.log('Safe: ', safe);


  /**
   * Part 2: If unsafe, generate all sub reports and check if any of those are safe
   */
});
