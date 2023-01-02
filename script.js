// {id:1, content:"할일", done:false}
const todoData = [];
let lastId = 0;

// add
function addTodoItem(content) {
    todoData.push({
        id: lastId,
        content: content,
        done: false
    });
    lastId++;
}

// delete
function deleteTodoItem(id) {
    for (const i in todoData){
        if (id === todoData[i].id) {
            todoData.splice(i, 1);
        }
    }
}

// done
function makeDoneTodoItem(id) {

}

// test
addTodoItem("abc");
addTodoItem("bcd");
addTodoItem("cdf");
console.log(JSON.stringify(todoData));
deleteTodoItem(1);
console.log(todoData);