import express from "express";

const port = 4000;
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./User";

const app = express();
app.use(bodyParser.json());

//이곳에 mongodb 사이트에서 카피한 주소를 이곳에 넣으면 된다.
const dbAddress = "mongodb://193.123.224.133:27017/admin";

mongoose
  .connect(dbAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello world!!!!"));

app.get("/user", (req, res) => {
  //회원가입을 할때 필요한것
  //post로 넘어온 데이터를 받아서 DB에 저장해준다

  const userInfo = new User({
    id: 3,
    name: "이상민1",
    content: "테스트2",
  });
  userInfo.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, userInfo });
  });
});
app.get("/find", (req, res) => {
  //회원가입을 할때 필요한것
  //post로 넘어온 데이터를 받아서 DB에 저장해준다
  User.find((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, userInfo });
  });
});
app.get("/userfind", async (req, res) => {
  //회원가입을 할때 필요한것
  //post로 넘어온 데이터를 받아서 DB에 저장해준다
  try {
    await User.findOneAndUpdate({ id: 3 },{name:"이상민 변경"},{new:false}, (err, userInfo) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true, userInfo });
    });
  } catch (err) {}
});

app.listen(port, () => console.log(`http://localhost:${port}`));

// $env:NODE_ENV="dev"; yarn dev
