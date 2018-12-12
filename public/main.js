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

}

function renderList (response) {
    let listHTML = response.map(function(item) {
        return `
            <p>${item.id} ${item.todo}</p>
        `
    });
    return listHTML.join("");
}