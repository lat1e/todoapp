const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoListTbody = document.getElementById("todo-list-tbody");

// {id:1, content:"할일", done:false}
let todoData = [];
let lastId = 0;

function loadFromServer() {
fetch("http://127.0.0.1:3000/todos")
.then((response) => response.json())
.then((data) => {todoData = data; updateTodoScreen();});
}

function loadFromLocal() {
    if (localStorage.getItem("todoData")) {
        const data = JSON.parse(localStorage.getItem("todoData"));
        todoData = data.todoData;
        lastId = data.lastId;
        updateTodoScreen();
    }
}

// loadFromServer();
loadFromLocal();
function saveTodoData() {
    //saveToServer();
    saveToLocal();
}

// add
function addTodoItem(content) {
    todoData.push({
        id: lastId,
        content: content,
        done: false
    });
    lastId++;
    actionAfterUpdateTodo();
}

// delete
function deleteTodoItem(id) {
    for (const i in todoData){
        if (id === todoData[i].id) {
            todoData.splice(i, 1);
        }
    }
    actionAfterUpdateTodo();
}

// done
function updateDoneTodoItem(id, done) {
    for (const i in todoData){
        if (id === todoData[i].id) {
            todoData[i].done = done;
        }
    }
    actionAfterUpdateTodo();
}

function actionAfterUpdateTodo() {
    saveTodoData();
    updateTodoScreen();
}

function saveToLocal() {
    localStorage.setItem("todoData", JSON.stringify({
        todoData, lastId
    }));
}
function saveToServer() {
    const url = "http://127.0.0.1:3000/add";
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE 등
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
      });
}


function updateTodoScreen() {
    const trList = [];
/*
    for (const item of todoData){
        item.id = 3 
    }

    for (const i in todoData) {
        const item = todoData[i];
        item.id = 3
    }

    for (let i=0; i<todoData.length; i++){
        const item = todoData[i];
        item.id = 3
    }
*/
    for (const item of todoData){
        let tr = document.createElement("tr");
        let tdCheckbox = document.createElement("td");
        let tdContent = document.createElement("td");
        let tdDelbutton = document.createElement("td");
        tdCheckbox.className = "cell-min";
        tdDelbutton.className = "cell-min";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "done" + item.id;
        checkbox.className = "done-checkbox";

        checkbox.checked = item.done;
        tdCheckbox.append(checkbox);
        
        tdContent.innerText = item.content;
        if (item.done === true) {
            tdContent.classList.add("todo-done-item");
        }

        let button = document.createElement("button");
        button.innerHTML = '<i class="bi bi-trash"></i>';
        button.className = "btn btn-outline-danger";
        tdDelbutton.append(button);

        checkbox.addEventListener("change", function(){
            updateDoneTodoItem(item.id, checkbox.checked);
        });

        button.addEventListener("click", function(){
            deleteTodoItem(item.id);
        });

        tr.append(tdCheckbox, tdContent, tdDelbutton);
        trList.push(tr);
    }
    todoListTbody.replaceChildren(...trList);
}

todoButton.addEventListener("click", function() {
    addTodoItem(todoInput.value);
    todoInput.value = "";
    todoInput.focus();
})

todoInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTodoItem(todoInput.value);
        todoInput.value = "";
    }
})