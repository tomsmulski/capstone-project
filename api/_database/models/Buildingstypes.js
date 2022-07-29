import mongoose from 'mongoose';
import {ResourcesTypesSchema} from './Resourcestypes';

mongoose.model('ResourcesType', ResourcesTypesSchema, 'resourcestypes');

export const BuildingsTypesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  buildMaterials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ResourcesType',
    },
  ],
  productionMaterials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ResourcesType',
    },
  ],
  description: {
    type: String,
  },
});
