import { saveID, setLocal, render, cardInfo } from "./data.js";
import { inputSearch, spanCounterAll, spanCounterCompl } from "./hw_9.js";

// Добавить тег с классом и внутренним текстом
export function getNewTag(tagName, className, text) {
  let newTag = document.createElement(tagName);
  className ? newTag.classList.add(className) : null;
  text ? (newTag.innerText = text) : null;
  return newTag;
}

// Вложить теги parent<child<child
export function appendTag(...arg) {
  for (let i = 0; i < arg.length - 1; i++) {
    arg[i].append(arg[i + 1]);
  }
}

//Текущая дата ггг-мм-дд чч:мм
export function getDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${year}-${month}-${day}\n ${hours}:${minutes}`;
}

//подсчет отмеченный карточек
export function countTasks() {
  spanCounterAll.innerText = cardInfo.length; // всего
  let compl = 0;
  cardInfo.forEach((el) => {
    el.checked ? (compl = compl + 1) : null;
  });
  spanCounterCompl.innerText = compl; //отмечено
}

// Удалять последнюю карточку
export function removeLastCard() {
  cardInfo.splice(cardInfo[0], 1); // последняя карточка в начале массива
  countTasks(); //  пересчитать количество карточек
  setLocal("data", cardInfo);
  saveID();
  render();
}

// Удалять текущую карточку
export function delCurrentItem({ target }) {
  if (target.className === "btn__del") {
    let idx = target.getAttribute("data-id");
    let element = cardInfo.find((el) => el.id == idx);
    cardInfo.splice(cardInfo.indexOf(element), 1);
    countTasks();
    setLocal("data", cardInfo);
    saveID();
    render();
  }
}

//Выделение сделанного
export function markDoneTast({ target }) {
  if (target.tagName === "INPUT") {
    let idx = target.getAttribute("id");
    let element = cardInfo.find((el) => el.id == idx);
    element.checked = !element.checked;
    setLocal("data", cardInfo);
    render();
  }
}

// показ  только сделанных
export function showCompleted() {
  cardInfo.forEach((e) => {
    let divCard = document.getElementById(e.id).closest(".todo-card");
    !e.checked ? divCard.classList.add("hidden") : null;
  });
  setLocal("data", cardInfo);
}

//показ всех
export function showAll() {
  cardInfo.forEach((e) => {
    let divCard = document.getElementById(e.id).closest(".todo-card");
    divCard.classList.remove("hidden");
  });
  setLocal("data", cardInfo);
}

//поиск по содержимому
export function search() {
  cardInfo.forEach((e) => {
    let divCard = document.getElementById(e.id).closest(".todo-card"); // поиск карточки для отображения
    let pCardText = document.getElementById(e.id).parentElement // поиск текста для проверки совпадения
      .nextElementSibling.innerText;
    inputSearch.value !== "" ? divCard.classList.add("hidden") : null;
    pCardText.toLowerCase().includes(inputSearch.value.toLowerCase())
      ? divCard.classList.remove("hidden")
      : null;
  });
}
