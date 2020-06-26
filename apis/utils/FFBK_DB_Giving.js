module.exports = FFBK_DB_Giving = {
  sortMasterSheet: rows => {
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
  getStatus: rows => {
    let transformed = {};
    let fields = rows[0];
    //console.log("ALL ROWS: ", rows);
    for (let i = 1; i < rows.length; i++) {
      let line = rows[i];
      //console.log("LINE: ", line);
      for (let j = 0; j < line.length; j++) {
        let val = line[j];
        //console.log("VALUE: ", val)
        if (!j) {
          transformed[val] = {};
        } else {
          if (fields[j]) {
            if (j < 3) {
              transformed[line[0]][fields[j]] = val || "";
            } else {
              transformed[line[0]][fields[j]].percentage = val || "";
            }
          } else {
            transformed[line[0]][fields[j + 1]] = { people_count: val || "" };
          }
        }
      }
    }
    return transformed;
  },
  getInvolvement: rows => {
    let transformed = {};
    let fields = rows[0];
    //console.log("ALL ROWS: ", rows);
    for (let i = 1; i < rows.length; i++) {
      let line = rows[i];
      //console.log("LINE: ", line);
      for (let j = 0; j < line.length; j++) {
        let val = line[j];
        //console.log("VALUE: ", val)
        if (!j) {
          transformed[val] = {};
        } else {
          if (fields[j]) {
            if (j < 3) {
              transformed[line[0]][fields[j]] = val || "";
            } else {
              transformed[line[0]][fields[j]].percentage = val || "";
            }
          } else {
            if (j == 1) {
                transformed[line[0]]['# People'] = val;
            } else if (j == 2) {
                transformed[line[0]]['% People'] = val;
            } else {
              transformed[line[0]][fields[j + 1]] = { people_count: val || "" };
            }
          }
        }
      }
    }
    return transformed;
  }
};
