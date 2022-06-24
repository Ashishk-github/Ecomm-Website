let pageId=1;
let pageCount=1;
let cartPageId=1;
let cartPageCount=1;
let cartItems=[]
window.addEventListener('DOMContentLoaded',()=>{
    pageNavig();
    axios.get('http://localhost:3000/cart')
    .then(res1=>{
            showCartItems(res1.data)});
})

const cartPop=document.getElementById('cartPop');
const table=document.getElementById('cart-container');
const cart=document.getElementById('cart-container');
const container=document.getElementById('container');
const total=document.getElementById('total');
const pagebtn=document.getElementById('page-bar');
//Page Navigation Functions for Products
function pageNavigbtn(){
    const pagebarid=event.target.parentNode.id;
    switch(pagebarid){
        case "firstbtn":
            pageId=1
            pageNavig()
            break;
        case "prevbtn":
            if(pageId>1) pageId-=1
            pageNavig()
            break;
        case "nextbtn":
            if(pageId<pageCount) pageId+=1
            pageNavig()
            break;
        case "lastbtn":
            pageId=pageCount
            pageNavig()
            break;
        default:
            break;

    }
}

async function pageNavig(){
    const count=await axios.get('http://localhost:3000/productcount');
    pageCount=Math.round(parseInt(count.data)/2);
    console.log(pageCount);
    const url='http://localhost:3000/products/'+pageId.toString();
    const products=await axios.get(url);
    showProducts(products);
    console.log(4)
}
//Page Navigation Functions for Cart
function cartNavigbtn(){
    const pagebarid=event.target.parentNode.id;
    switch(pagebarid){
        case "cfirstbtn":
            cartPageId=1
            showCartItems(cartItems)
            break;
        case "cprevbtn":
            if(cartPageId>1) cartPageId-=1
            showCartItems(cartItems)
            break;
        case "cnextbtn":
            if(cartPageId<cartPageCount) cartPageId+=1
            showCartItems(cartItems)
            break;
        case "clastbtn":
            cartPageId=cartPageCount
            showCartItems(cartItems)
            break;
        default:
            break;

    }
}

//Adding to Cart
function addtocart(){
    const id=(event.target.parentNode.id);
    
    const params = new URLSearchParams();
    params.append('id', id);
    console.log(id);
    axios.post('http://localhost:3000/cart', params)
    .then((res)=>{
        createNotif(name);
        console.log(res)
        axios.get('http://localhost:3000/cart')
        .then(res1=>{
            
            showCartItems(res1.data)});
    })
    .then((res)=>{
        total.innerText=`Total:$`
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
//Show Cart Item Functions
function showCartItems(obj){
    cartItems=obj;
    const curr=document.getElementById('c-curr');
    cartPageCount=Math.round((obj.length)/2);
    const j=(cartPageId-1)*2;
    let cartTot=0;
    console.log(cartPageCount);
    cart.innerHTML=`<div id="cart-container"><nav class="cartTable" id="cartTable">
    <span class="cart-item">Item</span><span class="cart-price">Price</span>
    <span class="cart-qty">Quantity</span></nav></div>`;
    for(let i=j;i<j+2 && i<obj.length;i++){
        const nav=document.createElement('nav');
        nav.id=obj[i].id;
        nav.innerHTML=`<span class="cart-item"><img src="${obj[i].imageUrl}" >${obj[i].title}</span>
        <span class="cart-price">${obj[i].price}</span><span class="cart-qty">
        <input type="number" value="${obj[i].cartItem.quantity}"><button onclick="remove()" >remove</button></span>`;
        nav.className='cartTable';
        table.appendChild(nav);
        cartTot+=obj[i].price*obj[i].cartItem.quantity
    }
    curr.innerText=`${cartPageId}`;
    total.innerText=`Total: $ ${cartTot}`
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
async function remove(){
    console.log(event.target.parentNode.parentNode.id);
    const id=event.target.parentNode.parentNode.id
    const url="http://localhost:3000/cart-delete-item/"+id;
    const res=await axios.delete(url);
    const res1=await axios.get('http://localhost:3000/cart');
    showCartItems(res1.data);
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
//Shows Products on Screen
function showProducts(products){
    const curr=document.getElementById('curr');
    curr.innerText=`${pageId}`;
    console.log(pageId,pageCount);
    console.log(products)
    const div=document.getElementById('products');
    div.innerHTML=``;
    for(x of products.data){
        const product=document.createElement('div');
        product.className='product';
        product.id=x.id;
        product.innerHTML=`<h2>${x.title}</h2>
        <img src="${x.imageUrl}">
        <span>$</span><p>${x.price}</p>
        <button >Add to Cart</button>`;
        div.appendChild(product);
    }
}