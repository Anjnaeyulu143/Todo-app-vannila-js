/**
 * Arr of colors to generate random colors the eachItem borderColor
 */

let colors = [
  "#df5515",
  "#dfb715",
  "#badf15",
  "#44df15",
  "#15dfba",
  "#1569df",
  "#b715df",
  "#df15d5",
  "#df155f",
  "#df1515",
  "#380868",
];

let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let todoSaveButton = document.getElementById("todoSaveButton");

/**
 * @returns {Array} which is fetches arr of todos from the localStorage
 */

function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);

  if (parsedTodoList === null) {
    return [];
  }
  return parsedTodoList;
}

let todos = getTodoListFromLocalStorage();
let todosCount = todos.length;

/**
 * Saving all todos into the local storage
 */
todoSaveButton.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todos));
};

function onAddTodo() {
  let todoUserInput = document.getElementById("todoUserInput");
  let todoUserInputValue = todoUserInput.value;

  if (todoUserInputValue === "") {
    alert("Enter Valid Text");
    return;
  }

  /**
   * Generating random id
   */

  todosCount = Math.floor(Math.random() * 1000) + 1;

  /**
   * Creating New Todo
   */

  let newTodo = {
    id: todosCount,
    title: todoUserInputValue,
    isChecked: false,
  };

  /**
   * Appending newTodo into Todo's Arr
   */

  todos.push(newTodo);
  createAndApendTodo(newTodo);
  alert(`You want to add ${todoUserInputValue} into your todo's`);
  todoUserInput.value = "";
}

addTodoButton.onclick = function () {
  onAddTodo();
};

function findTodoObjectIndex(todoId) {
  let todoObjectIndex = todos.findIndex(function (eachTodo) {
    let eachTodoId = "todo" + eachTodo.id;

    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  return todoObjectIndex;
}

/**
 * @param {string} todoId
 * @param {string} checkboxId
 * @param {string} labelId
 */

function onTodoStatusChange(todoId, checkboxId, labelId) {
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle("checked");

  let todoObjectIndex = findTodoObjectIndex(todoId);

  let todoObject = todos[todoObjectIndex];

  if (todoObject.isChecked === true) {
    todoObject.isChecked = false;
  } else {
    todoObject.isChecked = true;
  }
}

/**
 *
 * @param {string} todoId to find index of the id
 */

function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);

  let todoObjectIndex = findTodoObjectIndex(todoId);

  todos.splice(todoObjectIndex, 1);
}

function createAndApendTodo(todo) {
  /**
   * Generating random number
   */

  let index = Math.floor(Math.random() * colors.length);

  if (index > colors.length) {
    index = index - 1;
  }

  /**
   * Unique Id's
   */

  let todoId = "todo" + todo.id;
  let checkboxId = "checkbox" + todo.id;
  let labelId = "label" + todo.id;

  /**
   * Creating (list) Type todoElement by using createElement Method with li tag and Appending it into todoItemsContainer(ul)
   */

  let todoElement = document.createElement("li");
  todoElement.id = todoId;
  todoElement.classList.add("todo__item-container", "d-flex", "flex-row");
  todoItemsContainer.appendChild(todoElement);

  /**
   * Creating inputElement (type Checkbox) using input Element and Appending it into todoElement
   */

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked = todo.isChecked;
  /**
   * Input onClick Func
   */
  inputElement.onclick = function () {
    onTodoStatusChange(todoId, checkboxId, labelId);
  };
  inputElement.classList.add("todo__checkbox-input");
  todoElement.appendChild(inputElement);

  /**
   * Creating labelConatiner using Div Element and Appending it into todoElement
   */

  let labelContainer = document.createElement("div");
  labelContainer.style.borderWidth = "5px";
  labelContainer.style.borderColor = colors[index];
  labelContainer.style.backgroundColor = colors[index] + "30";
  labelContainer.classList.add("todo__label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  /**
   * Creating labelElement using label Element and Appending it into labelContainer
   */

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.textContent = todo.title;
  labelElement.classList.add("todo__checkbox-label");
  if (todo.isChecked === true) {
    labelElement.classList.add("checked");
  }

  labelContainer.appendChild(labelElement);

  /**
   * Creating deleteIconConatiner using Div Element and Appending it into todoElement
   */

  let deleteIconConatiner = document.createElement("div");
  deleteIconConatiner.classList.add("delete__icon-container");
  labelContainer.appendChild(deleteIconConatiner);

  /**
   * Creating deleteIcon using i Element and Appending it into deleteIconContainer
   */

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  /**
   * deleteIcon onclick Func to delete Item
   */
  deleteIcon.onclick = function () {
    onDeleteTodo(todoId);
  };
  deleteIconConatiner.appendChild(deleteIcon);
}

for (let todo of todos) {
  createAndApendTodo(todo);
}
