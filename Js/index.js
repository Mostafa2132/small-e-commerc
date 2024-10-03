let name = document.querySelector("#name");
let price = document.querySelector("#price");
let des = document.querySelector("#des");
let cat = document.querySelector("#cat");
let btn = document.querySelector("#btn");

//
async function GetAllCategories() {
  try {
    let res = await fetch("https://dummyjson.com/products/category-list");
    let data = await res.json();
    DisplayAllCategories(data);
  } catch (error) {
    console.log(error);
  }
}
GetAllCategories();

function DisplayAllCategories(categoryList) {
  let cartona = ``;
  for (let i = 0; i < categoryList.length; i++) {
    cartona += `     <div class="col-lg-4 category ">
                <div class="item d-flex justify-content-center align-items-center">
                    <h3>${categoryList[i].toUpperCase()}</h3>
                </div>
            </div>`;
  }
  if (document.querySelector("#rowCateg")) {
    document.querySelector("#rowCateg").innerHTML = cartona;
  }
  let allCatigre = document.querySelectorAll(".category");
  for (let i = 0; i < allCatigre.length; i++) {
    if (location.pathname.includes("./index.html")) {
      allCatigre[i].addEventListener("click", () => {
        localStorage.setItem("category", allCatigre[i].innerText);
        location.href = "/categoryProducts.html";
      });
    }
  }
}

async function GetAllProductsCat(category) {
  try {
    let res = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    let products = await res.json();
    DisplayCatPro(products.products);
  } catch (e) {
    console.log(e);
  }
}

if (location.pathname.includes("./categoryProducts.html")) {
  GetAllProductsCat(localStorage.getItem("category"));
}

/*---------------------------------*/

function DisplayCatPro(products) {
  let cartona = ``;
  for (let i = 0; i < products.length; i++) {
    cartona += `
                  <div class="col-lg-4 product" id=${products[i].id}>
                        <div class="card" >
                            <img src="${products[i].thumbnail}" class="card-img-top w-100" alt="...">
                            <div class="card-body">
                              <h5 class="card-title">${products[i].title}</h5>
                              <p class="card-text">${products[i].description}</p>
                                <div class="foot d-flex align-items-center justify-content-between">
                                        <h5 class="text-success">${products[i].price} $</h5>
                                        <h5>${products[i].rating} <i class="fa-regular fa-star text-warning"></i></h5>
                                </div>
                                  <button type="button" class="btn w-100 btn-outline-success my-2">Add to Cart</button>
                            </div>
                          
                          </div>
                    </div>
        `;
  }

  if (document.querySelector("#catProducts")) {
    document.querySelector("#catProducts").innerHTML = cartona;
  }
  if (document.querySelector("#anyProducts")) {
    document.querySelector("#anyProducts").innerHTML = cartona;
  }

  let x = document.querySelectorAll(".product");

  for (let i = 0; i < x.length; i++) {
    if (location.pathname.includes("/categoryProducts.html") || location.pathname.includes("/anyProducts.html")) {
      x[i].addEventListener("click", () => {
        localStorage.setItem("proId", x[i].getAttribute("id"));
        location.href = "./productDet.html";
      });
    }
  }
}

async function allProducts() {
  try {
    let res = await fetch("https://dummyjson.com/products");
    let any = await res.json();
    if (location.pathname.includes("/anyProducts.html")) {
      DisplayCatPro(any.products);
    }
  } catch (error) {
    console.log(error);
  }
}
allProducts();

async function showSelectedProudct() {
  try {
    let proId = localStorage.getItem("proId");
    let res = await fetch(`https://dummyjson.com/products/${proId}`);
    let item = await res.json();
    DisplayselectedPro(item);
  } catch (error) {
    console.log(error);
  }
}
showSelectedProudct();

function DisplayselectedPro(pro) {
  let cartona = `
                <div class="col-lg-6 ">
                <img src="${pro.thumbnail}" class="w-75" alt="">
            </div>
                <div class="col-lg-6">    
                    <div class="" >
                     <div class="card-body">
                       <h5 class="card-title fs-1">${pro.title}</h5>
                       <p class="card-text lh-lg fs-5 text-muted ">${pro.description}</p>
                       <h5 class="fs-3 mb-5">price : <span class="text-muted">${pro.price} $</span></h5>
                       <h5 class="fs-3 my-5">Brand : <span class="text-muted">${pro.brand} </span></h5>
                       <h5 class="fs-3 my-5">Category : <span class="text-muted">${pro.category} </span></h5>
                       <h5 class="fs-3 my-5">Return Policy : <span class="text-muted">${pro.returnPolicy} </span></h5>
                       <h5 class="text-danger fs-3">Return Policy : <span >${pro.discountPercentage} % </span></h5>
                       <button type="button" class="btn w-100 btn-outline-success my-2">Add to Cart</button>
                     </div>
                   </div>
            
         </div>
`;

  if (document.querySelector("#specificPro"))
    document.querySelector("#specificPro").innerHTML = cartona;
}

async function addProduct() {
  if (checkInputs()) {
    let product = {
      title: name.value,
      price: price.value,
      category: cat.value,
      description: des.value,
    };
    let res = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    Toastify({
      text: "Product added successfully",

      duration: 3000,
      gravity: "bottom",
      style: {
        background: "#96c93d",
      },
    }).showToast();
    clear();
    if (location.pathname.includes("/addProduct.html")) {
      setTimeout(() => {
        location.pathname = "/index.html";
      }, 3000);
    }
  }
}

if (location.pathname.includes("/addProduct.html")) {
  btn.addEventListener("click", () => {
    addProduct();
  });
}

function checkInputs() {
  if (
    name.value == "" ||
    price.value == "" ||
    cat.value == "" ||
    des.value == ""
  ) {
    document.querySelector(".msg").classList.replace("d-none", "d-block");
    return false;
  } else {
    document.querySelector(".msg").classList.replace("d-block", "d-none");
    return true;
  }
}

function clear() {
  name.value = "";
  price.value = "";
  cat.value = "";
  des.value = "";
}
