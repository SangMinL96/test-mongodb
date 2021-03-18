import mongoose from "mongoose"
const userSchema = new mongoose.Schema([{
  name: String,
  age:Number,
  address:String,
  hp:Number,
  content:String
}]);
export default mongoose.model('User', userSchema);