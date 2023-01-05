const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoListTbody = document.getElementById("todo-list-tbody");

// {id:1, content:"할일", done:false}
let todoData = [];
let lastId = 0;

if (localStorage.getItem("todoData")) {
    const data = JSON.parse(localStorage.getItem("todoData"));
    todoData = data.todoData;
    lastId = data.lastId;
    updateTodoScreen();
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

function saveTodoData() {
    localStorage.setItem("todoData", JSON.stringify({
        todoData, lastId
    }));
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
        checkbox.checked = item.done;
        tdCheckbox.append(checkbox);
        
        tdContent.innerText = item.content;
        if (item.done === true) {
            tdContent.classList.add("todo-done-item")
        }

        let button = document.createElement("button");
        button.innerHTML = '<i class="bi bi-trash-fill"></i>';
        button.className = "btn btn-danger";
        tdDelbutton.append(button);

        checkbox.addEventListener("change", function(){
            updateDoneTodoItem(item.id, checkbox.checked);
        });

        button.addEventListener("click", function(){
            deleteTodoItem(item.id);
        });

        tr.append(tdCheckbox, tdContent, tdDelbutton);
        trList.push(tr)
    }
    todoListTbody.replaceChildren(...trList);
}

todoButton.addEventListener("click", function() {
    addTodoItem(todoInput.value);
    todoInput.value = "";
    todoInput.focus();
})