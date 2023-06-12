const chooseRandom = (array, num) => {
    // deep copy stringify transform into Json, parse transform into object js
    const copyArray = JSON.parse(JSON.stringify(array))
    // if the array is short we display it entirely
    if(array.length <= num) return array
    // Loop over the array (array.length - num) times and delete an element of the copy of the array each time
    for (let i = 0; i < array.length - num; i++) {
        let randomIndex = Math.floor(Math.random() * copyArray.length)
        copyArray.splice(randomIndex,1)
    }
    return copyArray;
};

  export default chooseRandom;
