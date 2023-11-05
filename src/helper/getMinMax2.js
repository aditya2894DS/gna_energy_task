// function used for getting minimum and maximum time durations for the tour

export const getMinMax2 = (arr, fullArr) => {
    let currentArray= fullArr;

    let minArr = [];
    let maxArr = [];

    let finalMinMaxArr = [];

    let finalArr = [];

    let myList = [];

    arr.map((obj) => {
      minArr.push(obj.min);
      maxArr.push(obj.max);
      finalMinMaxArr = minArr.concat(maxArr);
    });

    let minDur = Math.min(...finalMinMaxArr);
    let maxDur = Math.max(...finalMinMaxArr);

    // console.log([minDur, maxDur]);

    if (minDur !== Infinity || maxDur !== -Infinity) {
      myList = currentArray.filter(
        (obj) => obj.duration > minDur && obj.duration < maxDur
      );
    } else {
      myList = currentArray;
    }

    currentArray.map((obj) => {
      if (myList.includes(obj)) {
        finalArr.push(obj);
      }
    });
    // console.log(finalArr)
    return finalArr;
}