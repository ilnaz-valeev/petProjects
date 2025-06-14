const addButton = document.querySelector(".btn");

const description = document.querySelector("#description");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const category = document.querySelector("#category");
const date = document.querySelector("#date");
const emptyState = document.querySelector(".empty-state");





addButton.addEventListener("click", (e) => {
  e.preventDefault(); // предотвращаем перезагрузку страницы
  if (
    description.value === "" ||
    amount.value === "" ||
    type.value === "" ||
    category.value === "" ||
    date.value === ""
  ) {
    alert("Пожалуйста, заполните все поля!");
  } else {
    addOperation();
  }
  
});

function addOperation() {
  const transactionList = document.querySelector("#transactions-list");

  if (transactionList.children.length > 0) {
    emptyState.remove();
  }
  
  const operation = `
    <li>
        <span>${description.value}</span>
        <span>${amount.value}</span>
        <span>${type.value}</span>
        <span>${category.value}</span>
        <span>${date.value}</span>
    </li>`;
  transactionList.innerHTML += operation;
}

