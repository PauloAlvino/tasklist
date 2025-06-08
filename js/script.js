const form = document.querySelector(".form");
const input = document.querySelector(".input");
const tasks = document.querySelector(".tasks");
const p = document.createElement("p");
const massRemoveButton = document.getElementById("massRemoveButton");
const result = document.querySelector(".result");
let checkedList = [];
function removeTask({ target }) {
  if (target.parentNode) {
    target.parentNode.remove();
    resultTask("tarefa removida com sucesso", "red");
  }
  saveTasks();
}
const massRemoveTask = () => {
  checkedList.forEach((id) => {
    const checkbox = document.getElementById(id);
    if (checkbox.parentNode) {
      checkbox.parentNode.remove();
    }
  });
  checkedList = [];
  massRemoveButton.style.display = "none";
  resultTask("tarefas removidas com sucesso", "red");
  saveTasks();
};
const addCheckedItems = ({ target }) => {
  if (target.checked) {
    checkedList.push(target.id);
  } else {
    const newCheckedList = checkedList.filter((item) => item !== target.id);
    checkedList = [...newCheckedList];
  }
  if (checkedList.length >= 2) {
    massRemoveButton.style.display = "block";
  } else {
    massRemoveButton.style.display = "none";
  }
  console.log(checkedList);
};
const excludeResult = ({ target }) => {
  if (target.parentNode) {
    result.innerHTML = "";
    result.style.padding = 0;
  }
};
const exitButton = () => {
  const button = document.createElement("button");
  button.classList.add("exit");
  button.addEventListener("click", excludeResult);
  return button;
};
const createTask = (value) => {
  const div = document.createElement("div");
  div.classList.add("task");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = value;
  checkbox.classList.add("check");
  checkbox.addEventListener("change", addCheckedItems);
  div.appendChild(checkbox);
  const label = document.createElement("label");
  label.htmlFor = value;
  label.textContent = value;
  label.classList.add("taskName");
  div.appendChild(label);
  const icon = document.createElement("button");
  icon.classList.add("trash");
  icon.addEventListener("click", removeTask);
  div.appendChild(icon);
  tasks.appendChild(div);

  saveTasks();
};
const addError = () => {
  p.textContent = "Insira um valor";
  p.classList.add("emptyInput");
  form.insertAdjacentElement("afterend", p);
};

const resultTask = (text, background) => {
  result.innerHTML = "";
  const textResult = document.createElement("span");
  textResult.classList.add("resultText");
  textResult.textContent = text.toUpperCase();
  let button = exitButton();
  result.appendChild(textResult);
  result.appendChild(button);
  result.style.background = background;
  result.style.padding = ".5rem 1rem";
};

const saveTasks = () => {
  const taskTexts = Array.from(document.querySelectorAll(".taskName")).map(item => item.textContent);
  localStorage.setItem("tasks", JSON.stringify(taskTexts));
};
const loadTasks = () => {
  const tasksFromStorage = JSON.parse(localStorage.getItem("tasks")) || [];
  tasksFromStorage.forEach((taskText) => {
    createTask(taskText);
  });
};
const handleChange = ({ target }) => {
  if (target) {
    p.textContent = "";
    if (p.parentNode) {
      p.parentNode.removeChild(p);
    }
  }
};
const handleSubmit = (e) => {
  e.preventDefault();
  if (input.value === "") {
    addError();
    return false;
  }
  p.textContent = "";
  if (p.parentNode) {
    p.parentNode.removeChild(p);
  }
  createTask(input.value);
  input.value = "";
  resultTask("tarefa adicionada com sucesso", "rgb(2, 139, 2)");
};
form.addEventListener("submit", handleSubmit);
input.addEventListener("input", handleChange);
massRemoveButton.addEventListener("click", massRemoveTask);
input.addEventListener("blur", ({ target }) => {
  if (target.value.trim() === "") {
    addError();
  } else {
    p.textContent = "";
    if (p.parentNode) {
      p.parentNode.removeChild(p);
    }
  }
});
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});
