document.addEventListener("DOMContentLoaded", async () => {
  const div = document.getElementById("posts");

  const token = localStorage.getItem("token");
  try {
    const response = await fetch("/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      div.innerHTML = "";
      data.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.innerHTML = `
            <img src="${post.url}" alt="${post.name}" width="50" height="50" />
            <h3>${post.name} (@${post.userid})</h3>
            <p>${post.text}</p>
            <small>${new Date(Number(post.createdAt)).toLocaleString()}</small>
            <hr />
          `;
        div.appendChild(postElement);
      });
    } else {
      alert(data.message || "로그인 실패");
    }
  } catch (error) {
    console.error("에러 발생:", error);
    alert("서버와 통신 중 문제가 발생했습니다.");
  }
});
