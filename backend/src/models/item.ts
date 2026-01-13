import { Schema, model } from 'mongoose';

const itemSchema = new Schema({
  name: { type: String, required: true },
  bought: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: Date.now() }
});

export const ItemModel = model('Item', itemSchema, 'items');