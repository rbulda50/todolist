import { nanoid } from "nanoid";

const refs = {
    todoForm: document.querySelector('.todo-form'),
    todoInput: document.querySelector('.todo-input'),
    todoListItems: document.querySelector('.todo-items'),
};

refs.todoForm.addEventListener('submit', submitForm);
refs.todoListItems.addEventListener('click', toggleOrDeleteTask);

let tasks = [];

function submitForm(e) {
    e.preventDefault();
    addTodo(refs.todoInput.value);
    refs.todoInput.value = '';
};

function addTodo(item) {
    if (item) {
        const task = { id: nanoid(), value: item, done: false };

        tasks.push(task);
        addToLocalStorage(tasks);
    };
};

function renderTasks(tasks) {
    refs.todoListItems.innerHTML = '';
    tasks.forEach(item => { 
    const checked = item.done ? 'checked' : null;
    
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-id', item.id);

        if (item.done === true) { 
            li.classList.add('checked'); 
        };

        li.innerHTML = ` 
            <input type="checkbox" class="checkbox" ${checked}> 
            ${item.value} 
            <button class="delete-button">X</button> 
        `; 
    refs.todoListItems.append(li); 
    });
};

function addToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
};

function getFromLocalStorage() {
    const refs = localStorage.getItem('tasks');
    if (refs) {
        tasks = JSON.parse(refs);
        renderTasks(tasks);
    };
};

getFromLocalStorage();

function toggleOrDeleteTask(e) {
    if (e.target.type === 'checkbox') {
        toggle(e.target.parentElement.getAttribute('data-id'));
    };
    if (e.target.classList.contains('delete-button')) {
        deleteTask(e.target.parentElement.getAttribute('data-id'))
    };
};

function toggle(id) {

    tasks.forEach(item => {
        if (id === item.id) {
            item.done = !item.done;
        };
    });
    addToLocalStorage(tasks);
};

function deleteTask(id) {
    tasks = tasks.filter(item => {
        // return item.id != id;
        if (item.id !== id) {
            return item.id;
        };
    })
    addToLocalStorage(tasks);
};