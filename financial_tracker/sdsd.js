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

// // Массив для хранения данных по месяцам
// let monthlyData = [
//   { income: Array(31).fill(0), expense: Array(31).fill(0) }, // Январь
//   { income: Array(31).fill(0), expense: Array(31).fill(0) }, // Февраль
//   { income: Array(31).fill(0), expense: Array(31).fill(0) }, // Март
//   { income: Array(31).fill(0), expense: Array(31).fill(0) }, // Апрель
//   { income: Array(31).fill(0), expense: Array(31).fill(0) }, // Май
//   { income: Array(31).fill(0), expense: Array(31).fill(0) }, // Июнь
//   { income: Array(31).fill(0), expense: Array(31).fill(0) }, // Июль
//   { income: Array(31).fill(0), expense: Array(31).fill(0) }, // Август
//   { income: Array(31).fill(0), expense: Array(31).fill(0) }, // Сентябрь
//   { income: Array(31).fill(0), expense: Array(31).fill(0) }, // Октябрь
//   { income: Array(31).fill(0), expense: Array(31).fill(0) }, // Ноябрь
//   { income: Array(31).fill(0), expense: Array(31).fill(0) }, // Декабрь
// ];
  
let monthlyData = [
  {
    income: Array(31).fill(0), // Доходы по дням
    expense: Array(31).fill(0), // Расходы по дням
  },
  {
    income: Array(31).fill(0), // Доходы по дням
    expense: Array(31).fill(0), // Расходы по дням
  },
  {
    income: Array(31).fill(0), // Доходы по дням
    expense: Array(31).fill(0), // Расходы по дням
  },
  {
    income: Array(31).fill(0), // Доходы по дням
    expense: Array(31).fill(0), // Расходы по дням
  },
  {
    income: Array(31).fill(0), // Доходы по дням
    expense: Array(31).fill(0), // Расходы по дням
  },
  {
    income: Array(31).fill(0), // Доходы по дням
    expense: Array(31).fill(0), // Расходы по дням
  },
  {
    income: Array(31).fill(0), // Доходы по дням
    expense: Array(31).fill(0), // Расходы по дням
  },
  {
    income: Array(31).fill(0), // Доходы по дням
    expense: Array(31).fill(0), // Расходы по дням
  },
  {
    income: Array(31).fill(0), // Доходы по дням
    expense: Array(31).fill(0), // Расходы по дням
  },
  {
    income: Array(31).fill(0), // Доходы по дням
    expense: Array(31).fill(0), // Расходы по дням
  },
  {
    income: Array(31).fill(0), // Доходы по дням
    expense: Array(31).fill(0), // Расходы по дням
  },
  {
    income: Array(31).fill(0), // Доходы по дням
    expense: Array(31).fill(0), // Расходы по дням
  },
  // Для других месяцев...
];

let categoryData = [
  {
    food: { income: 0, expense: 0 },
    transport: { income: 0, expense: 0 },
    housing: { income: 0, expense: 0 },
    entertainment: { income: 0, expense: 0 },
    salary: { income: 0, expense: 0 },
    other: { income: 0, expense: 0 },
  },
  {
    food: { income: 0, expense: 0 },
    transport: { income: 0, expense: 0 },
    housing: { income: 0, expense: 0 },
    entertainment: { income: 0, expense: 0 },
    salary: { income: 0, expense: 0 },
    other: { income: 0, expense: 0 },
  },
  {
    food: { income: 0, expense: 0 },
    transport: { income: 0, expense: 0 },
    housing: { income: 0, expense: 0 },
    entertainment: { income: 0, expense: 0 },
    salary: { income: 0, expense: 0 },
    other: { income: 0, expense: 0 },
  },
  {
    food: { income: 0, expense: 0 },
    transport: { income: 0, expense: 0 },
    housing: { income: 0, expense: 0 },
    entertainment: { income: 0, expense: 0 },
    salary: { income: 0, expense: 0 },
    other: { income: 0, expense: 0 },
  },
  {
    food: { income: 0, expense: 0 },
    transport: { income: 0, expense: 0 },
    housing: { income: 0, expense: 0 },
    entertainment: { income: 0, expense: 0 },
    salary: { income: 0, expense: 0 },
    other: { income: 0, expense: 0 },
  },
  {
    food: { income: 0, expense: 0 },
    transport: { income: 0, expense: 0 },
    housing: { income: 0, expense: 0 },
    entertainment: { income: 0, expense: 0 },
    salary: { income: 0, expense: 0 },
    other: { income: 0, expense: 0 },
  },
  {
    food: { income: 0, expense: 0 },
    transport: { income: 0, expense: 0 },
    housing: { income: 0, expense: 0 },
    entertainment: { income: 0, expense: 0 },
    salary: { income: 0, expense: 0 },
    other: { income: 0, expense: 0 },
  },
  {
    food: { income: 0, expense: 0 },
    transport: { income: 0, expense: 0 },
    housing: { income: 0, expense: 0 },
    entertainment: { income: 0, expense: 0 },
    salary: { income: 0, expense: 0 },
    other: { income: 0, expense: 0 },
  },
  {
    food: { income: 0, expense: 0 },
    transport: { income: 0, expense: 0 },
    housing: { income: 0, expense: 0 },
    entertainment: { income: 0, expense: 0 },
    salary: { income: 0, expense: 0 },
    other: { income: 0, expense: 0 },
  },
  {
    food: { income: 0, expense: 0 },
    transport: { income: 0, expense: 0 },
    housing: { income: 0, expense: 0 },
    entertainment: { income: 0, expense: 0 },
    salary: { income: 0, expense: 0 },
    other: { income: 0, expense: 0 },
  },
  {
    food: { income: 0, expense: 0 },
    transport: { income: 0, expense: 0 },
    housing: { income: 0, expense: 0 },
    entertainment: { income: 0, expense: 0 },
    salary: { income: 0, expense: 0 },
    other: { income: 0, expense: 0 },
  },
  {
    food: { income: 0, expense: 0 },
    transport: { income: 0, expense: 0 },
    housing: { income: 0, expense: 0 },
    entertainment: { income: 0, expense: 0 },
    salary: { income: 0, expense: 0 },
    other: { income: 0, expense: 0 },
  },
  {
    food: { income: 0, expense: 0 },
    transport: { income: 0, expense: 0 },
    housing: { income: 0, expense: 0 },
    entertainment: { income: 0, expense: 0 },
    salary: { income: 0, expense: 0 },
    other: { income: 0, expense: 0 },
  },
  // Для других месяцев...
];
  

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

  // Получаем день из выбранной даты (используем метод getDate для получения числа дня)
  const selectedDate = new Date(date.value);
  const selectedDay = selectedDate.getDate(); // День месяца от 1 до 31

  // Создание новой операции с добавлением класса типа (income или expense)
  const operation = `
      <li class="operationBalance ${type.value}">
        <span class="operationSpan">${description.value}</span>
        <span class="operationSpan">${amount.value}</span>
        <span class="operationSpan">${translatedType}</span>
        <span class="operationSpan">${translatedCategory}</span>
        <span class="operationSpan">${date.value}</span>
      </li>`;

  const operationAmount = parseFloat(amount.value); // Преобразуем введенную сумму в число

  // Получаем индекс месяца
  const selectedMonthIndex = selectedDate.getMonth(); // Месяц от 0 (Январь) до 11 (Декабрь)

  // Обновляем данные по доходам или расходам для выбранного дня месяца
  if (type.value === "income") {
    currentBalance += operationAmount;
    totalIncome += operationAmount;
    statAmount.textContent = `${totalIncome} ₽`; // Отображаем сумму доходов

    monthlyData[selectedMonthIndex].income[selectedDay - 1] += operationAmount; // Индекс для дня
    updateBarChartForMonth(selectedMonthIndex); // Обновляем столбчатую диаграмму для текущего месяца
  } else if (type.value === "expense") {
    currentBalance -= operationAmount;
    totalExpense += operationAmount;
    expenseAmount.textContent = `${totalExpense} ₽`;

    monthlyData[selectedMonthIndex].expense[selectedDay - 1] += operationAmount; // Индекс для дня
    updateBarChartForMonth(selectedMonthIndex); // Обновляем столбчатую диаграмму для текущего месяца
  }

  // Обновляем отображаемый баланс
  balanceAmount.textContent = `${currentBalance.toFixed(2)} ₽`; // Показываем новый баланс с двумя знаками после запятой

  // Вставляем операцию в список
  transactionList.innerHTML += operation;

  // Обновляем график
  chart.update(); // Обновляем столбчатую диаграмму
}
  
  



  
function updateBarChartForMonth(monthIndex) {
  const incomeData = monthlyData[monthIndex].income;
  const expenseData = monthlyData[monthIndex].expense;

  // Обновляем метки на графике (по дням месяца)
  chart.data.labels = Array.from({ length: 31 }, (_, i) => i + 1); // Месяц состоит из 31 дня

  // Обновляем данные для столбцов графика
  chart.data.datasets[0].data = incomeData; // Доходы
  chart.data.datasets[1].data = expenseData; // Расходы

  // Обновляем диаграмму
  chart.update();
}

function updatePieChartForMonth(monthIndex) {
  // Суммируем данные для каждой категории (Доходы и Расходы)
  const incomeData = monthlyData[monthIndex].income;
  const expenseData = monthlyData[monthIndex].expense;

  // Обновляем данные на круговой диаграмме для доходов и расходов
  myPieChart.data.datasets[0].data = incomeData; // Доходы
  myPieChart.data.datasets[1].data = expenseData; // Расходы

  // Обновляем метки на диаграмме, чтобы отображались категории
  myPieChart.data.labels = [
    "Еда",
    "Транспорт",
    "Развлечения",
    "Зарплата",
    "Жилье",
    "Другое",
  ];

  // Обновляем диаграмму
  myPieChart.update();
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
prevMonthButton.addEventListener("click", () => {
    const currentIndex = months.indexOf(currentMonth);
    const prevIndex = currentIndex === 0 ? months.length - 1 : currentIndex - 1;
    currentMonth = months[prevIndex];
    monthName.textContent = currentMonth; // Обновляем отображение месяца
  
    // Обновляем круговую диаграмму для выбранного месяца
    updatePieChartForMonth(prevIndex); // Передаем индекс месяца
  });
  
  // Переключение на следующий месяц
  nextMonthButton.addEventListener("click", () => {
    const currentIndex = months.indexOf(currentMonth);
    const nextIndex = currentIndex === months.length - 1 ? 0 : currentIndex + 1;
    currentMonth = months[nextIndex];
    monthName.textContent = currentMonth; // Обновляем отображение месяца
  
    // Обновляем круговую диаграмму для выбранного месяца
    updatePieChartForMonth(nextIndex); // Передаем индекс месяца
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
