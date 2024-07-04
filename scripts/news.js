"use strict";

const image = document.querySelector(".card-img");
const card_title = document.querySelector(".card-title");
const card_text = document.querySelector(".card-text");
const view = document.querySelector(".btn-primary");

const btn_pre = document.querySelector("#btn-prev");
const btn_next = document.querySelector("#btn-next");

const Page_content = document.querySelector("#news-container");

const userArr = JSON.parse(getFromStorage("USER_ARRAY")) || [];
const currentUser = JSON.parse(getFromStorage(`currentUser`)) || [];
let setting = JSON.parse(getFromStorage("setting")) || [];

let stt = 1;
let totalResults = 1;

// tạo hàm khi nhấn vào nút Previous
const previous = function () {
  stt--;
  document.getElementById("page-num").innerHTML = stt;
  pageSize(stt);
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

  pageSize(stt);

  // nếu số page = stt thì xóa nút next
  if (result === stt) btn_next.classList.add("hiden");
  if (stt > 1) btn_pre.classList.remove("hiden");
};

// tạo hàm kiểm tra xem người dùng đã thay đổi setting chưa nếu chưa thì dùng mặc định
const pageSize = function (stt) {
  // nếu đã đăng nhập
  if (currentUser.length > 0) {
    fetchData(
      "us",
      `${currentUser[0].category}`,
      `${currentUser[0].page_size}`,
      stt
    );
  }
  // nếu chưa đăng nhập
  else {
    // nếu đã thay đổi setting
    if (setting.length > 0) {
      console.log(setting);
      fetchData("us", `${setting[0].category}`, `${setting[0].page_size}`, stt);
    } else fetchData("us", "Technology", 3, stt);
  }
};

// hàm lấy đata từ API
const fetchData = async function (country, category, pageSize, page) {
  // try {
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=93758961f0d840eaafcba447bdea20c0`;
  console.log(url);
  const res = await fetch(url);
  datas = await res.json();
  totalResults = datas.totalResults;
  data = datas.articles;
  console.log(data);
  render(data);
  return datas, data, totalResults;
  // }
  // catch (err) {
  //   console.error(err);
  // }
};

pageSize(1);
btn_pre.classList.add("hiden");

btn_pre.addEventListener("click", previous);
btn_next.addEventListener("click", next);
