const todoInp = document.getElementById("todo-input");
const todoBut = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");

let todoData = [];
let lastId = 0;

if (localStorage.getItem("todoData")) {
    todoData = JSON.parse(localStorage.getItem("todoData"));
    lastId = localStorage.getItem("lastId");
    updateTodoListScreen();
}


function updateTodoListScreen() {
    console.log(todoData);
    const todoUl = document.createElement("ul");

    for (const item of todoData) {
        const list = document.createElement("li");
        //체크박스 생성
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = item.done;
        list.appendChild(checkBox);
        //컨텐츠 생성
        const todoContent = document.createElement("span");
        todoContent.innerText = item.contents;
        if (item.done === true) {
            todoContent.style.textDecoration = "line-through";
        } else {
            todoContent.style.textDecoration = "none";

        }
        list.appendChild(todoContent);
        //삭제버튼 생성
        const delButton = document.createElement("button");
        delButton.textContent = "x";
        list.appendChild(delButton);
        
        // 이벤트리스너
        checkBox.addEventListener("change", function () {
            if (checkBox.checked) {
                item.done = true;
            } else {
                item.done = false;
            }
            updateTodoListScreen();
            saveTodoData();
        })
        
        delButton.addEventListener("click", function () {
            deleteItem(item.id);
        })

        todoUl.appendChild(list);
    }

    todoList.replaceChildren(todoUl);
    todoInp.value = "";
}

function addItem() {
    if (todoInp.value === "") { return;
    } else {
    todoData.push({id: lastId++, contents: todoInp.value, done: false });
    updateTodoListScreen();
    saveTodoData();
    }
}

function deleteItem(id) {
    for (const item of todoData) {
        if (item.id === id) {
            todoData.splice(todoData.indexOf(item), 1);
        }
    }
    updateTodoListScreen();
    saveTodoData();
}

function saveTodoData() {
    localStorage.setItem("todoData", JSON.stringify(todoData));
    localStorage.setItem("lastId", lastId);
}

todoBut.addEventListener("click", addItem);
todoInp.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addItem();
    }
})