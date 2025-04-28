async function sendit(event) {
  event.preventDefault();

  const userid = document.getElementById("userid");
  const password = document.getElementById("password");

  if (userid.value.trim() === "") {
    alert("아이디를 입력해주세요.");
    userid.focus();
    return false;
  }
  if (password.value.trim() === "") {
    alert("비밀번호를 입력해주세요.");
    password.focus();
    return false;
  }

  const loginData = {
    userid: userid.value,
    password: password.value,
  };

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    console.log("서버 응답:", data);

    if (response.ok) {
      const { token, userid } = data;

      if (token && userid) {
        localStorage.setItem("token", token);
        localStorage.setItem("userid", userid);

        alert("로그인 성공!");
        window.location.href = "index.html"; 
      } else {
        alert("아이디 혹은 비번이 틀렸습니다");
      }
    } else {
      alert(data.message || "로그인 실패");
    }
  } catch (error) {
    console.error("에러 발생:", error);
    alert("서버와 통신 중 문제가 발생했습니다.");
  }

  return false;
}
