'use strict';

import mongoose from 'mongoose'; 

const treeSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
  },
  genus: {
    type: String,
    required: true,
    minlength: 10,
  },
  height: {
    type: String,
    required: false,
    minlength: 1,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
  /* TODO: insert the connecting property
 many/child: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'many/child', your many/child/sub model name goes here
    this will push the connecting property/references ids into an array
    }
  ],
  */
});

export default mongoose.model('tree', treeSchema);
