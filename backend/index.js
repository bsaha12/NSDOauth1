const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//callback url
app.get("/auth/github", async (req, res) => {
  const { code } = req.query;
  try {
    if (!code) {
      return res.redirect("https://jocular-taiyaki-48b18a.netlify.app");
    }
    let response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        code,
      }),
    });
    let data = await response.json();
    const { access_token } = data;
    res.redirect(
      `https://jocular-taiyaki-48b18a.netlify.app?access_token=${access_token}`
    );
  } catch (error) {
    console.log(error);
  }
});

// starting the server
app.listen(8080, () => {
  console.log("Server Started");
});

// res.redirect
