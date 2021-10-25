// select chart element
const chart = document.querySelector('.chart');

// create canvas element
const canvas = document.createElement('canvas');
canvas.width = 100;
canvas.height = 100;

// append canvas to chart element
chart.appendChild(canvas);

// get context of canvas to draw circle
const ctx = canvas.getContext('2d');

// change line width
ctx.lineWidth = 20;

// circle radius
const R = 40;

function drawCircle(color, ratio, anticlockwise) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    R,
    0,
    ratio * 2 * Math.PI,
    anticlockwise
  );
  ctx.stroke();
}

function updateChart(income, outcome) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let ratio = income / (income + outcome);

  drawCircle('#fff', -ratio, true);
  drawCircle('#f0624d', 1 - ratio, false);
}

/* ****************** */
// SELECT ELEMENTS
const balanceEl = document.querySelector('.balance .value');
const incomeTotalEl = document.querySelector('.income-total');
const outcomeTotalEl = document.querySelector('.outcome-total');
const incomeEl = document.querySelector('#income');
const expenseEl = document.querySelector('#expense');
const allEl = document.querySelector('#all');
const incomeList = document.querySelector('#income .list');
const expenseList = document.querySelector('#expense .list');
const allList = document.querySelector('#all .list');

// Select buttons
const expenseBtn = document.querySelector('.tab1');
const incomeBtn = document.querySelector('.tab2');
const allBtn = document.querySelector('.tab3');

// input btns
const addExpense = document.querySelector('.add-expense');
const expenseTitle = document.getElementById('expense-title-input');
const expenseAmount = document.getElementById('expense-amount-input');

const addIncome = document.querySelector('.add-income');
const incomeTitle = document.getElementById('income-title-input');
const incomeAmount = document.getElementById('income-amount-input');

// VARIABLES
let ENTRY_LIST = [];
let balance = 0,
  income = 0,
  outcome = 0;

const DELETE = 'delete',
  EDIT = 'edit';

// check saved data in local storage
ENTRY_LIST = JSON.parse(localStorage.getItem('entry_list')) || [];
updateUI();

// EVENT LISTENERS
expenseBtn.addEventListener('click', () => {
  show(expenseEl);
  hide([incomeEl, allEl]);
  active(expenseBtn);
  inactive([incomeBtn, allBtn]);
});

incomeBtn.addEventListener('click', () => {
  show(incomeEl);
  hide([expenseEl, allEl]);
  active(incomeBtn);
  inactive([expenseBtn, allBtn]);
});

allBtn.addEventListener('click', () => {
  show(allEl);
  hide([incomeEl, expenseEl]);
  active(allBtn);
  inactive([expenseBtn, incomeBtn]);
});

addExpense.addEventListener('click', () => {
  // if one is empty then exit
  if (!expenseTitle.value || !expenseAmount.value) return;

  // save entry to ENTRY_LIST
  let expense = {
    type: 'expense',
    title: expenseTitle.value,
    amount: parseInt(expenseAmount.value), //convert to integer
  };
  ENTRY_LIST.push(expense);

  // update UI
  updateUI();
  clearInput([expenseTitle, expenseAmount]);
});

addIncome.addEventListener('click', () => {
  // if one is empty then exit
  if (!incomeTitle.value || !incomeAmount.value) return;

  // save entry to ENTRY_LIST
  let income = {
    type: 'income',
    title: incomeTitle.value,
    amount: parseInt(incomeAmount.value), //convert to integer
  };
  ENTRY_LIST.push(income);

  // update UI
  updateUI();
  clearInput([incomeTitle, incomeAmount]);
});

incomeList.addEventListener('click', deleteOrEdit);
expenseList.addEventListener('click', deleteOrEdit);
allList.addEventListener('click', deleteOrEdit);

// HELPER FUNCTIONS
// edit or delete
function deleteOrEdit(event) {
  const targetBtn = event.target;

  const entry = targetBtn.parentNode;

  if (targetBtn.id == DELETE) {
    deleteEntry(entry);
  } else if (targetBtn.id == EDIT) {
    editEntry(entry);
  }
}

function deleteEntry(entry) {
  ENTRY_LIST.splice(entry.id, 1);

  updateUI();
}

function editEntry(entry) {
  let ENTRY = ENTRY_LIST[entry.id];

  if (ENTRY.type == 'income') {
    incomeAmount.value = ENTRY.amount;
    incomeTitle.value = ENTRY.title;
  } else if (ENTRY.type == 'expense') {
    expenseAmount.value = ENTRY.amount;
    expenseTitle.value = ENTRY.title;
  }
  deleteEntry(entry);
  updateUI();
}

function updateUI() {
  income = calculateTotal('income', ENTRY_LIST);
  outcome = calculateTotal('expense', ENTRY_LIST);
  balance = Math.abs(calculateBalance(income, outcome));

  // set balance sign
  let sign = income >= outcome ? '$' : '-$';

  if (income < outcome) {
    let changeColor = document.getElementById('color');
    changeColor.classList.toggle('text-danger');
  }

  // update UI with total element
  balanceEl.innerHTML = `<h1 class="value"><small>${sign}</small>${balance}</h1>`;
  outcomeTotalEl.innerHTML = `<h3 class="outcome-total text-danger"><small class="mr-2"></small>$${outcome}</h3>`;
  incomeTotalEl.innerHTML = `<h3 class="outcome-total">$${income}</h3>`;

  clearElement([expenseList, incomeList, allList]);

  ENTRY_LIST.forEach((entry, index) => {
    if (entry.type == 'expense') {
      showEntry(expenseList, entry.type, entry.title, entry.amount, index);
    } else if (entry.type == 'income') {
      showEntry(incomeList, entry.type, entry.title, entry.amount, index);
    }
    showEntry(allList, entry.type, entry.title, entry.amount, index);
  });
  updateChart(income, outcome);

  // set localStorage
  localStorage.setItem('entry_list', JSON.stringify(ENTRY_LIST));
}

// show entry
function showEntry(list, type, title, amount, id) {
  const entry = `<li class="${type} border-0 d-flex p-2 mb-1 justify-content-between row" id="${id}">
                <div class="d-flex flex-column item col">
                  <h6 class="mb-1 text-sm entry">${title}</h6>
                  <p>$${amount}</p>
                </div>
                <div class="m-2" id="edit"></div>
                <div class="m-2" id="delete"></div>
              </li>
                    `;

  // add entry at the top of the list
  const position = 'afterbegin';
  list.insertAdjacentHTML(position, entry);
}

function clearElement(elements) {
  elements.forEach((element) => {
    element.innerHTML = '';
  });
}

// calculate total
function calculateTotal(type, list) {
  let sum = 0;

  list.forEach((entry) => {
    if (entry.type == type) {
      sum += entry.amount;
    }
  });

  return sum;
}

// calculate balance
function calculateBalance(income, outcome) {
  return income - outcome;
}

// clear input
function clearInput(inputs) {
  inputs.forEach((input) => {
    input.value = '';
  });
}

// class toggling
function show(element) {
  element.classList.remove('hide');
}

function hide(elements) {
  elements.forEach((element) => {
    element.classList.add('hide');
  });
}

function active(element) {
  element.classList.add('active');
}

function inactive(elements) {
  elements.forEach((element) => {
    element.classList.remove('active');
  });
}
