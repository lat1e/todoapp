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

}

// done
function makeDoneTodoItem(id) {

}

// test
addTodoItem("abc");
addTodoItem("bcd");
addTodoItem("cdf");
console.log(todoData);