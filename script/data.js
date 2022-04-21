import { getNewTag, appendTag, getDate, countTasks } from "./utils.js";

import { section, inputNewTodo } from "./hw_9.js";

export let cardInfo = []; // массив с данными для карточки
export let n = 1; // счетчик id

// загружает данные с local storage при загрузке страницы
window.addEventListener("load", () => {
  let localData = localStorage.getItem("data");
  let localID = localStorage.getItem("dataID");
  if (localData) {
    cardInfo = JSON.parse(localData);
    render();
  }
  if (localID) {
    n = JSON.parse(localID);
  }
});

//Добавляет в cardInfo новые карточки
export function addNewItem() {
  let taskText = document.querySelector(".new-todo-input").value || "Нет задач";
  let obj = {
    text: taskText,
    date: getDate(),
    id: ++n,
    checked: false,
  };
  cardInfo.push(obj);
  setLocal("data", cardInfo);
  saveID();
}

// меняет id
export function saveID() {
  setLocal("dataID", n);
}

// записывает данные в local storage
export function setLocal(key, value) {
  let string = JSON.stringify(value);
  localStorage.setItem(key, string);
}

// рендерит все данные из cardInfo
export function render() {
  section.innerHTML = "";
  cardInfo.forEach((el) => {
    let divCard = getNewTag("div", "todo-card");
    divCard.classList.add("row");
    divCard.setAttribute("data-id", el.id);
    let divCardCheck = getNewTag("div", "card-check");
    let checkboxLabel = getNewTag("label", "checkbox__label");
    checkboxLabel.setAttribute("for", el.id);
    let checkbox = getNewTag("input", "checkbox__input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", el.id);
    let divCardText = getNewTag("div", "todo-card__text");
    let pCardText = getNewTag("p", "card-text", el.text);
    //изменение стиля выбраных карточек
    if (el.checked) {
      checkboxLabel.classList.contains("checkbox1__label")
        ? null
        : checkboxLabel.classList.add("checkbox1__label");
      divCard.style.backgroundColor = "#5a5a5a";
      pCardText.style.textDecoration = "line-through";
    } else {
      checkboxLabel.classList.contains("checkbox1__label")
        ? checkboxLabel.classList.add("checkbox1__label")
        : null;
      divCard.style.backgroundColor = "#cbcbcb";
      pCardText.style.textDecoration = "none";
    }
    let divCardOther = getNewTag("div", "todo-card__other");
    divCardOther.classList.add("row");
    let buttonDel = getNewTag("button", "btn__del", "X");
    buttonDel.setAttribute("data-id", el.id);
    let pCardDate = getNewTag("p", undefined, el.date);
    section.prepend(divCard);
    appendTag(divCard, divCardCheck, checkbox);
    appendTag(divCardCheck, checkboxLabel);
    appendTag(divCard, divCardText, pCardText);
    appendTag(divCard, divCardOther, buttonDel);
    appendTag(divCardOther, pCardDate);
    countTasks();
    inputNewTodo.value = ""; // обнуление инпута
  });
}

// Удалять все
export function removeAllCards() {
  section.innerHTML = "";
  cardInfo = [];
  n = 0;
  countTasks();
  setLocal("data", cardInfo);
  saveID();
}
