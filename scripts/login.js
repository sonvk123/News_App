"use strict";

const userName = document.querySelector("#input-username");
const password = document.querySelector("#input-password");

const btn_login = document.querySelector(".btn-primary");

const userArr = JSON.parse(getFromStorage("USER_ARRAY")) || [];

//  tạo hàm lưu dữ liệu vào Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//  tạo hàm lấy dữ liệu ra từ Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

// tạo hàm xóa input
const clearInput = function () {
  userName.value = "";
  password.value = "";
};

// tạo hàm kiểm tra form hợp lệ
const validate = function () {
  if (userName.value.length === 0) {
    alert("Mời nhập userName");
    return false;
  }

  if (password.value.length < 8) {
    alert("Password phải có ít nhất 8 ký tự");
    return false;
  }

  return true;
};

//  tạo hàm kiểm tra userName và password có đúng không để login
const test = function () {
  var kt = true;
  let count = 0;

  userArr.map((use) => {
    if (userName.value === use.username && password.value === use.password) {
      console.log(" đúng rồi nha");
      count++;
    }
  });

  if (count > 0) {
    kt = true;
  } else {
    console.log("tài khoản hoặc mật khẩu không chính xác");
    kt = false;
  }
  return kt;
};

// khi nhấn nút login
btn_login.addEventListener("click", function () {
  let user_input = {
    userName: userName.value,
    password: password.value,
  };

  if (validate()) {
    if (test()) {
      let currentUser = userArr.filter(function (user) {
        return user.username === userName.value;
      });

      saveToStorage(`currentUser`, JSON.stringify(currentUser));

      window.location.href = "../index.html";
    } else {
      alert("tài khoản hoặc mật khẩu không chính xác");
    }
  }
});
