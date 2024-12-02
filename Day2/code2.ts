import * as fs from "fs";
import * as path from "path"

/**
 * HELPERS
 */

const subsequenceSafe = (seq: number[]) => {
  const subseqs = seq.map((_item, index) => {
    const sub = [...seq]
    sub.splice(index, 1)
    return sub
  });
//   console.log(subseqs)

  return subseqs.some(sequenceSafe);
};

const sequenceSafe = (seq: number[]) => {
  // Early bail out
  if (seq[0] === seq[1]) {
    return false;
  }

  const increasing = seq[0] < seq[1];

  for (let i = 0; i < seq.length - 1; i++) {
    /**
     * 3. Check increasing or decreasing logic
     */
    if (
      (seq[i + 1] <= seq[i] && increasing) ||
      (seq[i + 1] >= seq[i] && !increasing)
    ) {
      return false;
    }

    /**
     * 4. Check differences
     */
    const diff = Math.abs(seq[i + 1] - seq[i]);
    if (diff < 1 || diff > 3) {
      return false;
    }
  }

  return true;
};

/**
 * Challenge
 */


fs.readFile(path.resolve(__dirname, "./input.txt"), "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }


  const lines = data.trim()
    .split(/\r?\n/)
    .map((item) => item.split(/\s+/).map((innerItem) => parseInt(innerItem)));
    

  const safe = lines.reduce((acc, curr, index) => {
    if (sequenceSafe(curr)) {
      return acc + 1;
    } else if (subsequenceSafe(curr)) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  console.log("Final Safe: ", safe);
});
