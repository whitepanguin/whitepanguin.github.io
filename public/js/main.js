
function isLoggedIn() {
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");
  return token && userid;
}


function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
  alert("로그아웃 되었습니다!");
  window.location.href = "index.html"; 
}


document.addEventListener("DOMContentLoaded", () => {
  const loginStatus = document.getElementById("login-status");
  const logoutBtn = document.getElementById("logout-btn");
  const loginMenu = document.getElementById("login-menu"); 

  const userid = localStorage.getItem("userid");

  if (isLoggedIn()) {

    if (loginStatus) loginStatus.textContent = `${userid}님 로그인 중입니다!`;
    if (logoutBtn) {
      logoutBtn.style.display = "inline-block";
      logoutBtn.addEventListener("click", logout);
    }
    if (loginMenu) {
      loginMenu.textContent = `${userid}님`;
      loginMenu.href = "#";
    }
  } else {
 
    if (loginStatus) loginStatus.textContent = "로그인 해주세요!";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (loginMenu) {
      loginMenu.textContent = "로그인";
      loginMenu.href = "login.html";
    }
  }
});
