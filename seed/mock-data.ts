import dayjs from 'dayjs';
import uuid from 'uuid/v4';

import { SensorData } from "../interfaces";

const randomTimeStamp = (): string => dayjs().subtract(Math.floor(Math.random() * 100) + 1, 'day').valueOf().toString();
const randomSensor = (): string => ['garden', 'bathroom', 'kitchen', 'living', 'bedroom'][Math.floor(Math.random() * 5)]

const generateMockData = () => {
  const fakeData = [];
  for (let i = 0; i < 100; i++) {
    const createdAt = randomTimeStamp();
    const sensor = randomSensor();
    const number = Math.floor(Math.random() * 1000) + 1;

    const fakeSensorItem: SensorData = {
      createdAt,
      sensor,
      number,
      id: uuid(),
    };

    fakeData.push(fakeSensorItem);
  }
  return fakeData;
};

const fakeData: SensorData[] = generateMockData();

module.exports.fakeData = fakeData;