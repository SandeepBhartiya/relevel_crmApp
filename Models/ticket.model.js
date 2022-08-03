const mongoose = require("mongoose");
const constant = require("../Utils/constant");

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
      default: constant.ticketStatus.open,
      enum: [
        constant.ticketStatus.open,
        constant.ticketStatus.blocked,
        constant.ticketStatus.closed,
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