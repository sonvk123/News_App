"use strict";

const firstName = document.querySelector("#input-firstname");
const lastName = document.querySelector("#input-lastname");
const userName = document.querySelector("#input-username");
const password = document.querySelector("#input-password");
const passwordConfirm = document.querySelector("#input-password-confirm");

const btn_register = document.querySelector(".btn-primary");

const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(`${KEY}`)) || [];

// tạo hàm kiểm tra form hợp lệ
const validate = function () {
  let kt = true;

  if (firstName.value.length === 0) {
    kt = false;
    alert("Mời nhập firstName");
  } else if (lastName.value.length === 0) {
    kt = false;
    alert("Mời nhập lastName");
  } else if (userName.value.length === 0) {
    kt = false;
    alert("Mời nhập userName");
  } else if (userArr.some((user) => user.username === userName.value)) {
    kt = false;
    alert("UserName đã được sử dụng");
  } else if (password.value.length < 8) {
    kt = false;
    alert("Password phải có ít nhất 8 ký tự");
  } else if (passwordConfirm.value.length === 0) {
    kt = false;
    alert("Mời nhập Confirm password");
  } else if (passwordConfirm.value !== password.value) {
    kt = false;
    alert("Confirm password cần giống password");
  }

  return kt;
};
// tạo hàm xóa input
const clearInput = function () {
  firstName.value = "";
  lastName.value = "";
  userName.value = "";
  password.value = "";
  passwordConfirm.value = "";
};

// khi nhấn nút register
btn_register.addEventListener("click", function () {
  let user_input = {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    password: password.value,
  };

  function parseUser(userData) {
    const user = new User(
      userData.firstName,
      userData.lastName,
      userData.userName,
      userData.password,
      (userData.category = "Technology"),
      (userData.page_size = "3")
    );

    return user;
  }
  const user = parseUser(user_input);
  const test = validate();

  if (test) {
    userArr.push(user);
    clearInput();
    saveToStorage(`${KEY}`, JSON.stringify(userArr));

    window.location.href = "../pages/login.html";
  }
});
