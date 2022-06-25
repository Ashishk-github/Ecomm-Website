const orderDetailContainer=document.getElementById('orders');
window.addEventListener('DOMContentLoaded',async()=>{
    const orders=await axios.get('http://localhost:3000/orders');
    console.log(orders.data);
    showOrders(orders.data);
});
function showOrders(ord){
    for(x of ord){
        if(x.products.length===0) continue;
        console.log(x.products.length===0)
        const orderDet=document.createElement('li');
        orderDet.className="orderDet";
        console.log(x.products[0].orderItem.orderId)
        orderDet.innerHTML=`<h3>OrderId: ${x.products[0].orderItem.orderId}</h3>`;
        for(y of x.products){
            const orderItemDet=document.createElement('li');
            orderItemDet.className="orderItemDet";
            orderItemDet.innerHTML=`<span>Name: ${y.title}</span><span>   ----   Qty: ${y.orderItem.quantity}</span>`;
            orderDet.appendChild(orderItemDet);
        }
        orderDetailContainer.appendChild(orderDet);
    }
}