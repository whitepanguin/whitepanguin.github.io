/*
create table auth (
	idx int auto_increment primary key,
    userid varchar(20) unique not null,
    userpw varchar(20) not null,
    name varchar(20) not null,
    email  varchar(50) not null
);

create table todo (
	idx int,
    list varchar(50) not null,
    foreign key(idx) references member(idx)
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
    idx: "1",
    list: "청소하기!",
  },
  {
    idx: "1",
    list: "공부하기!",
  },
  {
    idx: "2",
    list: "수영하기!",
  },
  {
    idx: "3",
    list: "운동하기!",
  },
  {
    idx: "4",
    list: "코딩하기!",
  },
  {
    idx: "5",
    list: "알바하기!",
  },
  {
    idx: "3",
    list: "신나게 놀기!",
  },
  {
    idx: "5",
    list: "수업듣기!",
  },
];
