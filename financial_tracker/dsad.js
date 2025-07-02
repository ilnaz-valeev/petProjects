// Переменные для отображения данных
let currentBalance = 0; // Текущий баланс
let totalIncome = 0; // Сумма доходов
let totalExpense = 0; // Сумма расходов

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

// Массив для хранения данных по месяцам
let monthlyData = {
  Январь: {
    income: [0, 0, 0, 0, 0, 0], // Для каждой категории дохода (Еда, Транспорт, и т.д.)
    expense: [0, 0, 0, 0, 0, 0], // Для каждой категории расходов
  },
  Февраль: {
    income: [0, 0, 0, 0, 0, 0],
    expense: [0, 0, 0, 0, 0, 0],
  },
  Март: {
    income: [0, 0, 0, 0, 0, 0],
    expense: [0, 0, 0, 0, 0, 0],
  },
  Апрель: {
    income: [0, 0, 0, 0, 0, 0],
    expense: [0, 0, 0, 0, 0, 0],
  },
  Май: {
    income: [0, 0, 0, 0, 0, 0],
    expense: [0, 0, 0, 0, 0, 0],
  },
  Июнь: {
    income: [0, 0, 0, 0, 0, 0],
    expense: [0, 0, 0, 0, 0, 0],
  },
  Июль: {
    income: [0, 0, 0, 0, 0, 0],
    expense: [0, 0, 0, 0, 0, 0],
  },
  Август: {
    income: [0, 0, 0, 0, 0, 0],
    expense: [0, 0, 0, 0, 0, 0],
  },
  Сентябрь: {
    income: [0, 0, 0, 0, 0, 0],
    expense: [0, 0, 0, 0, 0, 0],
  },
  Октоябрь: {
    income: [0, 0, 0, 0, 0, 0],
    expense: [0, 0, 0, 0, 0, 0],
  },
  Ноябрь: {
    income: [0, 0, 0, 0, 0, 0],
    expense: [0, 0, 0, 0, 0, 0],
  },
  Декабрь: {
    income: [0, 0, 0, 0, 0, 0],
    expense: [0, 0, 0, 0, 0, 0],
  },
  // Добавь другие месяцы по аналогии
};

// Месяц, который выбран в данный момент
let currentMonth = "Январь";

// Обработчик для кнопки добавления транзакции
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

// Функция добавления операции
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

  // Индекс категории (Еда, Транспорт и т.д.)
  const categoryIndex = [
    "food",
    "transport",
    "housing",
    "entertainment",
    "salary",
    "other",
  ].indexOf(category.value);

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

    // Обновление данных по доходам для выбранного месяца
    monthlyData[currentMonth].income[categoryIndex] += operationAmount;

    // Обновление данных на графике для доходов
    updatePieChartForMonth();
  } else if (type.value === "expense") {
    currentBalance -= operationAmount; // Если расход, уменьшаем баланс
    totalExpense += operationAmount; // Увеличиваем сумму расходов
    expenseAmount.textContent = `${totalExpense} ₽`; // Отображаем сумму расходов

    // Обновление данных по расходам для выбранного месяца
    monthlyData[currentMonth].expense[categoryIndex] += operationAmount;

    // Обновление данных на графике для расходов
    updatePieChartForMonth();
  }
  // Обновление столбчатой диаграммы для расходов
  const dateIndex = chart.data.labels.indexOf(date.value);
  if (dateIndex === -1) {
    // Если дата не найдена, добавляем её в метки
    chart.data.labels.push(date.value);
    chart.data.datasets[0].data.push(0); // Для доходов ставим 0
    chart.data.datasets[1].data.push(operationAmount); // Добавляем расход
  } else {
    // Если дата уже есть, обновляем существующие данные
    chart.data.datasets[1].data[dateIndex] += operationAmount; // Добавляем расход
  }
  // Обновляем отображаемый баланс
  balanceAmount.textContent = `${currentBalance.toFixed(2)} ₽`; // Показываем новый баланс с двумя знаками после запятой

  // Вставляем операцию в список
  transactionList.innerHTML += operation;
  chart.update();
}

// Функция обновления круговой диаграммы для выбранного месяца
function updatePieChartForMonth() {
  // Проверяем, существует ли месяц в monthlyData
  if (!monthlyData[currentMonth]) {
    // Если месяца нет, создаем пустую структуру для него
    monthlyData[currentMonth] = {
      income: [0, 0, 0, 0, 0, 0],
      expense: [0, 0, 0, 0, 0, 0],
    };
  }

  const incomeData = monthlyData[currentMonth].income; // Данные для доходов
  const expenseData = monthlyData[currentMonth].expense; // Данные для расходов

  // Обновляем данные диаграммы
  myPieChart.data.datasets[0].data = incomeData; // Доходы
  myPieChart.data.datasets[1].data = expenseData; // Расходы
  myPieChart.update(); // Обновляем диаграмму
}

// Элементы для переключения месяцев
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const monthName = document.getElementById("month-name");

// Список месяцев
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

// Переключение на предыдущий месяц
// Переключение на предыдущий месяц
prevMonthButton.addEventListener("click", () => {
  const currentIndex = months.indexOf(currentMonth);
  const prevIndex = currentIndex === 0 ? months.length - 1 : currentIndex - 1;
  currentMonth = months[prevIndex];
  monthName.textContent = currentMonth; // Обновляем отображение месяца

  // Если месяца нет в monthlyData, создаем его
  if (!monthlyData[currentMonth]) {
    monthlyData[currentMonth] = {
      income: [0, 0, 0, 0, 0, 0],
      expense: [0, 0, 0, 0, 0, 0],
    };
  }

  // Обновляем круговую диаграмму для выбранного месяца
  updatePieChartForMonth();
});

// Переключение на следующий месяц
nextMonthButton.addEventListener("click", () => {
  const currentIndex = months.indexOf(currentMonth);
  const nextIndex = currentIndex === months.length - 1 ? 0 : currentIndex + 1;
  currentMonth = months[nextIndex];
  monthName.textContent = currentMonth; // Обновляем отображение месяца

  // Обновляем круговую диаграмму для выбранного месяца
  updatePieChartForMonth();
});

// Инициализация диаграммы
const ctx = document.getElementById("myPieChart").getContext("2d");

// Данные для диаграммы
const data = {
  labels: ["Еда", "Транспорт", "Развлечения", "Зарплата", "Жилье", "Другое"], // Категории
  datasets: [
    {
      label: "Доходы",
      data: [0, 0, 0, 0, 0, 0], // Изначально все категории равны 0
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
    {
      label: "Расходы",
      data: [0, 0, 0, 0, 0, 0], // Изначально все категории равны 0
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)", // Цвет для сектора "Еда"
        "rgba(54, 162, 235, 0.5)", // Цвет для сектора "Транспорт"
        "rgba(255, 206, 86, 0.5)", // Цвет для сектора "Развлечения"
        "rgba(75, 192, 192, 0.5)", // Цвет для сектора "Жилье"
        "rgba(153, 102, 255, 0.5)", // Цвет для сектора "Другое"
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

chart.update();
