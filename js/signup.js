function sendit() {
  const userid = document.getElementById("userid");
  const userpw = document.getElementById("userpw");
  const userpw_re = document.getElementById("userpw_re");
  const email = document.getElementById("email");
  const username = document.getElementById("username");
  const hp = document.getElementById("hp");
  const ssn1 = document.getElementById("ssn1");
  const ssn2 = document.getElementById("ssn2");

  const expIdText = /^[A-Za-z0-9]{4,20}$/;
  const expPwText =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
  const expEmailText = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  const expuserNameText = /^[가-힣]+$/;
  const expHpText = /^\d{3}-\d{3,4}-\d{4}$/;
  const expSsn1Text = /^\d{6}$/;
  const expSsn2Text = /^\d{7}$/;

  if (userid.value === "") {
    alert("아이디를 입력해주세요.");
    userid.focus();
    return false;
  }
  if (userpw.value === "") {
    alert("비밀번호를 입력해주세요.");
    userpw.focus();
    return false;
  }
  if (userpw_re.value === "") {
    alert("비밀번호 확인을 입력해주세요.");
    userpw_re.focus();
    return false;
  }
  if (email.value === "") {
    alert("이메일을 입력해주세요.");
    email.focus();
    return false;
  }
  if (username.value === "") {
    alert("이름을 입력해주세요.");
    username.focus();
    return false;
  }
  if (ssn1.value === "") {
    alert("주민등록 앞 번호를 입력해주세요.");
    ssn1.focus();
    return false;
  }
  if (ssn2.value === "") {
    alert("주민등록 뒤 번호를 입력해주세요.");
    ssn2.focus();
    return false;
  }
  if (hp.value === "") {
    alert("전화번호를 입력해주세요.");
    hp.focus();
    return false;
  }

  if (!expIdText.test(userid.value)) {
    alert("아이디는 4자 이상 20자 이하의 영문자 및 숫자로 입력하세요.");
    userid.focus();
    return false;
  }

  if (!expPwText.test(userpw.value)) {
    alert(
      "비밀번호는 8자이상 20자이하의 영문자, 숫자, 특수문자를 한 자 이상 꼭 포함해야합니다."
    );
    userpw.focus();
    return false;
  }

  if (userpw.value != userpw_re.value) {
    alert("비밀번호와 비밀번호 확인이 일치하지 않습니다");
    userpw_re.focus();
    return false;
  }

  if (!expEmailText.test(email.value)) {
    alert("이메일 확인해주세요");
    email.focus();
    return false;
  }

  if (!expuserNameText.test(username.value)) {
    alert("이름은 한글로 입력하세요");
    username.focus();
    return false;
  }

  if (!expSsn1Text.test(ssn1.value)) {
    alert("주민등록번호 확인 해주세요");
    ssn1.focus();
    return false;
  }
  if (!expSsn2Text.test(ssn2.value)) {
    alert("주민등록번호 확인 해주세요");
    ssn2.focus();
    return false;
  }
  if (!expHpText.test(hp.value)) {
    alert("휴대폰번호 형식이 일치하지 않습니다. \n-하이픈을 꼭 입력하세요!");
    hp.focus();
    return false;
  }

  return true;
}
function ssnCheck() {
  const ssn1 = document.getElementById("ssn1");
  const ssn2 = document.getElementById("ssn2");

  const expSsn1Text = /^\d{6}$/;
  const expSsn2Text = /^\d{7}$/;
  if (ssn1.value === "") {
    alert("주민등록번호를 입력해주세요.");
    ssn1.focus();
    return false;
  }
  if (ssn2.value === "") {
    alert("주민등록번호를 입력해주세요.");
    ssn2.focus();
    return false;
  }
  if (!expSsn1Text.test(ssn1.value)) {
    alert("주민등록번호 확인 해주세요");
    ssn1.focus();
  }
  if (!expSsn2Text.test(ssn2.value)) {
    alert("주민등록번호 확인 해주세요");
    ssn1.focus();
  }
  let check1 = [];
  let check2 = [];
  let total = 0;
  check1 = ssn1.value.split("");
  check2 = ssn2.value.split("");
  const checknum = check2.pop();
  for (let i = 0; i < check1.length; i++) {
    total += check1[i] * (i + 2);
    if (i > 1) {
      total += check2[i] * i;
    } else {
      total += check2[i] * (i + 8);
    }
  }
  let result = 11 - (total % 11);

  if (result == 10) {
    result = 0;
  } else if (result == 11) {
    result = 1;
  }
  console.log(result);
  console.log(total);
  console.log(check1);
  console.log(check2);
  if (checknum == result) {
    alert("주민등록번호 인증 완료");
  } else {
    alert("주민등록번호 확인 해주세요");
    ssn1.focus();
  }
}
