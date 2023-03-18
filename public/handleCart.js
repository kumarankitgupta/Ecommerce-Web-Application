const ot = document.getElementById("ot")
function incQuantity(id,itemid){
    let x = parseInt(id.textContent);
    x++;
    let st = String(itemid);
    if(x === 0){
        fetch(`http://localhost:3000/users/dcart?id=${st}`,{method:'POST'})
        .then((data)=>{
            console.log("Success");
        })
        .catch((err)=>{
            console.log(err);
        })
    }else{
        id.textContent = x;
        fetch(`http://localhost:3000/users/inccart?id=${st}`,{method:'POST'})
        .then((data)=>{
            console.log("Success");
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
}
function decQuantity(id,itemid){
    let x = parseInt(id.textContent);
    x--;
    let st = String(itemid);
    if(x === 0){
        fetch(`http://localhost:3000/users/dcart?id=${st}`,{method:'POST'})
        .then((data)=>{
            console.log("Success");
            location.reload();
        })
        .catch((err)=>{
            console.log(err);
        })
    }else{
        id.textContent = x;
        fetch(`http://localhost:3000/users/deccart?id=${st}`,{method:'POST'})
        .then((data)=>{
            console.log("Success");
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}