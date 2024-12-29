async function getUser(){
    const res=await fetch("http://localhost:3000/api/getusers");
    console.log(res);
    const users=await res.json();
    str=``
    users.map((user)=>{
        console.log(user.file.filename);
        str+=`
            <div class="card">
                <div class="img">
                    <img src="http://localhost:3000/api/image/${user.file.filename}" alt="">
                </div>
                <div class="content">
                    <h5>${user.username}</h5>
                    <h6>${user.email}</h6>
                    <h6>${user.phone}</h6>
                </div>
                <div class="buttons">
                <center> <button class="del" onclick="deleteData('${user._id}')" >Delete</button> <a href="./pages/edit.html?id=${user._id}"><button   class="edt">Edit</button></a> </center>
                </div>
            </div>
        `
    })
    document.getElementById("container").innerHTML=str
    
}

getUser()

async function deleteData(_id){
    console.log(_id);
    const res=await fetch(`http://localhost:3000/api/delete/${_id}`,{method:"DELETE"})
    console.log(res);
    window.location.reload()
    
}

const editButtons = document.querySelectorAll('.edt');

editButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    
    const userId = new URL(event.target.href).searchParams.get('id');

    window.location.href = `./pages/edit.html?id=${userId}`;
  });
});