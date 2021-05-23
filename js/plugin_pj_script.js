const todolistUl = document.querySelector('.todolist .todolist__list');
let allTasks = todolistUl.querySelectorAll('li');
let todoButtons = document.querySelectorAll('.todolist__button');
const newTodoInput = document.querySelector('.todolist input[name="task"]');
const submitButton = document.querySelector('.todolist form .btn-submit');




submitButton.addEventListener("click", function(e) {
  e.preventDefault();
  let newClone = todolistUl.querySelector('li').cloneNode(true);
  todolistUl.appendChild(newClone);
  allTasks = todolistUl.querySelectorAll('li');
  todoButtons = document.querySelectorAll('.todolist__button');
  loadbuttons();
  console.log(allTasks);
})


const cancelButton = (item) => {
  const editButton = item.querySelector('.todolist__single-todo-edit').querySelector('.btn-cancel');

  editButton.addEventListener("click", function() {
      item.querySelector('.todolist__single-todo-edit').classList.add('d-none');
      item.querySelector('.todolist__single-todo-wrapper').classList.add('d-flex');
      item.querySelector('.todolist__single-todo-wrapper').classList.remove('d-none');
  })
}

const closeEdit = (item) => {
  item.querySelector('.todolist__single-todo-wrapper').classList.remove('d-none');
  item.querySelector('.todolist__single-todo-wrapper').classList.add('d-flex');
  item.querySelector('.todolist__single-todo-edit').classList.add('d-none');
}

const editToDoValue = (valueToDo, input) => {
  input.value = valueToDo;
}

const saveChanges = (item) => {
  const saveButton = item.querySelector('.todolist__single-todo-edit').querySelector('.btn-save');
  const inputValue = item.querySelector('input');
  let hasChanged = false;
  let finalValue;

  const proceedChanges = (hasChanged, item) => {
    if (hasChanged) {
      item.querySelector('.todolist__single-todo-wrapper').querySelector('span').innerText = finalValue;
      closeEdit(item);
    } else {
      closeEdit(item);
    }
  }


  inputValue.addEventListener("change", function(e) {
    finalValue = e.target.value;
    hasChanged = true;
  })

  inputValue.addEventListener("keyup", function(e) {
    if(e.keyCode === 13) {
      proceedChanges(hasChanged, item);
    }
  })

  saveButton.addEventListener('click', function() {
    proceedChanges(hasChanged, item);
  })

}

const loadbuttons = () => {
  todoButtons.forEach(item => {

  item.addEventListener("click", function () {
    if (item.classList.contains('todolist__button--delete')) {
      item.parentElement.parentElement.parentElement.remove();
    } else if (item.classList.contains("todolist__button--completed")) {
      item.parentElement.parentElement.parentElement.classList.toggle('completed');
    } else if (item.classList.contains("todolist__button--edit")) {
      const mainLi = item.parentElement.parentElement.parentElement;
      const toDoSpan = mainLi.querySelector('.todolist__single-todo-wrapper').querySelector('span');
      const singleTodoValue = toDoSpan.innerText;
      const inputTodo = mainLi.querySelector('.todolist__single-todo-edit').querySelector('input');

      mainLi.querySelector('.todolist__single-todo-edit').classList.remove('d-none');
      mainLi.querySelector('.todolist__single-todo-wrapper').classList.remove('d-flex');
      mainLi.querySelector('.todolist__single-todo-wrapper').classList.add('d-none');
      cancelButton(mainLi);
      editToDoValue(item, singleTodoValue, inputTodo);
      saveChanges(mainLi);
    }

  })
})
}

loadbuttons();
