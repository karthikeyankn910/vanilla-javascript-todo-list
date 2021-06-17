const input = document.querySelector('.input-field');
const submitBtn = document.querySelector('.submit-btn');
const todoList = document.querySelector('.todo-lists');
const status = document.querySelector('.status');
let tot = 0;
let comp = 0;
let notComp = 0;
let total = document.querySelector('.total');
let completed = document.querySelector('.completed');
let notCompleted = document.querySelector('.not-completed'); 



submitBtn.addEventListener('click', addTodo); 
todoList.addEventListener ('click', checkDeleteTodo);
input.addEventListener('keydown', (e) => {  
    if(e.code !== 'Enter') 
    status.style.display = 'block';
    else 
    status.style.display = 'none';
}); 
document.addEventListener('DOMContentloaded', getLocalStorageTodos());


function addTodo(e) {
    e.preventDefault();
    if (input.value.trim() != '') {

        const newTodo = document.createElement('div');
        newTodo.classList.add('todo');
 
        const msg = document.createElement('span');
        msg.classList.add('message');
        msg.innerText = input.value;

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn')
        completeBtn.innerText = 'O';

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerText = 'X';
        
        newTodo.appendChild(msg);
        newTodo.appendChild(completeBtn);
        newTodo.appendChild(deleteBtn);
        
        todoList.append(newTodo); 
        
        tot++; 
        notComp++;
        total.innerText = tot;  
        notCompleted.innerText = notComp;  
         
        addInLocalStorage(input.value);
        updateCounts();
        
        input.value = '';
    }
} 



function checkDeleteTodo(e) { 
    const clicked = e.target;  
    const clickedText = e.target.parentElement.children[0].innerText;
    console.log (clickedText);
    if (clicked.classList.contains('complete-btn')) {
        clicked.parentElement.classList.toggle('strikeit');  
        console.log (clicked);
        if (clicked.classList.contains('pressed')) { 
            comp--;
            notComp++; 
        }
        else {
            comp++;
            notComp--;
        }
        completed.innerText = comp;
        notCompleted.innerText = notComp;
        clicked.classList.toggle('pressed'); 
        updateStatusInLocalStorage(clickedText);
        updateCounts();
    } 
    if(clicked.classList.contains('delete-btn')) { 
        removeLocalStorageTodo(clickedText);
        clicked.parentElement.classList.add('delete-anim');
        clicked.parentElement.addEventListener('transitionend', () => {
            clicked.parentElement.remove();
        }); 
        if (clicked.previousSibling.classList.contains('pressed')) {
            comp--;
            completed.innerText = comp;   
        }
        else { 
            notComp--;
            notCompleted.innerText = notComp;
        }
        tot--;
        total.innerText = tot; 
        updateCounts();
    }  
}




function addInLocalStorage (val) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    let data = {
        txt: input.value, 
        status: false
    }
    todos.push(data); 
    localStorage.setItem('todos', JSON.stringify(todos));  
}


function updateStatusInLocalStorage(val) { 
    let todos = JSON.parse(localStorage.getItem('todos')); 
    todos.map((todo) => { 
        if (todo.txt === val) {
            todo.status = !todo.status;
        }
    }); 
    localStorage.setItem('todos', JSON.stringify(todos));
    updateCounts();
}

function updateCounts() { 
    localStorage.setItem('total', tot);
    localStorage.setItem('completed', comp);
    localStorage.setItem('notCompleted', notComp); 
}

function removeLocalStorageTodo(todo) { 
    let todos = JSON.parse(localStorage.getItem('todos'));
    let newTodos = todos.filter(t => t.txt != todo); 
    localStorage.setItem('todos', JSON.stringify(newTodos));
}


function updateUI () {
    total.innerText = tot;
    completed.innerText = comp;
    notCompleted.innerText = notComp;
}
function getLocalStorageTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
        comp = 0;
        notComp = 0;
        tot = 0;
        updateUI();
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
        tot = localStorage.getItem('total');
        comp = localStorage.getItem('completed');
        notComp = localStorage.getItem('notCompleted');
        updateUI();
    }
    todos.forEach(todo => {
        const newTodo = document.createElement('div');
        newTodo.classList.add('todo');  

        const msg = document.createElement('span');
        msg.classList.add('message');
        msg.innerText = todo.txt;
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn')
        completeBtn.innerText = 'O';
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerText = 'X';

        newTodo.appendChild(msg);
        newTodo.appendChild(completeBtn);
        newTodo.appendChild(deleteBtn);

        todoList.append(newTodo);
        if (todo.status) {
            newTodo.classList.add('strikeit')
            completeBtn.classList.add('pressed');
        }
    });
    
}

