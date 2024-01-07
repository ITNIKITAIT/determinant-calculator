const Buttons = {
  calcBtn: document.querySelector('.calcucate'),
  clearBtn: document.querySelector('.clear'),
  randomBtn: document.querySelector('.random'),
  rowPlusBtn: document.getElementById('row_plus'),
  rowMinusBtn: document.getElementById('row_minus'),
  columnPlusBtn: document.getElementById('column_plus'),
  columnMinusBtn: document.getElementById('column_minus'),
}
const determinant = document.querySelector('.determinant');
const form = document.querySelector('.form');
const totalRow = document.querySelector('.row');
const totalColumn = document.querySelector('.column');


// Form to Matrix

function FormToMatrix() {
  const matrix = [];
  let length = Math.sqrt(form.length);
  
  for (let i = 0; i < length; i++) {
    matrix.push([]);
    for (let j = 0; j < length; j++) {
      let value = parseInt(form[length * i + j].value);
      if (Number.isNaN(value)) throw 'Incorrect cell format';
      matrix[i].push(value);
    }
  }
  return {matrix, length};
}

//Minor method (not effective)
function MinorDetCalc(matrix, length) {
  if (matrix.length === 1) return matrix[0];
  let result = 0;
  let row = matrix[0];
  for (let i = 0; i < length; i++) {

    const Minor = [];
    for (let j = 1; j < length; j++) {
      Minor.push([]);
      for (let k = 0; k < length; k++) {
        if (k === i) continue;
        Minor[j - 1].push(matrix[j][k]);
      }
    }

    let factor = 1;
    if (i % 2 != 0) factor = -1;
    result += row[i] * MinorDetCalc(Minor, length - 1) * factor;
  }
  return result;
}

// Gauss method
function GaussDetCalc(matrix, length) {
  let result = 1;
  for (let i = 0; i < length - 1; i++) {
    for (let j = i+1; j < length; j++) {
      if (matrix[i][i] === 0) {
        [matrix[j], matrix[i]] = [matrix[i], matrix[j]];
        result *= -1;
        continue;
      } 
      const multiplier = -matrix[j][i]/matrix[i][i];
      for (let k = i; k < length; k++) {
        matrix[j][k] += multiplier * matrix[i][k];
      }
    }
  }
  console.log(matrix)
  for (let i = 0; i < length; i++) {
    result *= matrix[i][i];
  }
  // console.log(Math.round(result))
  return Math.round(result);
}

// main function
Buttons.calcBtn.addEventListener('click', () => {
  try {
    if (totalRow.value !== totalColumn.value) {
      throw 'Matrix is not square';
    }
  
    const {matrix, length} = FormToMatrix();
  
    // const result = MinorDetCalc(matrix, length);
    const result = GaussDetCalc(matrix, length); 
  
    determinant.textContent = `Determinant = ${result}`;
    determinant.style.color = '#fff';
  }
  catch(err) {
    determinant.textContent = err;
    determinant.style.color = 'red';
  }
  finally {
    determinant.style.display = 'block';
  }
})

// Size of Matrix

function updateForm() {
  form.innerHTML = '';
  const totalInput = totalRow.value * totalColumn.value;
  form.style.maxWidth = `${(totalInput/totalColumn.value)*80 + (totalInput/totalColumn.value - 1)*32}px`;
  for (let i = 0; i < totalInput; i++) {
    form.insertAdjacentHTML('beforeend', 
    `<input type="text" id="${i}" class="input">`
    )
  }
}


function increment(input) {
  input.value = parseInt(input.value) + 1;
}
function decrement(input) {
  if (input.value === '1') return;
  input.value = parseInt(input.value) - 1;
}

Buttons.rowPlusBtn.addEventListener('click', () => {
  increment(totalRow);
  updateForm();
})

Buttons.rowMinusBtn.addEventListener('click', () => {
  decrement(totalRow);
  updateForm();
})

Buttons.columnPlusBtn.addEventListener('click', () => {
  increment(totalColumn);
  updateForm();
})

Buttons.columnMinusBtn.addEventListener('click', () => {
  decrement(totalColumn);
  updateForm();
})

totalRow.addEventListener('change', () => {
  updateForm();
});

totalColumn.addEventListener('change', () => {
  updateForm();
})

// additional buttons

Buttons.randomBtn.addEventListener('click', () => {
  for (let input of form) {
    input.value = Math.floor(Math.random()*10);
  }
})

Buttons.clearBtn.addEventListener('click', () => {
  for (let input of form) {
    input.value = '';
  }
})