/*
create table auth (
	idx int auto_increment primary key,
    userid varchar(20) unique not null,
    userpw varchar(20) not null,
    name varchar(20) not null,
    email  varchar(50) not null
);

create table todo (
    task_id int auto_increment primary key,
	  userid varchar(20) not null,
    list varchar(50) not null,
    createtime: datetime default now(),
    foreign key(userid) references auth(userid)
);
*/

let auth = [
  {
    userid: "apple",
    userpw: "11111111",
    name: "김사과",
    email: "apple@apple.com",
  },
  {
    userid: "banana",
    userpw: "22222222",
    name: "반하나",
    email: "banana@banana.com",
  },
  {
    userid: "orange",
    userpw: "33333333",
    name: "오렌지",
    email: "orange@orange.com",
  },
  {
    userid: "melon",
    userpw: "44444444",
    name: "이메론",
    email: "melon@melon.com",
  },
  {
    userid: "cherry",
    userpw: "55555555",
    name: "체애리",
    email: "cherry@cherry.com",
  },
];

let todo = [
  {
    task_id: "1",
    userid: "apple",
    task_list: "청소하기!",
    createtime: "now()",
  },
  {
    task_id: "2",
    userid: "apple",
    task_list: "공부하기!",
    createtime: "now()",
  },
  {
    task_id: "3",
    userid: "banana",
    task_list: "수영하기!",
    createtime: "now()",
  },
  {
    task_id: "4",
    userid: "orange",
    task_list: "운동하기!",
    createtime: "now()",
  },
  {
    task_id: "5",
    userid: "melon",
    task_list: "코딩하기!",
    createtime: "now()",
  },
  {
    task_id: "6",
    userid: "cherry",
    task_list: "알바하기!",
    createtime: "now()",
  },
  {
    task_id: "7",
    userid: "orange",
    task_list: "신나게 놀기!",
    createtime: "now()",
  },
  {
    task_id: "8",
    userid: "cherry",
    task_list: "수업듣기!",
    createtime: "now()",
  },
];

export async function getAllauth() {
  return auth;
}

export async function getAlltodo() {
  return todo;
}
export async function gettodoByUserid(userid) {
  return todo.filter((data) => data.userid === userid);
}
export async function getById(task_id) {
  return todo.find((data) => data.task_id === task_id);
}
export async function create(userid, task_list) {
  const new_todo = {
    task_id: Date.now().toString(),
    userid,
    task_list,
    createtime: Date.now().toString(),
  };
  todo = [new_todo, ...todo];
  return todo.filter((data) => data.userid === userid);
}
export async function updateTask(task_id, task_list) {
  const update_todo = todo.find((data) => data.task_id === task_id);
  if (update_todo) {
    update_todo.task_list = task_list;
    return update_todo;
  }
  throw new Error("수정할 데이터가 없습니다.");
}
export async function deleteTask(task_id) {
  const initialLength = todo.length;
  todo = todo.filter((data) => data.task_id !== task_id);
  if (todo.length === initialLength) {
    throw new Error("삭제할 데이터가 없습니다.");
  }
  return todo;
}
