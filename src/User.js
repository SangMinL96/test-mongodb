import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  content:String
});
export default mongoose.model('User', userSchema);