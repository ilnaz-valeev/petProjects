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
// Замена длинных массивов на:
let monthlyData = Array(12)
  .fill()
  .map(() => ({
    income: Array(31).fill(0),
    expense: Array(31).fill(0),
  }));

let categoryData = Array(12)
  .fill()
  .map(() => ({
    food: { income: 0, expense: 0 },
    transport: { income: 0, expense: 0 },
    housing: { income: 0, expense: 0 },
    entertainment: { income: 0, expense: 0 },
    salary: { income: 0, expense: 0 },
    other: { income: 0, expense: 0 },
  }));

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

// Текущий отображаемый месяц (индекс)
let currentMonthIndex = new Date().getMonth(); // Текущий месяц по умолчанию

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

  // Получаем день и месяц из выбранной даты
  const selectedDate = new Date(date.value);
  const selectedDay = selectedDate.getDate(); // День месяца от 1 до 31
  const selectedMonthIndex = selectedDate.getMonth(); // Месяц от 0 (Январь) до 11 (Декабрь)

  // Создание новой операции
  const operation = `
        <li class="operationBalance ${type.value}">
            <span class="operationSpan">${description.value}</span>
            <span class="operationSpan">${amount.value}</span>
            <span class="operationSpan">${translatedType}</span>
            <span class="operationSpan">${translatedCategory}</span>
            <span class="operationSpan">${date.value}</span>
        </li>`;

  const operationAmount = parseFloat(amount.value);

  // Обновляем данные для месяца, указанного в дате операции
  if (type.value === "income") {
    currentBalance += operationAmount;
    totalIncome += operationAmount;
    statAmount.textContent = `${totalIncome} ₽`;

    // Обновление данных для выбранного месяца в дате
    monthlyData[selectedMonthIndex].income[selectedDay - 1] += operationAmount;
    categoryData[selectedMonthIndex][category.value].income += operationAmount;
  } else if (type.value === "expense") {
    currentBalance -= operationAmount;
    totalExpense += operationAmount;
    expenseAmount.textContent = `${totalExpense} ₽`;

    // Обновление данных для выбранного месяца в дате
    monthlyData[selectedMonthIndex].expense[selectedDay - 1] += operationAmount;
    categoryData[selectedMonthIndex][category.value].expense += operationAmount;
  }

  if (selectedMonthIndex === currentMonthIndex) {
    updatePieChartForMonth(currentMonthIndex);
    updateBarChartForMonth(currentMonthIndex);
  }
  // Обновление баланса и добавление операции в список
  balanceAmount.textContent = `${currentBalance.toFixed(2)} ₽`;
  transactionList.innerHTML += operation;

  // НЕ обновляем графики здесь! Они обновляются только при переключении месяцев
}

// Функция обновления круговой диаграммы для выбранного месяца
function updatePieChartForMonth(monthIndex) {
  // Суммируем данные для каждой категории
  const incomeData = [
    categoryData[monthIndex].food.income,
    categoryData[monthIndex].transport.income,
    categoryData[monthIndex].housing.income,
    categoryData[monthIndex].entertainment.income,
    categoryData[monthIndex].salary.income,
    categoryData[monthIndex].other.income,
  ];

  const expenseData = [
    categoryData[monthIndex].food.expense,
    categoryData[monthIndex].transport.expense,
    categoryData[monthIndex].housing.expense,
    categoryData[monthIndex].entertainment.expense,
    categoryData[monthIndex].salary.expense,
    categoryData[monthIndex].other.expense,
  ];

  // Обновляем данные на круговой диаграмме
  myPieChart.data.datasets[0].data = incomeData;
  myPieChart.data.datasets[1].data = expenseData;
  myPieChart.update();
}

// Функция обновления столбчатой диаграммы для выбранного месяца
function updateBarChartForMonth(monthIndex) {
  const incomeData = monthlyData[monthIndex].income;
  const expenseData = monthlyData[monthIndex].expense;

  // Обновляем метки (дни месяца)
  chart.data.labels = Array.from({ length: 31 }, (_, i) => i + 1);

  // Обновляем данные
  chart.data.datasets[0].data = incomeData;
  chart.data.datasets[1].data = expenseData;
  chart.update();
}

// Функция переключения месяца
function switchMonth(newMonthIndex) {
  currentMonthIndex = newMonthIndex;
  monthName.textContent = months[currentMonthIndex];

  // Всегда обновляем графики при переключении
  updatePieChartForMonth(currentMonthIndex);
  updateBarChartForMonth(currentMonthIndex);
}

// Элементы для переключения месяцев
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const monthName = document.getElementById("month-name");

// Инициализация текущего месяца
monthName.textContent = months[currentMonthIndex];

// Переключение на предыдущий месяц
prevMonthButton.addEventListener("click", () => {
  const newIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
  switchMonth(newIndex);
});

// Переключение на следующий месяц
nextMonthButton.addEventListener("click", () => {
  const newIndex = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1;
  switchMonth(newIndex);
});

// Инициализация диаграмм при загрузке
const ctx = document.getElementById("myPieChart").getContext("2d");
const myPieChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Еда", "Транспорт", "Жилье", "Развлечения", "Зарплата", "Другое"],
    datasets: [
      {
        label: "Доходы",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: "Расходы",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw + " ₽";
          },
        },
      },
    },
  },
});

const ctxs = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctxs, {
  type: "bar",
  data: {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Доходы",
        data: Array(31).fill(0),
        backgroundColor: "rgba(0, 123, 255, 0.5)",
      },
      {
        label: "Расходы",
        data: Array(31).fill(0),
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

// Инициализация графиков для текущего месяца
// В конце кода после создания графиков
updatePieChartForMonth(currentMonthIndex);
updateBarChartForMonth(currentMonthIndex);
// Здесь просто убрано постоянное обновление фнукций
