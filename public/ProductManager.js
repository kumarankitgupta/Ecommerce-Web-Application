const productName = document.getElementById("productName");
const productDesc = document.getElementById("productDesc");
const productQty = document.getElementById("productQty");
const productPrice = document.getElementById("productPrice");
const formdata = document.getElementById("formdata");
function showPopup(data){
    console.log(data)
    formdata.setAttribute('action',`/seller/updateProd?id=${data._id}`)
    productName.value = data.name;
    productDesc.value = data.detail;
    productQty.value = data.quantity;
    productPrice.value = data.price;
    document.getElementById("popup-container").style.display = "block";
}
function hidePopup(){
document.getElementById("popup-container").style.display = "none";
}
function deleteItem(id){
    console.log(id)
    fetch(`http://localhost:3000/seller/deleteproduct?id=${id}`,{method:'POST'})
    .then((data)=>{
        console.log(data);
    })
    .then(()=>{
        location.reload();
    })
}