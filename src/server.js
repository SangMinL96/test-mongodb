import express from "express";

const port = 4000;
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./User";
import cors from "cors";
let corsOption = {
  origin: "http://localhost:3000", // 허락하는 요청 주소
  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};
const app = express();
app.use(bodyParser.json());
app.use(cors(corsOption));
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

app.post("/user/create", async (req, res) => {
  //회원가입을 할때 필요한것
  //post로 넘어온 데이터를 받아서 DB에 저장해준다
  const { name, age, address, hp, content } = req.body;
  try {
    const result = await User.insertMany({ name, age, address, hp, content });
    console.log(result);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err });
  }
});
app.get("/find", async (req, res) => {
  try {
    const result = await User.find().sort("-id");
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json({ success: true, result });
  } catch (err) {}
  //회원가입을 할때 필요한것
  //post로 넘어온 데이터를 받아서 DB에 저장해준다
});
app.post("/user/edit", async (req, res) => {
  const {_id,name,age,address,hp,content} = req.body;
  console.log(req.body);
  try {
    const result = await User.updateOne({_id}, {name,age,address,hp,content}, {
      new: false,
    });
    console.log(result);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err });
  }
});
app.post("/user/remove", async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  try {
    const result = await User.deleteMany({ _id: id });
    // console.log(result)
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err });
  }
});

app.listen(port, () => console.log(`http://localhost:${port}`));

// $env:NODE_ENV="dev"; yarn dev
