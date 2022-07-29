import mongoose from 'mongoose';

export const ResourcesTypesSchema = new mongoose.Schema({
  name: {
    type: String
  }
});
