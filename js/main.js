const containerEl = document.querySelector(".container");
const inputEl = document.querySelector("#input");
const addBtnEl = document.querySelector(".input--button");
const taskCountEl = document.querySelector(".tasks--count");
const tasksContainerEl = document.querySelector(".tasks--container");
const sSymb = document.querySelector(".to--add--s");

taskCountEl.textContent = "0";
let notesText = "";
let innerHtmlEl = "";

// input listener
inputEl.addEventListener("input", inputHandler);

function inputHandler(event) {
  if (event.currentTarget.value.trim().length > 30) {
    window.alert("Maximum symbols - 30");
    return;
  }
  notesText = event.currentTarget.value.trim();
}

// btn listener
addBtnEl.addEventListener("click", addBtnClickHandler);

function addBtnClickHandler(event) {
  if (inputEl.value.trim().length < 1) {
    window.alert("Enter min 1 symbol");
  } else {
    innerHtmlEl = `
    <li class="task--item">
    <svg class="radio--btn" width="26" height="26">
    <use href="./pics/symbol-defs.svg#icon-radio-icon"></use>
    </svg>${notesText}
    <svg class="trash--btn" width="26" height="26">
    <use href="./pics/symbol-defs.svg#icon-trash-icon"></use>
    </svg>
    </li>`;
    tasksContainerEl.insertAdjacentHTML("afterbegin", innerHtmlEl);

    taskCountEl.textContent = (
      tasksContainerEl.children.length -
      [...tasksContainerEl.children].filter((el) =>
        [...el.classList].includes("checked")
      ).length
    ).toString();

    sAdder();
  }

  inputEl.value = "";
}

// note click listener
tasksContainerEl.addEventListener("click", tasksContainerClickHandler);

function tasksContainerClickHandler(event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");

    if (event.target.classList.contains("checked")) {
      taskCountEl.textContent = (+taskCountEl.textContent - 1).toString();
    }
    if (
      event.target.tagName === "LI" &&
      !event.target.classList.contains("checked")
    ) {
      taskCountEl.textContent = (+taskCountEl.textContent + 1).toString();
    }
  }

  sAdder();
}

// delete btn listener
tasksContainerEl.addEventListener("click", delBtnClickHandler);

function delBtnClickHandler(event) {
  if (event.target.tagName === "svg" || event.target.tagName === "use") {
    if (!event.target.closest("li").classList.contains("checked")) {
      taskCountEl.textContent = (+taskCountEl.textContent - 1).toString();
    }
    event.target.closest("li").remove();
  }

  sAdder();
}

//checks if tasts count ===1
function sAdder() {
  if (+taskCountEl.textContent !== 1) {
    sSymb.textContent = "s";
  } else {
    sSymb.textContent = "";
  }
}
