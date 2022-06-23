//Add Product
let products=[];
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/admin/products')
    .then((res)=>{
        products=res.data;
        showProducts(products);
        axios.get('http://localhost:3000/cart')
        .then(res1=>{
            for(x of res1.data){
                showCartItems(x)
            }
        });
    })
})
const cartPop=document.getElementById('cartPop');
const table=document.getElementById('cart-container');
const cart=document.getElementById('cart-container');
const container=document.getElementById('container');
const total=document.getElementById('total');
var cartObj=[];
var cartItems=[];
function addtocart(){
    cart.innerHTML='<div id="cart-container"><nav class="cartTable" id="cartTable"><span class="cart-item">Item</span><span class="cart-price">Price</span><span class="cart-qty">Quantity</span></nav></div>';
    const id=(event.target.parentNode.id);
    console.log(id)
    const params = new URLSearchParams();
    params.append('id', id);
    axios.post('http://localhost:3000/cart', params)
    .then((res)=>{
        createNotif(name)
        axios.get('http://localhost:3000/cart')
        .then(res1=>{
            for(x of res1.data){
                showCartItems(x)
            }
        });
    })
        .catch((err)=>crossOriginIsolated.log(err));
    // console.log(event.path[1].children[0],event.path[1].children[1],event.path[1].children[2].value);
    // console.log(event.path[1].children[1])
    // const name=document.querySelector(`#${id} h2`).innerText;
    // const img=document.querySelector(`#${id} img`).src;
    // const price=document.querySelector(`#${id} p`).innerText;
    // let cartTotal=0;
    // obj={
    //     name,img,price
    // };
    // for(x of cartObj){
    //     if(x.name===name){
    //         alert('Please increase the quantity in cart');
    //         return;
    //     }
    // }
    // cartObj.push(obj);
    // cartItems.push(obj)
    // console.log(cartObj,cartItems);
    
    
    
}
function showCartItems(obj){
    console.log(obj.productData);
    const nav=document.createElement('nav');
    nav.innerHTML=`<span class="cart-item"><img src="${obj.productData.imageUrl}" >${obj.productData.title}</span>
    <span class="cart-price">${obj.productData.price}</span><span class="cart-qty">
    <input type="number" value="${obj.qty}"><button onclick="remove()" >remove</button></span>`;
    nav.className='cartTable';
    table.appendChild(nav);
}
function cartOpen(){
    cartPop.classList.add('active');
}
function cartClose(){
    cartPop.classList.remove('active');
}
function purchase(){
    alert('ThankYou for ordering');
    cartObj=[];
    cart.innerHTML='<div id="cart-container"><nav class="cartTable" id="cartTable"><span class="cart-item">Item</span><span class="cart-price">Price</span><span class="cart-qty">Quantity</span></nav></div>'
    total.innerText=`Total: $ 0`
}
function remove(){
    console.log(event.target.parentNode.parentNode.firstChild.innerText);
    const obj=event.target.parentNode.parentNode.firstChild.innerText.toString();
    cartObj=cartObj.filter(item=>{return item.name!=obj});
    console.log(cartObj,obj);
    let cartTotal=0;
    cart.innerHTML='<div id="cart-container"><nav class="cartTable" id="cartTable"><span class="cart-item">Item</span><span class="cart-price">Price</span><span class="cart-qty">Quantity</span></nav></div>';
    for(x of cartObj){
        showCartItems(x);
        cartTotal+=parseInt(x.price);
    }
    total.innerText=`Total: $ ${cartTotal}`;
}
function createNotif(name){
    const notif=document.createElement('div');
    notif.classList.add('toast');
    notif.innerText=`${name} added successfully`;
    container.appendChild(notif);
    setTimeout(()=>{
        notif.remove();
    },3000)
} 
function showProducts(products){
    for(x of products){
        const product=document.createElement('div');
        const div=document.getElementById('products');
        product.className='product';
        product.id=x.id;
        product.innerHTML=`<h2>${x.title}</h2>
        <img src="${x.imageUrl}">
        <span>$</span><p>${x.price}</p>
        <button >Add to Cart</button>`;
        div.appendChild(product);
    }
}