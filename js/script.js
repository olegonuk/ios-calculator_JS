window.addEventListener('DOMContentLoaded', () => {

   const displayValue = document.querySelector('.block-calc-val'),
      btnNumbers = document.querySelectorAll('.btn-number'),
      btnOperators = document.querySelectorAll('.btn-operator'),
      btnDot = document.querySelector('.btn-dot'),
      clearBtn = document.getElementById('clear-btn'),
      addMinysBtn = document.getElementById('addMinys-btn'),
      percentBtn = document.getElementById('percent-Btn'),
      btnMrPlus = document.getElementById('btn-mrPlus'),
      btnMrMinus = document.getElementById('btn-mr-minus'),
      btnMrClear = document.getElementById('btn-mr-clear'),
      btnMrRead = document.getElementById('btn-mr-read'),
      btnCalcPlus = document.getElementById('btn-calc-plus'),
      topTime = document.querySelector('.top-time'),
      btnEqual = document.getElementById('btn-equal');

   let valueInsert = '0';
   let pendingVal;
   let dot = ',';
   let memoryNum = 0;
   let strigArr = [];

   // Добавление "0" к цифре меньше 10 в часах
   const addZero = (t) => {
      return t = t < 10 ? '0' + t : t
   };
   // Отрисовка часов на дисплей
   const updateTime = () => {
      let time = new Date();
      let timeHours = time.getHours();
      let timeMinutes = time.getMinutes();
      // let timeSeconds = time.getSeconds();
      topTime.textContent = `${addZero(timeHours)}:${addZero(timeMinutes)}`;
   };
   //Блок с кнопкакми мемориНамбер
   const memoryNumber = () => {

      function mrClear() {
         memoryNum = 0;
      };
      function mrMinus() {
         memoryNum = Number(pendingVal) - memoryNum;
         console.log(memoryNum);
      };
      function mrPlus() {
         memoryNum += Number(pendingVal);
         console.log(memoryNum);
      };
      function mrRead() {
         valueInsert = String(memoryNum).replace('.', dot);
         displayValue.textContent = valueInsert;
      };

      return {
         mrClear,
         mrRead,
         mrMinus,
         mrPlus
      }
   };
   const moduleMemoryNumber = memoryNumber();

   //Масштабирование цифр по длине
   const displayValueLength = () => {
      if (displayValue.textContent.length > 6) {
         displayValue.style.fontSize = '40px';
         if (displayValue.textContent.length > 9) {
            displayValue.style.fontSize = '25px';
         }
      } else {
         displayValue.style.fontSize = '55px';
      }
   };

   // Очистка значения калькулятора
   const clearDisplayValue = () => {

      if (clearBtn.textContent === 'C') {
         clearBtn.textContent = 'AC';
      }
      valueInsert = '0';
      pendingVal = undefined;
      strigArr = [];
      displayValue.style.fontSize = '55px';

      displayValue.textContent = valueInsert;
   };

   //Добавление запятой/точки к числу
   const addDot = () => {

      dot = btnDot.textContent;
      if (!valueInsert.includes(dot)) {
         valueInsert += dot;
      }

      clearBtn.textContent = 'C';
      displayValue.textContent = valueInsert;
   };

   //Добавление/убирание '-';
   const addMinus = (e) => {
      const targetVal = e.target.dataset.sign;
      if (!valueInsert.includes(targetVal)) {
         valueInsert = targetVal + valueInsert;
      } else {
         valueInsert = valueInsert.slice(1);
      }

      displayValue.textContent = valueInsert;
   }

   //Высчитать %
   const percentNum = () => {
      // valueInsert = valueInsert.replace(dot, '.');
      valueInsert = valueInsert.replace(dot, '.') / 100;
      valueInsert = String(valueInsert.toFixed(3)).replace('.', dot);

      displayValue.textContent = valueInsert;
   };
   //Изменение запятой на точку для "матиматических операций"
   const replaceDot = () => {
      if (valueInsert.includes(dot)) {
         valueInsert = valueInsert.replace(dot, '.');
      }
   };

   // Функция оператор
   const mathOperator = (operator) => {
      pendingVal = valueInsert;
      valueInsert = '0';
      strigArr.push(pendingVal);
      strigArr.push(operator);
   };
   const pressNumbr = (e) => {
      const targetVal = e.target.textContent;
      if (valueInsert === '0') {
         valueInsert = '';
      } else if (valueInsert === '-0') {
         valueInsert = '-';
      }
      clearBtn.textContent = 'C';
      valueInsert += targetVal;

      displayValue.textContent = valueInsert;
      displayValueLength();
   }
   //Навешивание обработчика на кнопки с цыфрами
   btnNumbers.forEach(btnNum => {
      btnNum.addEventListener('click', pressNumbr);
   });

   //Навешивание обработчика событий на "матиматические операции"
   btnOperators.forEach(btnOperator => {
      btnOperator.addEventListener('click', (e) => {
         const operator = e.target.dataset.sign;
         replaceDot();

         if (btnOperator.dataset.sign === operator) {
            mathOperator(operator);
         }
      });
   });
   // Вызов функции результата вычесления "равно"
   btnEqual.addEventListener('click', () => {
      replaceDot();

      strigArr.push(valueInsert);
      let resultEval = eval(strigArr.join(''));
      resultEval = String(resultEval).replace('.', dot);
      valueInsert = resultEval;
      displayValue.textContent = valueInsert;
      strigArr = [];
      displayValueLength();
   });

   updateTime();
   setInterval(updateTime, 1000);

   //Обработчики событий блок мемориНамбер
   btnMrClear.addEventListener('click', moduleMemoryNumber.mrClear);
   btnMrRead.addEventListener('click', moduleMemoryNumber.mrRead);
   btnMrMinus.addEventListener('click', moduleMemoryNumber.mrMinus);
   btnMrPlus.addEventListener('click', moduleMemoryNumber.mrPlus);

   //Обработчики событий добавление запятой/точки
   btnDot.addEventListener('click', addDot);

   //Обработчики событий блок "Очистка значения/Добоваление '-'/ Вычисление %"
   clearBtn.addEventListener('click', clearDisplayValue);
   addMinysBtn.addEventListener('click', addMinus);
   percentBtn.addEventListener('click', percentNum);

});