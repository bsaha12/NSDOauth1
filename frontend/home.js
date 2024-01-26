const backendbaseurl = "http://localhost:8080";
const frontendurl = "https://jocular-taiyaki-48b18a.netlify.app";

const login = document.getElementById("login");
const userdata = document.getElementById("userdata");

let access_token = localStorage.getItem("access_token");
if (access_token) {
  // add user data to panel
  getUserData(access_token);
  login.classList.add("invisible");
  userdata.classList.remove("invisible");
} else {
  // if access token not present
  const url = new URL(window.location.href);
  access_token = url.searchParams.get("access_token");
  if (access_token) {
    localStorage.setItem("access_token", access_token);
    window.location.href = frontendurl;
  }
}

//get the user data with help of token
async function getUserData(access_token) {
  try {
    // const response = fetch(`${backendbaseurl}/getdata`)
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function loginWithGitHub() {
  try {
    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=1660a04ca66359291538";
  } catch (error) {
    console.log(error);
  }
}
