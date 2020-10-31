//Selector
const todoButton = document.querySelector('.todo-button');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodo);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', processClick);

//Functions

function addTodo(event){
    event.preventDefault();

    //Create Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    saveTodo(todoInput.value);
    todoDiv.appendChild(newTodo);

    //Check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-button');
    todoDiv.appendChild(completedButton);

    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-button');
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear input
    todoInput.value = '';

}


function processClick(event){
    const item = event.target;

    //Delete Todo
    if(item.classList[0]==='trash-button'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function(){
            deleteLocalTodo(todo);
            todo.remove();
        })
    }
    
    //Complete Todo
    if(item.classList[0]==='complete-button'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function saveTodo(todo){
    let todos;
    if(localStorage.getItem('todos')){
        todos = JSON.parse(localStorage.getItem('todos'));    
    }else{
        todos = [];
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodo(event){
    let todos;
    if(localStorage.getItem('todos')){
        todos = JSON.parse(localStorage.getItem('todos'));    
    }else{
        todos = [];
    }

    todos.forEach(todo=>{
        //Create Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Check button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-button');
        todoDiv.appendChild(completedButton);

        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-button');
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);
    });
}

function deleteLocalTodo(todo){
    let todos;
    if(localStorage.getItem('todos')){
        todos = JSON.parse(localStorage.getItem('todos'));    
    }else{
        todos = [];
    }

    console.log(todos);

    const todoItem = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoItem, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}