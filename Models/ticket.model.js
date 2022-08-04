const mongoose = require("mongoose");
const constants = require("../Utils/constant");

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ticketPriority: {
      type: Number,
      required: true,
      default: 4,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: constants.ticketStatus.open,
      enum: [
        constants.ticketStatus.open,
        constants.ticketStatus.blocked,
        constants.ticketStatus.closed,
      ],
    },
    reporter: {
      type: String,
      required: true,
    },
    assignee: {
      type: String,
    },
    createAt: {
      type: Date,
      immutabel: true,
      default: () => {
        return Date.now();
      },
    },
    updateAt: {
      type: Date,
      default: () => {
        return Date.now();
      },
    },
  },
  { versionKey: false }
);


module.exports=mongoose.model("Ticket",ticketSchema)