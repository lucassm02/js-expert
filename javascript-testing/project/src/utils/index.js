const getRandomIndexFromArray = (array) => {
  return Math.floor(Math.random() * array.length);
};

const getRandomItemFromArray = (array) => {
  const index = getRandomIndexFromArray(array);
  return array[index];
};

module.exports = { getRandomIndexFromArray, getRandomItemFromArray };
