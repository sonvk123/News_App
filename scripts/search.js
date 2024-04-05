"use strict";

const input_query = document.querySelector("#input-query");

const image = document.querySelector(".card-img");
const card_title = document.querySelector(".card-title");
const card_text = document.querySelector(".card-text");
const view = document.querySelector(".btn-primary");

const btn_pre = document.querySelector("#btn-prev");
const btn_next = document.querySelector("#btn-next");
const btn_search = document.querySelector("#btn-submit");

const Page_content = document.querySelector("#news-container");

const currentUser = JSON.parse(getFromStorage(`currentUser`)) || [];
let setting = JSON.parse(getFromStorage("setting")) || [];

let stt = 1;
let totalResults = 1;
let key;

// tạo hàm khi nhấn vào nút Previous
const previous = function () {
  stt--;
  document.getElementById("page-num").innerHTML = stt;
  fetchData(key, 3, stt);
  if (stt <= 1) btn_pre.classList.add("hiden");
};

// tạo hàm khi nhấn vào nút Next
const next = function () {
  stt++;
  document.getElementById("page-num").innerHTML = stt;

  //  chia cho số page_size để lấy số lựơng Page có thể có
  let result = totalResults / 3;
  if (currentUser.length > 0)
    result = totalResults / `${currentUser[0].page_size}`;
  else result = totalResults / 3;

  if (Number.isInteger(result)) {
    result = result;
  } else {
    result = Math.ceil(result);
  }

  pageSize(key, stt);

  // nếu số page = stt thì xóa nút next
  if (result === stt) btn_next.classList.add("hiden");
  if (stt > 1) btn_pre.classList.remove("hiden");
};
// tạo hàm khi nhấn nút search
const search = function () {
  if (validate()) {
    key = input_query.value;
    stt = 1;
    document.getElementById("page-num").innerHTML = stt;
    pageSize(key, stt);
    clearInput();
  }
};
// tạo hàm xóa input
const clearInput = function () {
  input_query.value = "";
};

// tạo hàm kiểm tra form hợp lệ
const validate = function () {
  var kt = true;
  if (input_query.value.length > 0) {
  } else {
    kt = false;
    alert("Mời nhập từ khóa cần tìm");
  }

  return kt;
};

// tạo hàm kiểm tra xem người dùng đã thay đổi setting chưa nếu chưa thì dùng mặc định
const pageSize = function (key, stt) {
  if (currentUser.length > 0)
    fetchData(`${key}`, `${currentUser[0].page_size}`, stt);
  else fetchData(`${key}`, 3, stt);
};

// tạo hàm lấy đata từ API
const fetchData = async function (key, pageSize, page) {
  try {
    const url = `https://newsapi.org/v2/everything?q=${key}&pageSize=${pageSize}&page=${page}&apiKey=93758961f0d840eaafcba447bdea20c0`;
    console.log(url);
    const res = await fetch(url);
    datas = await res.json();
    totalResults = datas.totalResults;
    data = datas.articles;
    render(data);
    console.log(datas);
    return datas, data, totalResults;
  } catch (err) {
    console.error(err);
  }
};

btn_pre.classList.add("hiden");

btn_pre.addEventListener("click", previous);
btn_next.addEventListener("click", next);
btn_search.addEventListener("click", search);
