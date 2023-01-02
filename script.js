const todoInp = document.getElementById("todo-input");
const todoBut = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");

let todoData = [
    "할일1",
    "할일2"
];


function updateTodoListScreen() {
    console.log(todoData);
    const todoUl = document.createElement("ul");

    for (const item of todoData) {
        const list = document.createElement("li");
        //체크박스 생성
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        list.appendChild(checkBox);
        //컨텐츠 생성
        const todoContent = document.createElement("span");
        todoContent.innerText = item
        list.appendChild(todoContent);
        //삭제버튼 생성
        const delButton = document.createElement("button");
        delButton.textContent = "x";
        list.appendChild(delButton);

        todoUl.appendChild(list);
    }

    todoList.replaceChildren(todoUl);
    todoInp.value = "";
}

function addItem() {
    if (todoInp.value === "") { return;
    } else {
    todoData.push(todoInp.value);
    updateTodoListScreen();
    }
}

todoBut.addEventListener("click", addItem);
todoInp.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addItem();
    }
})

/*
        todoInp.value = "";
        todoList.appendChild(list);


        checkBox.addEventListener("change", function () {
            if (checkBox.checked) {
                todoContent.style.textDecoration = "line-through";
            } else {
                todoContent.style.textDecoration = "none";
            }
        })

        delButton.addEventListener("click", function () {
        todoList.removeChild(list);
        })
*/