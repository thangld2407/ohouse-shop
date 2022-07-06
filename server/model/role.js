const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  permissions: {
    type: Array,
    default: [],
  },
  is_default: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Role", roleSchema);
