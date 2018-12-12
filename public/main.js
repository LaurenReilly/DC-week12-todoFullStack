let listContainer = document.getElementById("listContainer");


function addItem () {
    let idValue = document.getElementById("idValue").value;
    let todoValue = document.getElementById("todoValue").value;
    axios.post('/api/todos', {id: idValue, todo: todoValue}).then(function(response){
        listContainer.innerHTML = renderList(response.data);
    });
}

function editItem () {
    let idValue = document.getElementById("idValue").value;
    let todoValue = document.getElementById("todoValue").value;
    axios.put(`/api/todos/${idValue}`, {id: idValue, todo: todoValue}).then(function(response){
        listContainer.innerHTML = renderList(response.data);
    });

}

function deleteItem () {
    let idValue = document.getElementById("idValue").value;
    let todoValue = document.getElementById("todoValue").value;
    axios.delete(`/api/todos/${idValue}`, {id: idValue, todo: todoValue}).then(function(response){
        listContainer.innerHTML = renderList(response.data);
    });
}


function renderList (response) {
    let listHTML = response.map(function(item) {
        return `
        <div class="d-flex justify-content-between m-auto">
            <p>${item.id} ${item.todo}</p>
            <a onclick="markDone(event)" class="btn btn-warning  mb-2">Mark Completed</a>
        </div> 
        `
    });
    return listHTML.join("");
}



function markDone() {
    let idValue = document.getElementById("idValue").value;
    axios.get('/api/todos').then(function(response){
        listContainer.innerHTML = renderMarkDone(idValue, response.data);
    });
}

function renderMarkDone(idValue, response) {
    let listHTML = response.map(function(item) {
        if (item.id === idValue) {
            return `
                <div class="d-flex justify-content-between m-auto">
                    <p style="text-decoration: line-through;">${item.id} ${item.todo}</p>
                    <a onclick="markDone(event)" class="btn btn-warning  mb-2">Mark Completed</a>
                </div> 
                `
        } else {
            return `
                <div class="d-flex justify-content-between m-auto">
                    <p>${item.id} ${item.todo}</p>
                    <a onclick="markDone(event)" class="btn btn-warning  mb-2">Mark Completed</a>
                </div> 
                `
        }
    });
    return listHTML.join("");
}