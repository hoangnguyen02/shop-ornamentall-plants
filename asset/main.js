// Hàm kiểm tta sản phẩm đã tồn tại trong giỏ hàng chưa
function isExistedInCart(item, arrCart){
    let myIndex = -1;
    arrCart.forEach((itemCart, index)=>{
        if(item.id == itemCart.id)  myIndex = index;
    });
    return myIndex;
    // Nếu chưa thì trả về -1
    // Nếu đã tồn tại thì trả về vị trí sản phẩm trong mảng [products]
}
function loadShoppingCart(){
    let products = [] ;//chứa các mặt hàng hiện có của giỏ hàng
    const selectedItems = (evt) => {
        const linkClicked = evt.target;
        // lấy id của linkClicked
        alert("Id item: "+ linkClicked.parentElement.children[0].textContent)
        if(typeof Storage !== undefined){
            // Nếu browser hổ trợ LocalStorage

            // Tạo đối tượng sản phẩm
            let newItem = {
                id: linkClicked.parentElement.children[0].textContent, // Lấy id 
                name: linkClicked.parentElement.children[1].textContent, // Lấy tên sản phẩm
                price: linkClicked.parentElement.children[2].textContent, // Lấy giá sản phẩm
                quantity: 1 // Khởi tạo số lượng sản phẩm bằng 1
            };
            if(JSON.parse(localStorage.getItem('cartItems')) === null){
                // Nếu giỏ hàng cartItems chưa tồn tại
                products.push(newItem); // thêm đối tượng sản phẩm vào giỏ hàng 
                localStorage.setItem('cartItems', JSON.stringify(products)); 
                // Tao giỏ hàng cartItems 
                // convert object -> json
                // Thêm dữ liệu vào giỏ hàng
                window.location.reload();
                // Tải lại trang

            }
            // Nếu localStorage đã tồn tại
            else{
                // Lấy dữ liệu giỏ hàng từ localStorage 
                const products = JSON.parse(localStorage.getItem('cartItems'));
                // Lấy vị trí của đối tượng sản phẩm mới tạo trong mạng [] products
                let index = isExistedInCart(newItem,products);
                // Nếu sản phẩm đã tồn tại
                if(index >=0){
                    products[index].quantity++; // tăng số lượng lên 1
                    localStorage.setItem('cartItems', JSON.stringify(products));
                    window.location.reload();
                    // cập nhật giỏ hàng
                }
                // chưa tồn tại thì thêm vào giỏ hàng
                else products.push(newItem);
                // cập nhật lại giỏ hàng
                localStorage.setItem('cartItems', JSON.stringify(products));
                window.location.reload();
            }
        }else{
            alert( "Localstorage is not working on your browser !");
        }
    }
    const attachingEvent = evt => evt.addEventListener('click',selectedItems);
    const addToCart = document.getElementsByClassName('add__cart');
    Array.prototype.forEach.call(addToCart,attachingEvent); 

    const shoppingCard = document.querySelector('.shopping__cart');
    shoppingCard.addEventListener('click', function(){
        location.href = 'GioHang.html';
    });

    if(localStorage.getItem('cartItems') != undefined){
        const numberOrderedItems = document.querySelector('.shopping__cart .no__order-item');
        let numberOfItems = 0;
        let customerOrdered = JSON.parse(localStorage.getItem('cartItems'));
        customerOrdered.forEach(item => {
            numberOfItems += item.quantity;
        })
        numberOrderedItems.innerHTML = numberOfItems;
    }
}
function showCart(){
    if(localStorage.getItem('cartItems') == undefined){
        alert("Giỏ Hàng của bạn Trống");
        window.location.href = "GioHang.html";
    }
    else{
        let customerCart = JSON.parse(localStorage.getItem('cartItems'));

        const tblHead = document.getElementsByTagName('thead')[0];
        const tblBody = document.getElementsByTagName('tbody')[0];
        const tblFoot = document.getElementsByTagName('tfoot')[0];

        let headColumns = bodyRows = footColumns = '';
        headColumns += '<tr><th>STT</th><th>ID</th><th>Tên Sản Phẩm</th><th>Số Lượng</th><th>Giá</th><th>Xóa</th></tr>';
        tblHead.innerHTML = headColumns;
        vat = total = amoutPaid = 0;
        no = 0;
        if(customerCart[0] === null){
            bodyRows += '<tr><td colspan="5">No items found</td></tr>';
        }else{
            customerCart.forEach(item => {
                total += Number(item.quantity) * Number(item.price.replace(/[^0-9]/g,""));
                bodyRows += '<tr><td>'+ ++no+'</td><td>'+ item.id+'</td><td>'+ item.name+'</td><td>'+ item.quantity+'</td>'+'<td>'+ formatCurrency(item.price.replace(/[^0-9]/g,"")) +'</td><td><a href="#" onclick=deleteCart(this);>Xóa</a></td></tr>';
            })
        }
        tblBody.innerHTML = bodyRows;
        footColumns += '<tr><td colspan="4">Tổng Cộng: </td> <td>'+formatCurrency(total) +'</td><td rowspan="3"></td></tr>';
        footColumns += '<tr><td colspan="4">VAT (10%):</td> <td>'+formatCurrency(Math.floor(total*0.1)) +'</td></tr>';
        footColumns += '<tr><td colspan="4">Số tiền phải trả:</td> <td>'+formatCurrency(Math.floor(total*1.1)) +'</td></tr>';
        
        tblFoot.innerHTML = footColumns;
    }
}
// Xóa sản phẩm trong giỏ hàng
function deleteCart(evt){
    let updateProducts = [];
    let customerCart = JSON.parse(localStorage.getItem('cartItems'));
    customerCart.forEach(item => {
        if(item.id != evt.parentElement.parentElement.children[1].textContent){
            updateProducts.push((item));
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(updateProducts));
    window.location.reload();
}
// Chuyễn đổi đơn vị tiền tệ Việt nam
const formatCurrency = (amount, locale="vi-VN") => {
    return new Intl.NumberFormat(locale,{
        style:'currency',
        currency: 'VND',
        minimumFractionDigits:0,
        maximumFractionDigits:2
    }).format(amount);
}

//dong mo menu tren mobile
var header = document.getElementById('header_container')
var btn_menu = document.getElementById('menu')
var navbar_menu = document.getElementById('navbar_menu');

btn_menu.onclick = function() {
    if(navbar_menu.className==='navbar') {
        navbar_menu.className='active_menu';
    }
    else {
        navbar_menu.className='navbar';
    }
}

// backtop
const backTop = document.querySelector(".back-top");

window.addEventListener("scroll", () => {
    if(window.pageYOffset > 100){
        backTop.classList.add("active");
    } else {
        backTop.classList.remove("active"); 
    }
})


// loading trang web
var loader = function() {
    setTimeout(function() {
        $('#loader').css({ 'opacity': 0, 'visibility':'hidden' });
    }, 200);
};
$(function(){
    loader();
});


//lay ra kich thuoc chieu ngang màn hình
var widthDisplay =  document.documentElement.clientWidth;
//lay ra the li dropdown
var nav_sanpham = document.getElementById('drop_content_a');
//lay ra the ul dropdown
var dropwdown__ul = document.querySelector('#dropdown-content')

//xu li su kien click the li va hien ra menu con
if(widthDisplay < 500) {
    nav_sanpham.onclick = function () {
        if( dropwdown__ul.className=='display-none') {
            dropwdown__ul.className = 'display-block';
        }
        else if(dropwdown__ul.className=='display-block'){
            dropwdown__ul.className ='display-none';
        }
    }
}


