const form = document.querySelector(".form");
const input = document.querySelector(".input");
const tasks = document.querySelector('.tasks')
const p = document.createElement("p");
const result = document.querySelector('.result');
function removeTask ({target}) {
    if (target.parentNode) {
        target.parentNode.remove();
    }

}
const createTask = (value) => {
    const div = document.createElement('div');
    div.classList.add('task');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = value;
    checkbox.classList.add('check')
    div.appendChild(checkbox);
    const label = document.createElement('label');
    label.htmlFor = value;
    label.textContent = value;
    label.classList.add('taskName');
    div.appendChild(label);
    const icon = document.createElement('button');
    icon.classList.add('trash');
    icon.addEventListener('click', removeTask)
    div.appendChild(icon);
    tasks.appendChild(div);
};
const addError = () => {
  p.textContent = "Insira um valor";
  p.classList.add("emptyInput");
  form.insertAdjacentElement("afterend", p);
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
};
form.addEventListener("submit", handleSubmit);
input.addEventListener("input", handleChange);
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
