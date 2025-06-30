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

    // Обновление данных на графике для доходов
    if (!chart.data.labels.includes(date.value)) {
      chart.data.labels.push(date.value);
    }
    // Находим индекс этой даты
    const labelIndex = chart.data.labels.indexOf(date.value);
    // Устанавливаем значение для дохода на этой дате
    chart.data.datasets[0].data[labelIndex] =
      (chart.data.datasets[0].data[labelIndex] || 0) + operationAmount;
  } else if (type.value === "expense") {
    currentBalance -= operationAmount; // Если расход, уменьшаем баланс
    totalExpense += operationAmount; // Увеличиваем сумму расходов
    expenseAmount.textContent = `${totalExpense} ₽`; // Отображаем сумму расходов

    // Обновление данных на графике для расходов
    if (!chart.data.labels.includes(date.value)) {
      chart.data.labels.push(date.value);
    }
    const labelIndex = chart.data.labels.indexOf(date.value);
    chart.data.datasets[1].data[labelIndex] =
      (chart.data.datasets[1].data[labelIndex] || 0) + operationAmount;
  }

  // Обновляем отображаемый баланс
  balanceAmount.textContent = `${currentBalance.toFixed(2)} ₽`; // Показываем новый баланс с двумя знаками после запятой

  // Вставляем операцию в список
  transactionList.innerHTML += operation;

  // Обновляем график
  chart.update(); // Это необходимо, чтобы график отобразил обновленные данные
}

const filterType = document.getElementById("filter-type");
const transactionList = document.getElementById("transactions-list");

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

//Вывод категорий
const filterCategory = document.querySelector("#filter-category");

filterCategory.addEventListener("change", function () {
  const selectedFilter = filterCategory.value;

  // Получаем все транзакции в списке
  const transactions = transactionList.querySelectorAll(".operationBalance");

  // Перебираем все транзакции
  transactions.forEach(function (transaction) {
    // Убираем класс 'hidden' у всех элементов, чтобы они снова были видны
    transaction.classList.remove("hidden");

    // Если выбран фильтр, отличный от "all", фильтруем по категории
    if (selectedFilter !== "all") {
      // Получаем категорию из транзакции
      const transactionCategory = transaction.querySelector(
        ".operationSpan:nth-child(4)"
      ).textContent;

      // Проверяем, соответствует ли категория выбранному фильтру
      if (transactionCategory !== categoryTranslations[selectedFilter]) {
        // Если не совпадает, скрываем транзакцию
        transaction.classList.add("hidden");
      }
    }
  });
});

//ДИОГРАММА ЛИНЕЙНАЯ
//ДИОГРАММА ЛИНЕЙНАЯ
//ДИОГРАММА ЛИНЕЙНАЯ
//ДИОГРАММА ЛИНЕЙНАЯ
//ДИОГРАММА ЛИНЕЙНАЯ
const ctxs = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctxs, {
  type: "bar",
  data: {
    labels: [], // Здесь будут даты или категории
    datasets: [
      {
        label: "Доходы",
        data: [],
        backgroundColor: "rgba(0, 123, 255, 0.5)",
      },
      {
        label: "Расходы",
        data: [],
        backgroundColor: "rgba(220, 53, 69, 0.5)",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

//   chart.data.datasets[0].data = totalIncome // Используем актуальное значение для доходов
//   chart.data.datasets[1].data = totalExpense // Используем актуальное значение для расходов

// // Обновляем график
// chart.update();

//ДИОГРАММА КРУГОВАЯ
//ДИОГРАММА КРУГОВАЯ
//ДИОГРАММА КРУГОВАЯ
//ДИОГРАММА КРУГОВАЯ
//ДИОГРАММА КРУГОВАЯ

// Получаем контекст для диаграммы
const ctx = document.getElementById("myPieChart").getContext("2d");

// Данные для диаграммы (можете изменить эти данные в зависимости от ваших нужд)
const data = {
  labels: ["Еда", "Транспорт", "Развлечения", "Жилье", "Другое"], // Категории
  datasets: [
    {
      label: "Расходы по категориям",
      data: [5000, 2000, 1500, 3000, 1000], // Значения для каждой категории (например, расходы в рублях)
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)", // Цвет для сектора "Еда"
        "rgba(54, 162, 235, 0.2)", // Цвет для сектора "Транспорт"
        "rgba(255, 206, 86, 0.2)", // Цвет для сектора "Развлечения"
        "rgba(75, 192, 192, 0.2)", // Цвет для сектора "Жилье"
        "rgba(153, 102, 255, 0.2)", // Цвет для сектора "Другое"
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)", // Цвет границ для сектора "Еда"
        "rgba(54, 162, 235, 1)", // Цвет границ для сектора "Транспорт"
        "rgba(255, 206, 86, 1)", // Цвет границ для сектора "Развлечения"
        "rgba(75, 192, 192, 1)", // Цвет границ для сектора "Жилье"
        "rgba(153, 102, 255, 1)", // Цвет границ для сектора "Другое"
      ],
      borderWidth: 1,
    },
  ],
};

// Конфигурация диаграммы
const config = {
  type: "pie", // Тип диаграммы - круговая
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Позиция легенды
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw + " ₽"; // Добавляем символ валюты
          },
        },
      },
    },
  },
};

// Создание диаграммы
const myPieChart = new Chart(ctx, config);

