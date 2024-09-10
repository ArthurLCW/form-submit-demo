const express = require("express");
const multer = require("multer");
const app = express();
const PORT = 3000;

// 使用内置的JSON解析中间件
app.use(express.json());
// 使用内置的URL编码解析中间件
app.use(express.urlencoded({ extended: true }));

app.post("/submit-form/url-encoded", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;

  console.log(`Received name: ${name}, email: ${email}`);

  res.send("Form submitted successfully!");
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array("file", 2);

app.post("/upload", upload, (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("没有文件被上传。");
    }

    let str = "";
    req.files.forEach((file) => {
      console.log(`文件名: ${file.originalname}`);
      str += `文件名: ${file.originalname}` + ", ";
    });

    const text1 = req.body.text1;
    console.log(`输入的文本: ${text1 || "无输入"}`);
    str += `输入的文本: ${text1 || "无输入"}`;

    res.send(str);
  } catch (error) {
    console.error("处理文件上传时发生错误:", error);
    res.status(500).send("服务器内部错误");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
