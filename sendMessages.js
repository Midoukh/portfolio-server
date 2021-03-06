require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

//cors
app.use(cors());
app.options("*", cors());
app.use(express.json());

//"use strict";
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.get("/", (req, res) => {
  res.send("<h1>Portfolio Back-end.</h1>");
});
app.post("/api/box", (req, res) => {
  console.log(req.body);
  try {
    //send Message
    if (req.body) {
      sendEmail(req.body);
      res.status(200).json({
        status: "success",
        message: "Message successfully sent",
        data: {
          data: req.data,
        },
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "Failure",
      message: "Something went wrong",
    });
  }
});
const sendEmail = async (body) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.ahmedkhelili.dev",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "midou43@ahmedkhelili.dev", // generated ethereal user
      pass: "siliconvalley2020", // generated ethereal password
    },
  });

  try {
    console.log("sending message");

    // send mail with defined transport object
    const output = ` 
        <h1>sent by: ${body.email}</h1>
        <h3>subject: ${body.subject}</h3>
        <p>message: ${body.message}</p>

      `;
    let info = await transporter.sendMail({
      from: body.email, // sender address
      to: "midou43@ahmedkhelili.dev", // list of receivers
      subject: body.subject, // Subject line
      text: body.message, // plain text body
      html: output,
    });

    console.log("Message sent: %s", info.messageId);
    console.log(info);
    return true;
  } catch (error) {
    console.log("*******", error);
    return false;
  }
};

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running at port ", process.env.PORT || 3000);
});

// async..await is not allowed in global scope, must use a wrapper
