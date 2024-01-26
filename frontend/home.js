async function loginWithGitHub() {
  try {
      window.location.href = "https://github.com/login/oauth/authorize?client_id=1660a04ca66359291538"
  } catch (error) {
    console.log(error);
  }
}
