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
let monthlyData = Array(12).fill().map(() => ({
    income: Array(31).fill(0),
    expense: Array(31).fill(0)
  }));
  
  let categoryData = Array(12).fill().map(() => ({
    food: { income: 0, expense: 0 },
    transport: { income: 0, expense: 0 },
    housing: { income: 0, expense: 0 },
    entertainment: { income: 0, expense: 0 },
    salary: { income: 0, expense: 0 },
    other: { income: 0, expense: 0 }
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
// Функция добавления операции
function addOperation() {
  const transactionList = document.querySelector("#transactions-list");

  // Удаляем элемент "empty-state", если транзакции добавлены
  if (transactionList.children.length > 0 && emptyState.parentNode) {
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

  // Заменяем запятую на точку для корректного парсинга
  let amountValue = amount.value.replace(",", ".");
  const operationAmount = parseFloat(amountValue);
  if (isNaN(operationAmount)) {
    alert("Некорректная сумма!");
    return;
  }

  // Генерируем уникальный ID для операции
  const operationId = Date.now().toString();

  // Создание новой операции с кнопкой удаления
  const operation = `
          <li class="operationBalance ${type.value}" data-id="${operationId}" data-amount="${operationAmount}" data-type="${type.value}" data-category="${category.value}" data-date="${date.value}">
              <span class="operationSpan">${description.value}</span>
              <span class="operationSpan">${amount.value}</span>
              <span class="operationSpan">${translatedType}</span>
              <span class="operationSpan">${translatedCategory}</span>
              <span class="operationSpan">${date.value}</span>
              <span class="delete-btn">×</span>
          </li>`;

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

  // Обновление баланса и добавление операции в список
  balanceAmount.textContent = `${currentBalance.toFixed(2)} ₽`;
  transactionList.innerHTML += operation;

  // Если операция относится к текущему отображаемому месяцу - обновляем графики
  if (selectedMonthIndex === currentMonthIndex) {
    updatePieChartForMonth(currentMonthIndex);
    updateBarChartForMonth(currentMonthIndex);
  }

  // Очищаем поля формы
  description.value = "";
  amount.value = "";
}
  
  
  
// Функция удаления операции
// Функция удаления операции
// Функция удаления операции
function deleteOperation(operationElement) {
    // Получаем данные операции
    const opAmount = parseFloat(operationElement.dataset.amount);
    const opType = operationElement.dataset.type;
    const opCategory = operationElement.dataset.category;
    const dateStr = operationElement.dataset.date;
    
    // Получаем день и месяц операции
    const selectedDate = new Date(dateStr);
    const selectedDay = selectedDate.getDate();
    const selectedMonthIndex = selectedDate.getMonth();
    
    // Обновляем данные приложения
    if (opType === "income") {
      currentBalance -= opAmount;
      totalIncome -= opAmount;
      statAmount.textContent = `${totalIncome} ₽`;
      
      // Обновляем данные для месяца
      monthlyData[selectedMonthIndex].income[selectedDay - 1] -= opAmount;
      categoryData[selectedMonthIndex][opCategory].income -= opAmount;
    } else if (opType === "expense") {
      currentBalance += opAmount;
      totalExpense -= opAmount;
      expenseAmount.textContent = `${totalExpense} ₽`;
      
      // Обновляем данные для месяца
      monthlyData[selectedMonthIndex].expense[selectedDay - 1] -= opAmount;
      categoryData[selectedMonthIndex][opCategory].expense -= opAmount;
    }
    
    // Обновляем баланс
    balanceAmount.textContent = `${currentBalance.toFixed(2)} ₽`;
    
    // Удаляем операцию из DOM
    operationElement.remove();
    
    // Если операция была в текущем месяце - обновляем графики
    if (selectedMonthIndex === currentMonthIndex) {
      updatePieChartForMonth(currentMonthIndex);
      updateBarChartForMonth(currentMonthIndex);
    }
    
    // Показываем empty-state если список операций пуст
    const transactionList = document.querySelector("#transactions-list");
    if (transactionList.children.length === 0) {
      transactionList.parentElement.appendChild(emptyState);
    }
  }
  
  
  // Обработчик для кнопок удаления операций
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
      deleteOperation(e.target.closest('li'));
    }
  });
  

  
  
  
  
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
        labels: {

          color: "#f5f5f5", // Цвет текста легенды
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw + " ₽";
          },
        },
        bodyColor: "#f5f5f5", // Цвет текста тултипа (подсказки)
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
      x: {
        ticks: {
          font: {
            letterSpacing: 2,
          },
          color: "#f5f5f5", // Цвет текста для оси X
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            letterSpacing: 2,
          },
          color: "#f5f5f5", // Цвет текста легенды
        },
      },
    },
  },
});

// Инициализация графиков для текущего месяца
// В конце кода после создания графиков
updatePieChartForMonth(currentMonthIndex);
updateBarChartForMonth(currentMonthIndex);
// Здесь просто убрано постоянное обновление фнукций
