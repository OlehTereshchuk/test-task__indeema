const form = document.getElementById('form');
const textArea = document.getElementById('textarea');
const textareaWrapper = document.getElementsByClassName('d-none')[0];
const validator = str => /^\d+(\.\d{0,2})?$/g.test(str);

const calculateChange = (sum, price) => {
  const sumInCents = +sum * 100;
  const priceInCents = +price * 100;

  if (sumInCents < priceInCents) {
    alert('The sum isn`t enough to pay for goods')
    return;
  }

  return ((sumInCents - priceInCents) / 100).toFixed(2);
};

const getNominals = (change) => {
  let changeInCents = change * 100;
  const nominals = [100, 50, 25, 10, 5, 1];
  let result = 'By nominal value of ';

  for (let i = 0; i < nominals.length; i++) {
    if (i === 0 && changeInCents / nominals[i] >= 1) {
      const quantity = 
        Math.floor(changeInCents / nominals[i]) === 1
        ? 'dollar'
        : 'dollars';

      result += `${Math.floor(changeInCents / nominals[i])} ${quantity},`;
      changeInCents -= Math.floor(changeInCents / nominals[i]) * nominals[i];

      continue;
    } else if (changeInCents / nominals[i] >= 1) {
      const quantity = 
        Math.floor(changeInCents / nominals[i]) > 1 
        ? Math.floor(changeInCents / nominals[i]) + ' of '
        : ' ';

      result += `${quantity}${nominals[i]} cents, `
      changeInCents -= Math.floor(changeInCents / nominals[i]) * nominals[i]
    }
  }


  return result.replace(/,([^,]*)$/, '.');
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const sum = document.getElementById('sum').value;
  const price = document.getElementById('price').value;
  const isSumValidated = validator(sum);
  const isPriceValidated = validator(price);

  if (!isSumValidated) {
    alert('Sum doesn`t contain correct characters');
    return;
  } else if (!isPriceValidated) {
    alert('Price doesn`t contain correct characters')
    return;
  }

  const change = calculateChange(sum, price);
  
  if (!change) return;

  const nominals = getNominals(change);
  textArea.innerHTML = 
  `Your change is ${change} dollars\n(${nominals})`;
  
  textareaWrapper.classList.remove('d-none');
});