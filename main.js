const cartPop=document.getElementById('cartPop');
const table=document.getElementById('cart-container');
const cart=document.getElementById('cart-container');
var cartObj=[];
var cartItems=[];
function addtocart(){
    const id=(event.target.parentNode.id);
    // console.log(event.path[1].children[0],event.path[1].children[1],event.path[1].children[2].value);
    // console.log(event.path[1].children[1])
    const name=document.querySelector(`#${id} h2`).innerText;
    const img=document.querySelector(`#${id} img`).src;
    const price=document.querySelector(`#${id} p`).innerText;
    obj={
        name,img,price
    };
    for(x of cartObj){
        if(x.name===name){
            alert('Please increase the quantity in cart');
            return;
        }
    }
    cartObj.push(obj);
    cartItems.push(obj)
    console.log(cartObj,cartItems);
    cart.innerHTML='<div id="cart-container"><nav class="cartTable" id="cartTable"><span class="cart-item">Item</span><span class="cart-price">Price</span><span class="cart-qty">Quantity</span></nav></div>';
    for(x of cartObj){
        showCartItems(x)
    }
    
    
}
function showCartItems(obj){
    const nav=document.createElement('nav');
    nav.innerHTML=`<span class="cart-item"><img src="${obj.img}" >${obj.name}</span><span class="cart-price">${obj.price}</span><span class="cart-qty"><input type="number" value="1"><button onclick="remove(obj)" >remove</button></span>`;
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
}
function remove(obj){
    cartObj.filter(item=>item.name!==obj.name);
    console.log(cartObj);
    cart.innerHTML='<div id="cart-container"><nav class="cartTable" id="cartTable"><span class="cart-item">Item</span><span class="cart-price">Price</span><span class="cart-qty">Quantity</span></nav></div>';
    for(x of cartObj){
        showCartItems(x);
    }
}