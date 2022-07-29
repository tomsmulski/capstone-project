import mongoose from 'mongoose';

export const UserCitysSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  userId: {
    type: String
  },
  currentResources: [	
    {
      type: Object,
    },
  ],
  currentBuildings: [	
    {
      type: Object,
    },
  ]

});



  