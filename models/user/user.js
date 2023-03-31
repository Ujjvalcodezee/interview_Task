userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  token: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});

const userModal = mongoose.model("user", userSchema);
module.exports = userModal;
