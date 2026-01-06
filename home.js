// Steps : 
// Creation and Calculation
// Create product
// Save data in LocalStorage 
// Clear inputs data
//------------------------------------------------
// Read operations
// count() 
// update() 
// delete() 
// search() 
// clean data()
//------------------------------------------------- 

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let send = document.getElementById("send");

let mode = "create";
let temp;

// funtion getTotal()
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - (+discount.value);
        total.innerHTML = result;
        total.style.backgroundColor = "#041";
    }
    else {
        total.innerHTML = "";
        total.style.backgroundColor = "red";
    }
}

// Saving data in localStorage

let Prod_data;

if (localStorage.product != null) {
    Prod_data = JSON.parse(localStorage.product);
} else {
    Prod_data = [];
}

send.onclick = function () {
    let newProd = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (title.value != "" && price.value != ""
        && category.value != "" &&
    count.value <= 100) {
        if (mode === "create") {
            if (newProd.count > 1) {
                for (let i = 0; i < newProd.count; i++) {
                    Prod_data.push(newProd);
                }
            }
            else {
                Prod_data.push(newProd);
            }
        }
        else {
            Prod_data[temp] = newProd;
            mode = "create";
            send.innerHTML = "Create";
            count.style.display = "block";
        }
        clearData();
    }


    localStorage.setItem("product", JSON.stringify(Prod_data));
    showData();

};


showData();

function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// Read Data from Table

function showData() {
    getTotal();
    let table = ``;
    for (let i = 0; i < Prod_data.length; i++) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${Prod_data[i].title}</td>
        <td>${Prod_data[i].price}</td>
        <td>${Prod_data[i].taxes}</td>
        <td>${Prod_data[i].ads}</td>
        <td>${Prod_data[i].discount}</td>
        <td>${Prod_data[i].total}</td>
        <td>${Prod_data[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if (Prod_data.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All(${Prod_data.length})</button>
        `;
    } else {
        btnDelete.innerHTML = ``;
    }
}

// Delete

function deleteData(i) {
    Prod_data.splice(i, 1);
    localStorage.product = JSON.stringify(Prod_data);
    showData();
};

function deleteAll() {
    localStorage.clear();
    Prod_data.splice(0);
    showData();
};

// Update
function updateData(i) {
    title.value = Prod_data[i].title;
    price.value = Prod_data[i].price;
    taxes.value = Prod_data[i].taxes;
    ads.value = Prod_data[i].ads;
    discount.value = Prod_data[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = Prod_data[i].category;
    send.innerHTML = "Update";
    mode = "update";
    temp = i;
    scroll({
        top: "0px",
        behavior: "smooth",
    });
};

// Search
let searchMode = "Title";
function getSearchMode(id) {
    let search = document.getElementById("search");

    if (id === "searchTitle") {
        searchMode = "Title";
    }
    else {
        searchMode = "Category";
    }
    search.placeholder = "Search By " + searchMode;
    search.focus();
    search.value = "";
    showData();
    search.onblur = _ => search.placeholder = "Search";
};

// Search Func.
function searchData(value) {

    let table = ``;

    for (let i = 0; i < Prod_data.length; i++) {

        if (searchMode == "title") {
            if (Prod_data[i].title.includes(value.toLowerCase())) {
                table += `<tr>
                <td>${i}</td>
                <td>${Prod_data[i].title}</td>
                <td>${Prod_data[i].price}</td>
                <td>${Prod_data[i].taxes}</td>
                <td>${Prod_data[i].ads}</td>
                <td>${Prod_data[i].discount}</td>
                <td>${Prod_data[i].total}</td>
                <td>${Prod_data[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`;
            }

        }
        else {
            if (Prod_data[i].category.includes(value.toLowerCase())) {
                table += `<tr>
                    <td>${i}</td>
                    <td>${Prod_data[i].title}</td>
                    <td>${Prod_data[i].price}</td>
                    <td>${Prod_data[i].taxes}</td>
                    <td>${Prod_data[i].ads}</td>
                    <td>${Prod_data[i].discount}</td>
                    <td>${Prod_data[i].total}</td>
                    <td>${Prod_data[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>`;
            }

        }
    }

    document.getElementById("tbody").innerHTML = table;
};

// Clean Data

function cleanData() {

};
