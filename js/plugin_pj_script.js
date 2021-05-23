const todolistUl = document.querySelector('.todolist .todolist__list');
let allTasks = todolistUl.querySelectorAll('li');
let todoButtons = document.querySelectorAll('.todolist__button');
const newTodoInput = document.querySelector('.todolist input[name="task"]');
const submitButton = document.querySelector('.todolist form .btn-submit');
let newValue;
const emptyTaskAlert = document.querySelector('.todolist .alert');

// reads value from main input and keeps it in newValue variable
newTodoInput.addEventListener("change", function (e) {
  newValue = e.target.value;
})

// creates new empty li item which is able to contain new todo
const createNewItem = () => {
  let parent = document.createElement("li");
  let todoWrapper = document.createElement("div");
  let editWrapper = document.createElement("div");
  let taskName = document.createElement("span");
  let buttonWrapper = document.createElement("div");
  let buttonCompleted = document.createElement("div");
  let buttonEdit = document.createElement("div");
  let buttonDelete = document.createElement("div");
  let editInput = document.createElement("input");
  let editButtonWrapper = document.createElement("div");
  let buttonSave = document.createElement("button");
  let buttonCancel = document.createElement("button");

  buttonSave.classList.add("btn");
  buttonSave.classList.add("btn-save");
  buttonSave.innerText = "Save";

  buttonCancel.classList.add("btn");
  buttonCancel.classList.add("btn-cancel");
  buttonCancel.innerText = "Cancel";

  editInput.setAttribute("type", "text");
  editInput.setAttribute("name", "task-edit");
  editInput.setAttribute("value", "");

  editButtonWrapper.classList.add("d-flex");
  editButtonWrapper.classList.add("flex-column");
  editButtonWrapper.classList.add("flex-md-row");

  todoWrapper.classList.add("todolist__single-todo-wrapper");
  todoWrapper.classList.add("d-flex");
  todoWrapper.classList.add("justify-content-between");
  todoWrapper.classList.add("align-items-center");

  editWrapper.classList.add("todolist__single-todo-edit");
  editWrapper.classList.add("d-none");

  buttonWrapper.classList.add("todolist__button-wrapper");
  buttonWrapper.classList.add("d-flex");
  buttonWrapper.classList.add("align-items-between");
  buttonWrapper.classList.add("align-items-md-center");
  buttonWrapper.classList.add("flex-column");
  buttonWrapper.classList.add("flex-md-row");

  buttonCompleted.classList.add("todolist__button");
  buttonCompleted.classList.add("todolist__button--completed");

  buttonEdit.classList.add("todolist__button");
  buttonEdit.classList.add("todolist__button--edit");

  buttonDelete.classList.add("todolist__button");
  buttonDelete.classList.add("todolist__button--delete");

  buttonWrapper.appendChild(buttonCompleted);
  buttonWrapper.appendChild(buttonEdit);
  buttonWrapper.appendChild(buttonDelete);
  todoWrapper.appendChild(taskName);
  todoWrapper.appendChild(buttonWrapper);
  editWrapper.appendChild(editInput);
  editButtonWrapper.appendChild(buttonSave);
  editButtonWrapper.appendChild(buttonCancel);
  editWrapper.appendChild(editButtonWrapper);
  parent.appendChild(todoWrapper);
  parent.appendChild(editWrapper);

  return parent;
}

// if newValue isn't empty, adds new item to ul list. If it's empty, removes d-none class from alert. It triggers loadButtons function so it can be followed with action on buttons inside each new li
const addNewItem = (e) => {
  e.preventDefault();
  if (newValue) {
    let newItem = createNewItem();
    newItem.querySelector('.todolist__single-todo-wrapper span').innerText = newValue;
    todolistUl.appendChild(newItem);
    allTasks = todolistUl.querySelectorAll('li');
    todoButtons = document.querySelectorAll('.todolist__button');
    loadbuttons();
    emptyTaskAlert.classList.add('d-none');
  } else {
    emptyTaskAlert.classList.remove('d-none');
  }
}

//adds new item, clears input and variable, so after multiple submit button being pressed it wont add more same todos
submitButton.addEventListener("click", function(e) {
  addNewItem(e);
  newTodoInput.value="";
  newValue="";
})

//if user press cancel button while editing, it adds d-none class to form and removes it from todo
const cancelButton = (item) => {
  const cancelBtn = item.querySelector('.todolist__single-todo-edit').querySelector('.btn-cancel');

  cancelBtn.addEventListener("click", function() {
      // item.querySelector('.todolist__single-todo-edit').classList.add('d-none');
      // item.querySelector('.todolist__single-todo-wrapper').classList.add('d-flex');
      // item.querySelector('.todolist__single-todo-wrapper').classList.remove('d-none');
      closeEdit(item);
    })
}

// function to hide editing form, and bring back todo
const closeEdit = (item) => {
  item.querySelector('.todolist__single-todo-wrapper').classList.remove('d-none');
  item.querySelector('.todolist__single-todo-wrapper').classList.add('d-flex');
  item.querySelector('.todolist__single-todo-edit').classList.add('d-none');
}

//asign value of existing todo to form
const editToDoValue = (valueToDo, input) => {
  input.value = valueToDo;
}

//function to save changes. If users todo has changed, function overwrites old span with new, it's same, it triggers closeEdit function.
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


// function which loads buttons from li. When user press delete, it removes current li, when presses completed, it adds completed class, when he press edit (and current todo isnt completed), it assign current value of span to variable singleTodoValue, then listen for changes from editToDoValue function.
const loadbuttons = () => {
  todoButtons.forEach(item => {
  item.addEventListener("click", function () {
    if (item.classList.contains('todolist__button--delete')) {
      item.parentElement.parentElement.parentElement.remove();
    } else if (item.classList.contains("todolist__button--completed")) {
      if (!item.parentElement.parentElement.parentElement.classList.contains('completed')) {
        item.parentElement.parentElement.parentElement.classList.add('completed');
      }
    } else if (item.classList.contains("todolist__button--edit")) {
        if (!item.parentElement.parentElement.parentElement.classList.contains('completed')) {
        const mainLi = item.parentElement.parentElement.parentElement;
        const toDoSpan = mainLi.querySelector('.todolist__single-todo-wrapper').querySelector('span');
        const singleTodoValue = toDoSpan.innerText;
        const inputTodo = mainLi.querySelector('.todolist__single-todo-edit').querySelector('input');

        mainLi.querySelector('.todolist__single-todo-edit').classList.remove('d-none');
        mainLi.querySelector('.todolist__single-todo-wrapper').classList.remove('d-flex');
        mainLi.querySelector('.todolist__single-todo-wrapper').classList.add('d-none');
        cancelButton(mainLi);
        editToDoValue(singleTodoValue, inputTodo);
        saveChanges(mainLi);
      }
    }
  })
})
}
