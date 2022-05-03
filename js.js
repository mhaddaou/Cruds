let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
var total = document.getElementById('total');
let title = document.getElementById('title');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let tbody = document.getElementById('tbody');
let deleteAll = document.getElementById('deleteAll');

// Get total

function results(){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    if (price.value != ''){
        total.innerHTML = `${result}&nbsp&nbsp`;
        total.style.background = 'rgb(70, 197, 11)';
        total.style.color = 'black';
    }else{
        total.innerHTML= '';
        total.style.background = 'green';
        total.style.color = 'white';
    }
}

//Creat product

let Data;

if (localStorage.product != null){
    Data = JSON.parse(localStorage.product);
}else{
    Data = [];
}

submit.onclick = function(){
    let tab= {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        category:category.value,
        total:total.innerHTML.slice(0, -12),
    }
    if(tab.count > 1){
        for(let i = 0; i < tab.count; i++){
        Data.push(tab);
        console.log('helo');
        }
    }else{
        Data.push(tab);
        console.log('not');
    }
    clear();
    localStorage.setItem('product', JSON.stringify(Data));
    print_product();

}

//clear inputs

function clear(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    results();
}

// read products

function print_product(){
    let table = '';
    for(let i = 0; i < Data.length; i++){

    
    table += `
                    <tr>
                       <td>${i}</td>
                       <td>${Data[i].title}</td>
                       <td>${Data[i].price}</td>
                       <td>${Data[i].taxes}</td>
                       <td>${Data[i].ads}</td>
                       <td>${Data[i].discount}</td>
                       <td>${Data[i].total}</td>
                       <td>${Data[i].category}</td>
                       <td><button id="update" onclick="update(${i})">update</button></td>
                       <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
                       
                   </tr>`
    }
    tbody.innerHTML = table;

    if (Data.length > 0){
        deleteAll.style.display = 'block';
        document.getElementById('dla').innerHTML = `Delete All  &nbsp;( ${Data.length} )`
    }else{
        deleteAll.style.display = 'none';
    }
}

print_product();

//delete one product

function deletePro(i){
    Data.splice(i,1);
    localStorage.product = JSON.stringify(Data);
    print_product();
}

// Delete All


function deleteAllPro(){
    Data.splice(0);
    localStorage.clear();
    print_product();
}

// update

function update(index){
    title.value = Data[index].title;
    price.value = Data[index].price;
    taxes.value = Data[index].taxes;   
    ads.value = Data[index].ads;
    discount.value = Data[index].discount;
    category.value = Data[index].category;
    results();
}
