// {id:1, content:"할일", done:false}
let todoData = [];
let lastId = 0;

if (localStorage.getItem("todoData")) {
    todoData = JSON.parse(localStorage.getItem("todoData"));
    lastId = JSON.parse(localStorage.getItem("lastId"));
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
    saveTodoData()
}

function saveTodoData() {
    localStorage.setItem("todoData", JSON.stringify(todoData));
    localStorage.setItem("lastId", JSON.stringify(lastId));
}

/* test
addTodoItem("abc");
addTodoItem("bcd");
addTodoItem("cdf");
console.log(JSON.stringify(todoData));
deleteTodoItem(1);
console.log(todoData);
updateDoneTodoItem(0, true); */