import { AttributeMap } from "aws-sdk/clients/dynamodb";

export interface CreateInput {
  number: number
  sensor: string
}

export interface Message {
  tableName: string
  deletedAt: string
  item: AttributeMap
}

export interface UpdateInput {
  id: string
  createdAt?: string
  number?: number
  sensor?: string
}

export interface SensorData extends CreateInput {
  readonly id?: string
  createdAt?: string
}

export interface ErrorObject {
  message: string,
  statusCode: number,
};
