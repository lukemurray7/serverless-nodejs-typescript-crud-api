const dayjs = require('dayjs');
const uuid = require('uuid/v4');

const randomTimeStamp = () => dayjs().subtract(Math.floor(Math.random() * 100) + 1, 'day').valueOf();
const randomSensor = () => ['garden', 'bathroom', 'kitchen', 'living', 'bedroom'][Math.floor(Math.random() * 5)]

const generateMockData = () => {
  const fakeData = [];
  for (i = 0; i < 100; i++) {
    const createdAt = randomTimeStamp();
    const sensor = randomSensor();
    const number = Math.floor(Math.random() * 1000) + 1;
    fakeData.push({
      createdAt,
      sensor,
      number,
      id: uuid(),
    });
  }
  return fakeData;
};

const fakeData = generateMockData();

module.exports.fakeData = fakeData;