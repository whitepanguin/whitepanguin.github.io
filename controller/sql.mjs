import { db } from "../db.mjs";
import * as dataRepository from "../data/sql.mjs";

/*
export async function getAuth(req, res, next) {
  try {
    const [rows] = await db.query("SELECT * FROM auth");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export async function getTodo(req, res, next) {
  try {
    const [rows] = await db.query("SELECT * FROM todo");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
*/
export async function getAuth(req, res, next) {
  const data = await dataRepository.getAllauth();
  res.status(200).json(data);
}

export async function getTodo(req, res, next) {
  const userid = req.query.userid;
  const data = await (userid
    ? dataRepository.gettodoByUserid(userid)
    : dataRepository.getAlltodo());
  res.status(200).json(data);
}
export async function getTodoId(req, res, next) {
  const task_id = req.params.task_id;
  const data = await dataRepository.getById(task_id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `${task_id}의 할 일이이 없습니다.` });
  }
}
export async function createTodo(req, res, next) {
  const { userid, task_list } = req.body;
  const data = await dataRepository.create(userid, task_list);
  res.status(201).json(data);
}
export async function updateTodo(req, res, next) {
  const { id } = req.params; // task_id
  const { task_list } = req.body;

  try {
    const updatedTask = await dataRepository.updateTask(id, task_list); // `updateTask` 메서드를 통해 task_id로 수정
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send("수정 실패");
  }
}
export async function deleteTodo(req, res, next) {
  const { id } = req.params; // task_id

  try {
    await dataRepository.deleteTask(id); // `deleteTask` 메서드를 통해 task_id로 삭제
    res.status(200).send("삭제 성공");
  } catch (err) {
    console.error(err);
    res.status(500).send("삭제 실패");
  }
}
