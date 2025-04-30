let allTodos = [];

window.onload = async function () {
  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("token");

  if (!userid || !token) {
    alert("로그인이 필요합니다.");
    window.location.href = "index.html";
    return;
  }

  try {
    const res = await fetch(`/mysql?userid=${userid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("할 일 목록을 불러오지 못했습니다.");

    const data = await res.json();
    allTodos = data; // <-- 전체 목록 저장
    renderTodoList(allTodos);
  } catch (err) {
    console.error(err);
    alert("에러가 발생했습니다.");
  }
};

function appendTodo(id, task) {
  const li = document.createElement("li");
  li.id = id;
  li.innerHTML = `<p>${task} <button onclick="fixTodo('${id}', '${task}')">수정</button> <button onclick="delTodo('${id}')">삭제</button></p>`;
  document.getElementById("todolist").appendChild(li);
}
function renderTodoList(list) {
  const todolist = document.getElementById("todolist");
  const noResults = document.getElementById("no-results");
  todolist.innerHTML = "";

  if (list.length === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
    list.forEach((todo) => {
      appendTodo(todo.task_id, todo.task_list);
    });
  }
}
function searchTodo() {
  const keyword = document
    .getElementById("searchbox")
    .value.trim()
    .toLowerCase();
  const filtered = allTodos.filter((todo) =>
    todo.task_list.toLowerCase().includes(keyword)
  );
  renderTodoList(filtered);
}
async function addTodo() {
  const input = document.getElementById("inputbox");
  const task_list = input.value;
  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("token");

  if (!task_list || !userid || !token) return;

  try {
    const res = await fetch("/mysql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userid, task_list }),
    });

    const data = await res.json();
    allTodos = data; // 업데이트된 전체 목록 저장
    renderTodoList(allTodos);

    input.value = "";
  } catch (err) {
    console.error(err);
    alert("추가 실패");
  }
}

function fixTodo(id, currentTask) {
  const li = document.getElementById(id);
  li.innerHTML = `
    <input type="text" id="fixinput-${id}" value="${currentTask}" />
    <button onclick="saveTodo('${id}')">저장</button>
  `;
}

async function saveTodo(id) {
  const task_list = document.getElementById(`fixinput-${id}`).value;
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`/mysql/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ task_list }),
    });

    const updated = await res.json();

    // allTodos에서 해당 항목 업데이트
    allTodos = allTodos.map((todo) => (todo.task_id === id ? updated : todo));

    renderTodoList(allTodos);
  } catch (err) {
    console.error(err);
    alert("수정 실패");
  }
}

async function delTodo(id) {
  const token = localStorage.getItem("token");

  try {
    await fetch(`/mysql/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    allTodos = allTodos.filter((todo) => todo.task_id !== id);
    renderTodoList(allTodos);
  } catch (err) {
    console.error(err);
    alert("삭제 실패");
  }
}
