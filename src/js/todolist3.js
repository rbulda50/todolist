import { nanoid } from "nanoid";


const tasksContainer = document.querySelector('.tasks');

tasksContainer.innerHTML = `
    <form class="todo-list">
    <header class="header">
        <input class="header__input" type="text" placeholder="Enter an activity..">
        <button type="submit" class="header__button"><i class="fa fa-plus"></i></button>
    </header>
    <main class="list-container">
        <ul class="list current-list"></ul>
        <ul class="list done-list"></ul>
    </main>
    </form>
`

const refs = {
    todoForm: document.querySelector('.todo-list'),
    inputForm: document.querySelector('.header__input'),
    listContainer: document.querySelector('.list-container'),
    currentList: document.querySelector('.current-list'),
    doneList: document.querySelector('.done-list'),
}

refs.todoForm.addEventListener('submit', onFormSubmit);
refs.listContainer.addEventListener('click', taskContainerOnClick);

let tasks = [];

function onFormSubmit(e) {
    e.preventDefault();
    addTodo(refs.inputForm.value);
    refs.inputForm.value = '';
};

function addTodo(value) {
    if (value) {
        const task = { id: nanoid(), value: value, done: false };
        tasks.push(task);
        addToLocalStorage(tasks);
    };
};

function addToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
};

function getFromLocalStorage() {
    const tasksRefs = localStorage.getItem('tasks');
    if (tasksRefs) {
        tasks = JSON.parse(tasksRefs);
        renderTasks(tasks);
    };
};
getFromLocalStorage();

function renderTasks() {
    const getItem = ({ id, value, done }) => 
            `
    <li class="list__item" data-id="${id}" data-done="${done}">
        <span class="list__item-name">${value}</span>
        <div class="list__buttons">
          <i class="list__button remove fa fa-trash-o" data-action="remove"></i>
          <span class="list__bar">|</span>
          <i 
            class="${`list__button fa ${done ? 'uncomplete fa-check-circle' : 'complete fa-check-circle-o'}`}"
            data-action="toggle"
          ></i>
        </div>
     </li>
    `
        const todoTasks = tasks.filter(({ done }) => !done);
        const doneTasks = tasks.filter(({ done }) => done);

        refs.currentList.innerHTML = todoTasks.map(getItem).join('');
        refs.doneList.innerHTML = doneTasks.map(getItem).join('');
};

function updateTasks(tasks) {
    tasks = tasks;
    addToLocalStorage(tasks);
    getFromLocalStorage();
};

function taskContainerOnClick(e) {
    const taskRef = e.target.closest('.list__item[data-id]');
    // console.log(taskRef);
    if (taskRef) {
        if (e.target.dataset.action === "toggle") {
            toggleTask(taskRef.dataset.id);
            // console.log(taskRef.dataset.id);
        };

        if (e.target.dataset.action === 'remove') {
            removeTask(taskRef.dataset.id);
        };
    };
}

function toggleTask(id) {
    const items = tasks.map((task) => {
        if (task.id === id) {
            return {
                ...task,
                done: !task.done,
            }
        };
        return task;
    });
        updateTasks(items);
};

function removeTask(id) {
    const items = tasks.filter(item => {
        return item.id !== id;
    })
    updateTasks(items);
}