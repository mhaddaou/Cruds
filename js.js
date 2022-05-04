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
let save = document.getElementById('save');
let search = document.getElementById('search');
let sbt = document.getElementById('sbt');
let sbc = document.getElementById('sbc');

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
    if (tab.title != '' && tab.count < 101 && tab.price > 0 && tab.category != '') 
    {
        if(tab.count > 1){
            for(let i = 0; i < tab.count; i++){
            Data.push(tab);
            }
        }else{
            Data.push(tab);
        }
        clear();
        localStorage.setItem('product', JSON.stringify(Data));
        print_product();
        window.location.href = window.location.href;
    }else{
        if (tab.title == '')
        {
            title.style.background = 'rgb(136, 34, 34)';
            
        }
        if (tab.count > 101)
        {
            count.value= '';
            count.placeholder = `can't doing more than 100 products`;
            count.style.background = 'rgb(136, 34, 34)';
        }
        if (tab.price < 1)
        {
            price.style.background = 'rgb(136, 34, 34)';
        }
        if (tab.category == '')
        {
            category.style.background = 'rgb(136, 34, 34)';
        }
    }
}

title.onclick = function(){
    title.style.background = 'black';
}
count.onclick = function(){
    count.style.background = 'black';
    count.placeholder = 'count';
}
price.onclick = function(){
    price.style.background = 'black';
}
category.onclick = function(){
    category.style.background = 'black';
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
    submit.style.display = 'none';
    save.style.display = 'block';
    var b = index;
    save.onclick = function(){
        Data[b].title = title.value;
        Data[b].price = price.value;
        Data[b].taxes = taxes.value;
        Data[b].ads= ads.value;
        Data[b].discount = discount.value;
        Data[b].category = category.value;
        localStorage.product = JSON.stringify(Data);
        print_product();
        submit.style.display = 'block';
        save.style.display = 'none';
        clear();
    }
}

// search

// search By Title


sbt.onclick = function(){
    let table = '';
    let value = search.value.toLowerCase();
    search.value = '';
    search.placeholder = 'Search By Title';
    for (let i = 0; i < Data.length; i++)
    {
        if (Data[i].title.includes(value) == true)
        {
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
    }
    
}

//search By Category


sbc.onclick = function(){
    
    let table = '';
    let value = search.value.toLowerCase().trime();
    search.value = '';
    search.placeholder = 'Search By Category'
    for (let i = 0; i < Data.length; i++)
    {
        if (Data[i].category.includes(value) == true)
        {
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
    }
}

