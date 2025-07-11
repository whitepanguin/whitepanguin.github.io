import * as authRepository from "../data/auth.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.mjs";

const secretKey = config.jwt.secretKey;
const bcryptSaltRounds = config.bcrypt.saltRounds;
const jwtExpiresInDays = config.jwt.expiresInSec;

async function createJwtToken(user) {
  return jwt.sign({ id: user.id, userid: user.userid }, secretKey, {
    expiresIn: jwtExpiresInDays,
  });
}

// 회원가입 put create
export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;
  // 회원 중복 체크
  const found = await authRepository.findByUserid(userid);
  if (found) {
    return res.status(409).json({ message: `${userid}이 이미 있습니다.` });
  }

  const hashed = bcrypt.hashSync(password, bcryptSaltRounds);

  const users = await authRepository.createUser(userid, hashed, name, email);

  const token = await createJwtToken(users);
  console.log(token);
  if (users) {
    res.status(201).json({ token, userid });
  } else {
    res.status(500).json({ message: "회원가입 실패" });
  }
}

// 로그인 post
export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.findByUserid(userid);
  if (!user) {
    return res.status(200).json(`${userid} 아이디를 찾을 수 없음`);
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "아이디 또는 비밀번호 확인" });
  }
  const token = await createJwtToken(user);
  res.status(200).json({ token, userid });
}

export async function verify(req, res, next) {
  const userid = req.userid;
  if (userid) {
    res.status(200).json(userid);
  } else {
    res.status(401).json({ message: "사용자 인증 실패" });
  }
}

export async function me(req, res, next) {
  const user = await authRepository.findByUserid(req.userid);
  if (!user) {
    return res.status(404).json({ message: "일치하는 사용자가 없음" });
  }
  res.status(200).json({ token: req.token, userid: user.userid });
}
