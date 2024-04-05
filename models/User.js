"use strict";

class User {
  // thêm
  constructor(firstName, lastName, username, password, category, page_size) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.category = category;
    this.page_size = page_size;
  }
}

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
//  tạo hàm lưu dữ liệu vào Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//  tạo hàm lấy dữ liệu ra từ Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

// lấy data từ api
let datas = [];

// lấy dữ liệu tin tức
let data = [];

// hàm hiển thị danh sách tin tức
const render = function (datas) {
  const dev = datas.map((data) => {
    return `
      <div id="news-container">
        <div class="card flex-row flex-wrap">
          <div class="card mb-3" style="">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="${data.urlToImage}"
                  class="card-img"
                  alt="${data.title}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${data.title}</h5>
                  <p class="card-text">${data.description}</p>
                  <a href="${data.url}"
                    class="btn btn-primary">View</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  Page_content.innerHTML = dev.join("");
};
