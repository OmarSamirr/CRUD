//? Global letiables
const loading = document.querySelector(".loading");
const tableData = document.getElementById("tableData");
const searchInput = document.getElementById("search");
const inputs = document.querySelectorAll("form input");
const form = document.forms[0];
const selectOption = document.querySelector("select");
const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const table = document.querySelector("table");

let data = [];
let productsList = [];
let updatedIndex;

//?Events
form.addEventListener("submit", function (e) {
  e.preventDefault();
});
searchInput.addEventListener("input", function (e) {
  displayData(searchInput.value);
});
inputs.forEach((input) => {
  input.addEventListener("blur", function () {
    console.log(inputs[5]);
    inputs[5].value = +inputs[2].value + +inputs[3].value - +inputs[4].value;
  });
});

//! On Start
(function () {
  const icon = document.getElementById("mode");
  //check for previous data before get from ls
  if (localStorage.getItem("products'Data") != null) {
    productsList = JSON.parse(localStorage.getItem("products'Data"));
    displayData();
  }
  //dark-light mode button
  icon.addEventListener("click", function () {
    if (document.documentElement.dataset.theme == "dark") {
      document.documentElement.dataset.theme = "light";
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
      table.classList.remove("table-dark");
    } else if (document.documentElement.dataset.theme == "light") {
      document.documentElement.dataset.theme = "dark";
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
      table.classList.add("table-dark");
    }
  });
  if (localStorage.getItem("theme") !== null) {
    if (localStorage.getItem("theme") == "dark") {
      document.documentElement.dataset.theme = "dark";
      icon.classList.replace("fa-moon", "fa-sun");
      table.classList.add("table-dark");
    } else {
      document.documentElement.dataset.theme = "light";
      icon.classList.replace("fa-sun", "fa-moon");
      table.classList.remove("table-dark");
    }
  }
})();

displayData();

//! Functions
function addProduct() {
  if (
    validate(inputs[0]) &&
    validate(inputs[1]) &&
    validate(inputs[2]) &&
    validate(inputs[3]) &&
    validate(inputs[4]) &&
    validate(selectOption)
  ) {
    let product = {
      title: inputs[0].value,
      price: inputs[2].value,
      tax: inputs[3].value,
      discount: inputs[4].value,
      totalPrice: +inputs[2].value + +inputs[3].value - +inputs[4].value,
      brand: selectOption.value,
      count: inputs[1].value,
    };
    productsList.push(product);
    updatdeLocalStorage();
    displayData();
    clearInputs();
  }
}
function displayData(searchTerm = "") {
  let container = "";
  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].title.includes(searchTerm)) {
      container += `
          <tr>
        <td>${i + 1}</td>
        <td>${productsList[i].title}</td>
        <td>${productsList[i].totalPrice}</td>
        <td>${productsList[i].brand}</td>
        <td>${productsList[i].count}</td>
        <td><button onclick="setFormUpdate(${i})" class="btn btn-sm btn-outline-warning mb-md-0 mb-2 ">Update</button>
        <button onclick="deleteProduct(${i})" class="btn btn-sm btn-outline-danger mb-md-0 mb-2 ">Delete</button></td>
        </tr>
          `;
    }
  }
  tableData.innerHTML = container;
}
function clearInputs() {
  inputs.forEach((input) => {
    input.value = ""
    input.classList.remove('is-valid')
    selectOption.classList.remove('is-valid')
  });
}
function updatdeLocalStorage() {
  localStorage.setItem("products'Data", JSON.stringify(productsList));
}
function deleteProduct(i) {
  productsList.splice(i, 1);
  displayData();
  updatdeLocalStorage();
}
function setFormUpdate(i) {
  updatedIndex = i;
  inputs[0].value = productsList[i].title;
  inputs[1].value = productsList[i].count;
  inputs[2].value = productsList[i].price;
  inputs[3].value = productsList[i].tax;
  inputs[4].value = productsList[i].discount;
  inputs[5].value = productsList[i].totalPrice;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}
function updateProduct() {
  if (
    validate(inputs[0]) &&
    validate(inputs[1]) &&
    validate(inputs[2]) &&
    validate(inputs[3]) &&
    validate(inputs[4]) &&
    validate(selectOption)
  ) {
    let product = {
      title: inputs[0].value,
      price: inputs[2].value,
      tax: inputs[3].value,
      discount: inputs[4].value,
      totalPrice: +inputs[2].value + +inputs[3].value - +inputs[4].value,
      brand: selectOption.value,
      count: inputs[1].value,
    };
    productsList.splice(updatedIndex, 1, product);
    updatdeLocalStorage();
    displayData();
    clearInputs();
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
  }
}
function validate(element) {
  if (element === selectOption) {
    if (selectOption.value !== "1") {
      element.classList.remove("is-invalid");
      element.classList.add("is-valid");
      return true;
    } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      return false;
    }
  }
  const text = element.value;
  const regex = {
    productTitle:
      /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    productPrice: /^(?:[0-9]){1,}$/,
    productTax: /^(?:[0-9]){1,}$/,
    productDiscount: /^(?:[0-9]){1,}$/,
    productCount: /^(?:[0-9]){1,}$/,
  };

  if (regex[element.id].test(text)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
