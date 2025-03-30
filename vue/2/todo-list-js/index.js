const tasks = [];

function addTask() {
  const newTask = document.getElementById('new-task').value;
  if (newTask.trim() !== '') {
    const taskId = Date.now(); // Создаем уникальный ID для задачи
    tasks.push({ id: taskId, task: newTask, completed: false });
    
    const listItem = createTaskElement(taskId, newTask, false);
    document.getElementById('todo-list').appendChild(listItem);
    document.getElementById('new-task').value = '';
  }
}

function createTaskElement(id, taskText, completed) {
  const listItem = document.createElement('li');
  listItem.className = 'todo-item';
  listItem.dataset.id = id;
  
  if (completed) {
    listItem.classList.add('completed');
  }

  const taskContainer = document.createElement('div');
  taskContainer.className = 'task-container';

  const taskNameElement = document.createElement('span');
  taskNameElement.innerText = taskText;
  taskContainer.appendChild(taskNameElement);


  const renameButton = document.createElement('button');
  renameButton.innerHTML = '✏️';
  renameButton.className = 'rename-btn';
  renameButton.addEventListener('click', (e) => {
    e.stopPropagation(); 
    renameTask(id);
  });

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '❌';
  deleteButton.className = 'delete-btn';
  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation(); 
    deleteTask(id);
  });

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttons-container';
  buttonsContainer.appendChild(renameButton);
  buttonsContainer.appendChild(deleteButton);

  listItem.appendChild(taskContainer);
  listItem.appendChild(buttonsContainer);

  listItem.addEventListener('click', function () {
    toggleTaskCompletion(id);
  });

  return listItem;
}

function deleteTask(id) {
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }
  
  const taskElement = document.querySelector(`.todo-item[data-id="${id}"]`);
  if (taskElement) {
    taskElement.remove();
  }
}

function renameTask(id) {
  const task = tasks.find(task => task.id === id);
  if (!task) return;
  
  const newName = prompt('Введите новое название задачи:', task.task);
  if (newName && newName.trim() !== '') {
    task.task = newName.trim();
    
    const taskElement = document.querySelector(`.todo-item[data-id="${id}"]`);
    if (taskElement) {
      taskElement.querySelector('span').innerText = newName.trim();
    }
  }
}

function toggleTaskCompletion(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    const taskElement = document.querySelector(`.todo-item[data-id="${id}"]`);
    if (taskElement) {
      taskElement.classList.toggle('completed');
    }
  }
}

document.getElementById('add-button').onclick = addTask;