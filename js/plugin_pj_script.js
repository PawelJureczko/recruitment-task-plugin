const onlyForTest = document.querySelector('.todolist .todolist__list');
const allTasks = onlyForTest.querySelectorAll('li');
const todoButtons = document.querySelectorAll('.todolist__button');


todoButtons.forEach(item => {

  item.addEventListener("click", function () {
    if (item.classList.contains('todolist__button--delete')) {
      item.parentElement.parentElement.remove();
    } else if (item.classList.contains("todolist__button--completed")) {
      item.parentElement.parentElement.classList.toggle('completed');
    }
  })
})

// allTasks.forEach(item =>
//   item.addEventListener("click", function() {
//     console.log('hi');


//   }));
