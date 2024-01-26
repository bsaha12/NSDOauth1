const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Home Page" });
});

// get data by exchanging the token
app.post("/getdata", async (req, res) => {
  const { access_token } = req.body;
  try {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await response.json();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.get("/auth/github", async (req, res) => {
  const { code } = req.query;
  try {
    let response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: "1660a04ca66359291538",
        client_secret: "0ea466abea00f945c4f3e89068f85263f6ccb873",
        code,
      }),
    });
    let data = await response.json();
    const { access_token } = data;
    res.redirect(
      `https://jocular-taiyaki-48b18a.netlify.app?access_token=${access_token}`
    );
  } catch (error) {
    res.redirect("https://jocular-taiyaki-48b18a.netlify.app");
  }
});
// starting the server
app.listen(8080, () => {
  console.log("Server Started");
});

// res.redirect
