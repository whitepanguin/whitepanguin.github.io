window.onload = function () {
  if (localStorage.length != 0) {
    for (let i = 0; i < localStorage.length; i++) {
      const li = document.createElement("li");
      let key = localStorage.key(i);
      console.log(key);
      li.id = key;
      li.innerHTML = `<p>${key}<button onclick="fixTodo(${key})">수정</button><button onclick="delTodo(${key})">삭제</button><p>`;
      document.getElementById("todolist").appendChild(li);
    }
  }
};

function addTodo() {
  const inputbox = document.getElementById("inputbox").value;
  const li = document.createElement("li");

  localStorage.setItem(inputbox, inputbox);
  li.id = inputbox;
  li.innerHTML = `<p>${inputbox}<button onclick="fixTodo(${inputbox})">수정</button><button onclick="delTodo(${inputbox})">삭제</button><p>`;
  document.getElementById("todolist").appendChild(li);
}
function saveTodo() {
  const fixinput = document.getElementById("fixinput");
  const fixinputin = document.getElementById("fixinputin").value;
  fixinput.style.display = "none";
  const li = document.createElement("li");
  localStorage.setItem(fixinputin, fixinputin);
  li.id = fixinputin;
  li.innerHTML = `<p>${fixinputin}<button onclick="fixTodo(${fixinputin})">수정</button><button onclick="delTodo(${fixinputin})">삭제</button><p>`;
  document.getElementById("todolist").appendChild(li);
}

function fixTodo(e) {
  e.style.display = "none";
  localStorage.removeItem(e.id);
  const li = document.createElement("li");
  li.innerHTML = `<input type="text" id="fixinputin" /><button onclick="saveTodo()">저장</button>`;
  li.id = "fixinput";
  document.getElementById("todolist").appendChild(li);
}
function delTodo(e) {
  e.style.display = "none";
  localStorage.removeItem(e.id);
}
