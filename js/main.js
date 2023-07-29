const containerEl = document.querySelector(".container");
const inputEl = document.querySelector("#input");
const addBtnEl = document.querySelector(".input--button");
const taskCountEl = document.querySelector(".tasks--count");
const tasksContainerEl = document.querySelector(".tasks--container");
const sSymb = document.querySelector(".to--add--s");
const titleEl = document.querySelector(".title");

taskCountEl.textContent = "0";
let notesText = "";
let innerHtmlEl = "";

//cursor settings

const cursorEl = document.querySelector(".cursor");

document.addEventListener("mousemove", cursorMoveHandler);
function cursorMoveHandler(e) {
  cursorEl.style.top = e.clientY + "px";
  cursorEl.style.left = e.clientX + "px";
}

containerEl.addEventListener("mouseover", containeMouseEnterHandler);

function containeMouseEnterHandler(event) {
  if (event.target.closest("li") || event.target.closest(".input--container")) {
    cursorEl.classList.add("hide-cursor");
  } else {
    cursorEl.classList.add("focus");
  }
}

containerEl.addEventListener("mouseout", containeMouseLeaveHandler);

function containeMouseLeaveHandler() {
  cursorEl.classList.remove("focus");
  cursorEl.classList.remove("hide-cursor");
}

titleEl.addEventListener("mouseover", titleElMouseOverHandler);
function titleElMouseOverHandler() {
  cursorEl.classList.add("title-cursor");
}

titleEl.addEventListener("mouseout", titleElMouseOutHandler);
function titleElMouseOutHandler() {
  cursorEl.classList.remove("title-cursor");
}

// input listener
inputEl.addEventListener("input", inputHandler);

function inputHandler(event) {
  if (event.currentTarget.value.trim().length > 50) {
    window.alert("Maximum symbols - 50");
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
  if (
    event.target.closest("li").tagName === "LI" ||
    event.target.classList.contains("radio--btn")
  ) {
    event.target.closest("li").classList.toggle("checked");

    if (event.target.closest("li").classList.contains("checked")) {
      taskCountEl.textContent = (+taskCountEl.textContent - 1).toString();
    }
    if (
      event.target.closest("li").tagName === "LI" &&
      !event.target.closest("li").classList.contains("checked")
    ) {
      taskCountEl.textContent = (+taskCountEl.textContent + 1).toString();
    }
  }

  sAdder();
}

// delete btn listener
tasksContainerEl.addEventListener("click", delBtnClickHandler);

function delBtnClickHandler(event) {
  console.log();
  if (event.target.closest(".trash--btn")) {
    if (!event.target.closest("li").classList.contains("checked")) {
      taskCountEl.textContent = (+taskCountEl.textContent - 1).toString();
    }
    event.target.closest("li").remove();
  }

  sAdder();
}

//checks if tasks count ===1
function sAdder() {
  if (+taskCountEl.textContent !== 1) {
    sSymb.textContent = "s";
  } else {
    sSymb.textContent = "";
  }
}
