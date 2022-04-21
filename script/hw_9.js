import {
  getNewTag,
  appendTag,
  removeLastCard,
  delCurrentItem,
  markDoneTast,
  showCompleted,
  showAll,
  search,
} from "./utils.js";
import { addNewItem, render, removeAllCards } from "./data.js";

let app = document.getElementById("root"); // тег из html

let container = getNewTag("div", "container");
// Шапка добавить/удалить карточки
let nav = getNewTag("nav");
let buttonDelAll = getNewTag("button", undefined, "Delete All");
buttonDelAll.addEventListener("click", removeAllCards);

let buttonDelLast = getNewTag("button", undefined, "Delete Last");
buttonDelLast.addEventListener("click", removeLastCard);

let formAddTask = getNewTag("form", "add-task");
let labelNewTodo = getNewTag("label");
labelNewTodo.classList.add("row");
export let inputNewTodo = getNewTag("input", "new-todo-input");
inputNewTodo.setAttribute("type", "text");
inputNewTodo.setAttribute("placeholder", "Enter todo ...");
inputNewTodo.setAttribute("autofocus", ""); // курсор всега на input по умолчанию
inputNewTodo.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    // по enter добавлять карточку
    e.preventDefault(); //отменить действие по умолчанию
    buttonAddTodo.click(); // действие как и у кнопки по клику
  }
});

let buttonAddTodo = getNewTag("button", undefined, "Add");
buttonAddTodo.setAttribute("type", "submit");
buttonAddTodo.addEventListener("click", () => {
  addNewItem();
  render();
});

// Шапка отображение карточек
let sectionInfo = getNewTag("section", "info");
let divInfo = getNewTag("div", "todo-info");
divInfo.classList.add("row");
let divCounter = getNewTag("div", "todo__counter");
divCounter.classList.add("row");
let pCounterAll = getNewTag("p", "todo__counter__all", "All: ");
export let spanCounterAll = getNewTag("span", undefined, "0");
let pCounterCompl = getNewTag("p", "todo__counter__complited", "Complited: ");
export let spanCounterCompl = getNewTag("span", undefined, "0");
let buttonShowAll = getNewTag("button", undefined, "Show All");
buttonShowAll.addEventListener("click", showAll);
let buttonShowCompleted = getNewTag("button", undefined, "Show Completed");
buttonShowCompleted.addEventListener("click", showCompleted);
let labelSearch = getNewTag("label");
labelSearch.classList.add("row");
export let inputSearch = getNewTag("input");
inputSearch.setAttribute("type", "search");
inputSearch.setAttribute("placeholder", "Search ...");
inputSearch.addEventListener("input", search);
inputSearch.addEventListener("change", showAll);
export let section = getNewTag("section");
section.setAttribute("id", "cards");
appendTag(app, container, nav, buttonDelAll);
appendTag(nav, buttonDelLast);
appendTag(nav, formAddTask, labelNewTodo, inputNewTodo);
appendTag(nav, buttonAddTodo);

appendTag(container, sectionInfo, divInfo, divCounter);
appendTag(divCounter, pCounterAll, spanCounterAll);
appendTag(divCounter, pCounterCompl, spanCounterCompl);
appendTag(divInfo, buttonShowAll);
appendTag(divInfo, buttonShowCompleted);
appendTag(divInfo, labelSearch, inputSearch);

appendTag(container, section);
section.addEventListener("click", delCurrentItem);
section.addEventListener("change", markDoneTast);
