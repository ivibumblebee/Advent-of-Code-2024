import * as fs from "fs";
import * as path from "path"

fs.readFile(path.resolve(__dirname, "./input.txt"), "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  /**
   * 1. parse data into 2 arrays
   */

  const arrays = data.trim().split(/\s+/);
  const data1: number[] = [];
  const data2: number[] = [];
  arrays.forEach((item, index) =>
    index % 2 == 0 ? data1.push(parseInt(item)) : data2.push(parseInt(item))
  );

  /**
   * 2. Order arrays smallest to largest
   */

  data1.sort();
  data2.sort();

  /**
   * 2. Find and sum up differences
  */
  
    const differenceTotal = data1.reduce(
      (acc, curr, index) => acc + Math.abs(curr - data2[index]),
      0
    );
  
  console.log("Difference: ", differenceTotal);
  
  /**
   * 3. Make incidence map for data2
   */

  const incidenceMap = data2.reduce((acc, curr) => {
    const count = acc.get(curr);
    return acc.set(curr, count ? count + 1 : 1);
  }, new Map<number, number>());


  const incidenceTotal = data1.reduce(
    (acc, curr) => acc + curr * (incidenceMap.get(curr) ?? 0),
    0
  );
  console.log("Incidence: ", incidenceTotal);
});
