const getList = document.getElementById('lista-tarefas');
const getInputText = document.getElementById('texto-tarefa');
const getAddTask = document.getElementById('criar-tarefa');
const getResetButton = document.getElementById('apaga-tudo');
const getRemoveCompletedButton = document.getElementById('remover-finalizados');
const getSaveButton = document.getElementById('salvar-tarefas');
const getMoveUpButton = document.getElementById('mover-cima');
const getMoveDownButton = document.getElementById('mover-baixo');
const getRemoveSelectedTaskButton = document.getElementById(
  'remover-selecionado'
);

const selectedLine = () => {
  const getLines = document.getElementsByClassName('task');
  for (let index = 0; index < getLines.length; index += 1) {
    getLines[index].classList.remove('selected');
  }
};

const doubleClickedLine = (element) => {
  if (element.classList.contains('completed')) {
    element.classList.remove('completed');
  } else {
    element.classList.add('completed');
  }
};

const paintList = (element) => {
  element.addEventListener('click', (event) => {
    selectedLine();
    event.target.classList.add('selected');
  });
};

const completedTask = (element) => {
  element.addEventListener('dblclick', (event) => {
    doubleClickedLine(event.target);
  });
};

const addTask = (place) => {
  getAddTask.addEventListener('click', () => {
    const myTask = getInputText.value;
    const myLine = document.createElement('li');
    myLine.className = 'task list-group-item';
    paintList(myLine);
    completedTask(myLine);
    myLine.innerHTML = myTask;
    place.appendChild(myLine);
    getInputText.value = '';
  });
};

addTask(getList);

const eraseData = () => {
  const getLines = document.getElementsByClassName('task');
  for (let index = getLines.length - 1; index >= 0; index -= 1) {
    getLines[index].remove();
  }
};

const pressResetButton = () => {
  getResetButton.addEventListener('click', eraseData);
};

pressResetButton();

const removeCompletedTasks = () => {
  getRemoveCompletedButton.addEventListener('click', () => {
    const getCompletedTasks = document.getElementsByClassName('completed');
    for (let index = getCompletedTasks.length - 1; index >= 0; index -= 1) {
      getCompletedTasks[index].remove();
    }
  });
};

removeCompletedTasks();

const saveTasks = () => {
  getSaveButton.addEventListener('click', () => {
    const myTasks = getList.innerHTML;
    localStorage.setItem('myTasks', myTasks);
  });
};

saveTasks();

const moveTaskUp = () => {
  getMoveUpButton.addEventListener('click', () => {
    const getLines = document.getElementsByClassName('task');
    for (let index = 0; index < getLines.length; index += 1) {
      if (
        getLines[index].classList.contains('selected') &&
        getLines[index - 1]
      ) {
        let mySelectedText = getLines[index].innerHTML;
        let myUpperText = getLines[index - 1].innerHTML;
        getLines[index - 1].innerHTML = mySelectedText;
        getLines[index].innerHTML = myUpperText;
        getLines[index].classList.remove('selected');
        getLines[index - 1].classList.add('selected');
      }
    }
  });
};

moveTaskUp();

const moveTaskDown = () => {
  getMoveDownButton.addEventListener('click', () => {
    const getLines = document.getElementsByClassName('task');
    for (let index = getLines.length - 1; index >= 0; index -= 1) {
      if (
        getLines[index].classList.contains('selected') &&
        getLines[index + 1]
      ) {
        let mySelectedText = getLines[index].innerHTML;
        let myDownnerText = getLines[index + 1].innerHTML;
        getLines[index + 1].innerHTML = mySelectedText;
        getLines[index].innerHTML = myDownnerText;
        getLines[index].classList.remove('selected');
        getLines[index + 1].classList.add('selected');
      }
    }
  });
};

moveTaskDown();

const removeSelectedTask = () => {
  const getLine = document.querySelector('.selected');
  getLine.remove();
};

const pressRemoveSelectedButton = () => {
  getRemoveSelectedTaskButton.addEventListener('click', removeSelectedTask);
};

pressRemoveSelectedButton();

window.onload = () => {
  const savedTasks = localStorage.getItem('myTasks');
  if (savedTasks) {
    getList.innerHTML = savedTasks;
    const getLines = document.getElementsByClassName('task');
    for (let index = 0; index < getLines.length; index += 1) {
      paintList(getLines[index]);
      completedTask(getLines[index]);
    }
  }
};
