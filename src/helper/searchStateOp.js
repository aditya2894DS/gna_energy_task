// function used for getting the final tour objects after filter
// it generates all the arrays of tour objects with the active filters and retursn the list of all common elements from all the generated arrays.
export const searchStateOp = (obj1, obj2) => {
  let nameArr = [];
  let temp = [];
  let fooArr = [];

  Object.keys(obj1).forEach((key) => {
    if (obj1[key].length > 0) {
      fooArr.push(obj1[key]);
    }
  });

  fooArr.forEach((arr) => {
    arr.forEach((el) => {
      temp.push(el);
    });
  });

  temp.forEach((obj) => nameArr.push(obj.title));

  const counts = {};
  nameArr.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });

  let i_arr = [];
  let i_max = 0
  Object.keys(counts).forEach(key => {
    i_arr.push(counts[key]);
    i_max = Math.max(...i_arr)
  })

  let resultTitles = []
  Object.keys(counts).forEach(key => {
    if(counts[key] === i_max){
        resultTitles.push(key)
    }
  })

  let resultObjs = [];
  resultTitles.forEach(title => {
    let i = obj2.filter(el => el.title === title);
    resultObjs.push(i[0])
  })

  return resultObjs;
};
