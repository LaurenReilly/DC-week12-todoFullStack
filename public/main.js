let listContainer = document.getElementById("listContainer");


function addItem () {
    let idValue = document.getElementById("idValue").value;
    let todoValue = document.getElementById("todoValue").value;
    axios.post('/api/todos', {id: idValue, todo: todoValue, completed: "not"}).then(function(response){
        listContainer.innerHTML = renderList(response.data);
    });
}

function editItem () {
    let idValue = document.getElementById("idValue").value;
    let todoValue = document.getElementById("todoValue").value;
    axios.put(`/api/todos/${idValue}`, {id: idValue, todo: todoValue, completed: "not"}).then(function(response){
        listContainer.innerHTML = renderList(response.data);
    });
}

function deleteItem () {
    let idValue = document.getElementById("idValue").value;
    let todoValue = document.getElementById("todoValue").value;
    var confirmed = confirm("Are you sure you want to delete?");
    if (confirmed == true) {
        axios.delete(`/api/todos/${idValue}`, {id: idValue, todo: todoValue}).then(function(response){
            listContainer.innerHTML = renderList(response.data);
        });
    }
}


function markDone () {
    let idValue = document.getElementById("idValue").value;
    let todoValue = document.getElementById("todoValue").value;
    axios.put(`/api/todos/complete/${idValue}`, {id: idValue, todo: todoValue, completed: "complete"}).then(function(response){
        listContainer.innerHTML = renderList(response.data);
    });
}

function renderList (response) {
    let listHTML = response.map(function(item) {
        return `
        <div class="text-center">
            <p class="${item.completed} m-3">${item.id} ${item.todo}</p>
        </div> 
        `
    });
    return listHTML.join("");
}

