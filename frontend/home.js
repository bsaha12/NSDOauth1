async function loginWithGitHub() {
  try {
    const res = await fetch(
      "https://github.com/login/oauth/authorize?client_id=9ded9dd55a8f77452b4b"
    );
    window.location.href = res.url;
  } catch (error) {
    console.log(error);
  }
}