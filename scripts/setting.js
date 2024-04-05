"use strict";

const input_page_size = document.querySelector("#input-page-size");
const input_category = document.querySelector("#input-category");

const btn_save = document.querySelector("#btn-submit");

const Page_content = document.querySelector("#info");

let userArr = JSON.parse(getFromStorage("USER_ARRAY")) || [];
let currentUser = JSON.parse(getFromStorage("currentUser")) || [];
let setting = JSON.parse(getFromStorage("setting")) || [];

// tạo hàm hiển thị thông tin cài đặt
const settingInput = function () {
  if (currentUser.length > 0) {
    input_page_size.value = currentUser[0].page_size;
    input_category.value = currentUser[0].category;
  } else {
    input_page_size.value = setting[0].page_size;
    input_category.value = setting[0].category;
  }
};

// tạo hàm kiểm tra form hợp lệ
const validate = function () {
  if (input_page_size.value <= 0) {
    alert("Mời chọn News per page lớn hơn 0");
    return false;
  }

  if (input_category.value === "General") {
    alert("Mời chọn News Category");
    return false;
  }

  return true;
};

// xóa phần trên và thêm trực tiếp và logout vẫn còn
//  tại hàm khi nhấn btn-submit
const save = function () {
  const data = {
    page_size: input_page_size.value,
    category: input_category.value,
  };

  if (validate()) {
    if (userArr.length > 0 && currentUser.length > 0) {
      // thêm  page_size và category cho user đang login
      currentUser[0].page_size = data.page_size;
      currentUser[0].category = data.category;

      userArr = userArr.filter((user) => {
        return !(user.username === currentUser[0].username);
      });
      userArr.push(currentUser[0]);
      setting.pop();
      setting.push(data);
      saveToStorage(`USER_ARRAY`, JSON.stringify(userArr));
      saveToStorage(`setting`, JSON.stringify(setting));
    } else {
      setting.pop();
      setting.push(data);
      saveToStorage(`setting`, JSON.stringify(setting));
    }

    saveToStorage(`currentUser`, JSON.stringify(currentUser));

    settingInput();
  }
};
settingInput();
btn_save.addEventListener("click", save);
