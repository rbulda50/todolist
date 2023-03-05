import localStore from '../js-modules/local-save-service';

const refs = {
    input: document.querySelector('.textarea'),
    btn: document.querySelector('.buttoninput'),
    list: document.querySelector('.todolist'),
};

const STORAGE_KEY = 'TODO_LIST_ITEMS';

refs.btn.addEventListener('click', onAddTask);
refs.list.addEventListener('click', checkOrDelTask);

function onAddTask(e) {
    e.preventDefault();
    addTask();
};

function addTask() {
    const items = [];
    const inputValue = refs.input.value;
    if (inputValue) {
        items.push({ value: inputValue })
        const taskMarkup = items.map(item => {
            return `
        <div class="itemall">
            <p class="item">${item.value}</p>
            <button class="check-button">
                <i class="fa-solid fa-check"></i>
            </button>
            <button class="trash-button">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
        }).join('');
        refs.list.insertAdjacentHTML('beforeend', taskMarkup);
    };
};


function checkOrDelTask(e) {
    const item = e.target;

    if (item.classList.value === 'check-button') {
        item.parentElement.classList.add('checklist')
    } else if (item.classList.value === 'trash-button') {
        item.parentElement.remove();
    };
};