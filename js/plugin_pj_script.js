const onlyForTest = document.querySelector('.todolist .todolist__list');
const allTasks = onlyForTest.querySelectorAll('li');


allTasks.forEach(item =>
  item.addEventListener("click", function() {
    console.log(item);
  }));
