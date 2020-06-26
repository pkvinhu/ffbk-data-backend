module.exports = FFBK_Dashboard = {
  getMonthlyGiving: rows => {
    let sorted = [];
    for (let i = 1; i < rows.length; i++) {
      let line = rows[i];
      let obj = line.reduce((acc, c, ind) => {
        acc[rows[0][ind]] = c;
        return acc;
      }, {});
      sorted.push(obj);
    }
    return sorted;
  },
  getBudgetBreakdown: rows => {
    let monthly_breakdown = {};
    let fields = rows[0];
    for (let i = 1; i < rows.length; i++) {
      let line = rows[i];
      if (!monthly_breakdown[line[0]]) {
        // and month cell does not already exist in monthly_breakdown
        monthly_breakdown[line[0]] = {
          [line[2]]: [
            {
              [fields[1]]: line[1],
              [fields[3]]: line[3],
              [fields[4]]: line[4]
            }
          ]
        };
      } else {
        // month cell exists
        if (!monthly_breakdown[line[0]][line[2]]) {
          // but category does not exist
          monthly_breakdown[line[0]][line[2]] = [
            {
              [fields[1]]: line[1],
              [fields[3]]: line[3],
              [fields[4]]: line[4]
            }
          ];
        } else {
          // and category does exist
          monthly_breakdown[line[0]][line[2]].push({
            [fields[1]]: line[1],
            [fields[3]]: line[3],
            [fields[4]]: line[4]
          });
        }
      }
    }
    return monthly_breakdown;
  }
};
