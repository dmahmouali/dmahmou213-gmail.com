window.onload = () => {
    url = `https://172.17.0.2/mybot/todolistpackage/actors/todolistpackage/task_get_list`
    fetch(url)
        .then((resp) => {
            resp.json().then((data) => {
                for (task in data) {
                    var li = document.createElement("li");
                    var t = document.createTextNode(data[task].task);
                    li.appendChild(t);
                    document.getElementById("myUL").appendChild(li);
                    document.getElementById("myInput").value = "";

                    var span = document.createElement("SPAN");
                    var txt = document.createTextNode("\u00D7");
                    span.className = "close";
                    span.appendChild(txt);
                    li.appendChild(span);
                    console.log(data[task])
                    span.onclick = () =>{
                      delete_task(data[task].id, span)
                    }    

                    for (i = 0; i < close.length; i++) {
                        close[i].onclick = function () {
                            var div = this.parentElement;
                            div.style.display = "none";
                        }
                    }
                }
            })

        }) // Transform the data into json
        .catch((err) => {
            console.log(err)
        })
}


// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

function delete_task(id, html_elment) {
    var div = html_elment.parentElement;
    console.log(id)
    
    packageGedisClient.mybot.todolistpackage.actors.todolistpackage.task_delete( task_id=id )
    .then(response => {
        console.log(response.text())
        .then(data => {
            console.log(JSON.parse(data));
            
        })
        .catch( err => {
            console.log(err)
        })
    });
    // url = `https://172.17.0.2/mybot/todolistpackage/actors/todolistpackage/task_delete?task_id=${id}`
    // console.log(url)
    // fetch(url)
    //     .then((resp) => {
    //         resp.json().then((data) => {
    //             console.log(data.data)
    //         })

    //     }) // Transform the data into json
    //     .catch((err) => {
    //         console.log(err)
    //     })
    div.style.display = "none";
}

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        url = `https://172.17.0.2/mybot/todolistpackage/actors/todolistpackage/task_add?task=${inputValue}`
        fetch(url)
            .then((resp) => {
                resp.json().then((data) => {
                    console.log(data.data)
                })

            }) // Transform the data into json
            .catch((err) => {
                console.log(err)
            })
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.onclick = delete_task
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}