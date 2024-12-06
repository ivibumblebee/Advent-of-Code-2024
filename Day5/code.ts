import * as fs from "fs";
import * as path from "path";

fs.readFile(path.resolve(__dirname, "./input.txt"), "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.trim().split(/\r?\n/);

  const rulesEndIndex = lines.indexOf("");
  const rules = lines.slice(0, rulesEndIndex).map((rule) => rule.split("|"));
  const updates = lines
    .slice(rulesEndIndex + 1)
    .map((update) => update.split(","));

  const incorrectUpdates: string[][] = [];

  const middleSum = updates.reduce((sum, update) => {
    
    // const invalid = !followsRules(update, rules)
    const invalid = rules.some((rule) => {
      const index1 = update.indexOf(rule[0]);
      const index2 = update.indexOf(rule[1]);

      // Follows rule or rule does not apply
      if (index1 < 0 || index2 < 0 || index1 < index2) {
        return false;
      } else {
        return true;
      }
    });

    if (invalid) {
      incorrectUpdates.push(update);
      return sum;
    } else {
      return sum + parseInt(update[Math.floor(update.length / 2)]);
    }
  }, 0);

  console.log("Valid middle sum", middleSum);

  const fixedMiddleSum = incorrectUpdates.reduce((sum, update) => {
    const updateCopy = [...update];

    let issues = true;
    while (issues) {
      issues = false;
      // TODO: figure out how to fix the pages? start by switching them?
      for (const rule of rules) {
        const index1 = updateCopy.indexOf(rule[0]);
        const index2 = updateCopy.indexOf(rule[1]);

        if (index1 >= 0 && index2 >= 0 && index1 > index2) {
          issues = true;
          // switch items
          const temp = updateCopy[index1];
          updateCopy[index1] = updateCopy[index2];
          updateCopy[index2] = temp;
        }
      }
    }

    return sum + parseInt(updateCopy[Math.floor(updateCopy.length / 2)]);
  }, 0);


  console.log("Fixed middle sum", fixedMiddleSum);
});
