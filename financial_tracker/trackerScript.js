const balanceAmount = document.querySelector(".balance-amount");
const addButton = document.querySelector(".btn");

const description = document.querySelector("#description");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const category = document.querySelector("#category");
const date = document.querySelector("#date");
const emptyState = document.querySelector(".empty-state");
const statAmount = document.querySelector(".stat-amount");
const expenseAmount = document.querySelector(".expense-amount");
const chartContainer = document.querySelector(".chart-container");
// const filterType = document.querySelector("#filter-type");
const filterType = document.getElementById("filter-type");
const transactionList = document.getElementById("transactions-list");



// Объекты для перевода значений на русский
const typeTranslations = {
  income: "Доход",
  expense: "Расход",
};

const categoryTranslations = {
  food: "Еда",
  transport: "Транспорт",
  housing: "Жилье",
  entertainment: "Развлечения",
  salary: "Зарплата",
  other: "Другое",
};

// Начальные значения
let currentBalance = 0;
let totalIncome = 0;
let totalExpense = 0;

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

  // Удаляем элемент "empty-state", если транзакции добавлены
  if (transactionList.children.length > 0) {
    emptyState.remove();
  }

  // Перевод значений с использованием словарей
  const translatedType = typeTranslations[type.value] || type.value;
  const translatedCategory =
    categoryTranslations[category.value] || category.value;

  // Создание новой операции с добавлением класса типа (income или expense)
  const operation = `
      <li class="operationBalance ${type.value}">
          <span class="operationSpan">${description.value}</span>
          <span class="operationSpan">${amount.value}</span>
          <span class="operationSpan">${translatedType}</span>
          <span class="operationSpan">${translatedCategory}</span>
          <span class="operationSpan">${date.value}</span>
      </li>`;

  // Обновление баланса
  const operationAmount = parseFloat(amount.value); // Преобразуем введенную сумму в число
  if (type.value === "income") {
    currentBalance += operationAmount; // Если доход, увеличиваем баланс
    totalIncome += operationAmount; // Увеличиваем сумму доходов
    statAmount.textContent = `${totalIncome} ₽`; // Отображаем сумму доходов
  } else if (type.value === "expense") {
    currentBalance -= operationAmount; // Если расход, уменьшаем баланс
    totalExpense += operationAmount; // Увеличиваем сумму расходов
    expenseAmount.textContent = `${totalExpense} ₽`; // Отображаем сумму расходов
  }

  // Обновляем отображаемый баланс
  balanceAmount.textContent = `${currentBalance.toFixed(2)} ₽`; // Показываем новый баланс с двумя знаками после запятой

  // Вставляем операцию в список
  transactionList.innerHTML += operation;
}
  


// Функция для фильтрации транзакций
filterType.addEventListener("change", function () {
  const selectedFilter = filterType.value; // Получаем выбранный фильтр (income или expense)
  
  // Получаем все транзакции в списке
  const transactions = transactionList.querySelectorAll(".operationBalance");

  // Перебираем все транзакции
  transactions.forEach(function (transaction) {
    // Убираем класс 'hidden' у всех элементов, чтобы они снова были видны
    transaction.classList.remove("hidden");

    // Если фильтр не "all", фильтруем по типу операции
    if (selectedFilter !== "all") {
      // Проверяем, соответствует ли тип операции выбранному фильтру
      if (!transaction.classList.contains(selectedFilter)) {
        // Если не совпадает, скрываем транзакцию
        transaction.classList.add("hidden");
      }
    }
  });
});
