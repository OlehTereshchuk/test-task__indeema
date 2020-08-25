const table = document.getElementsByClassName('table')[0];
const form = document.getElementById('form');
const deleteButton = document.getElementById('deleteButton');
const selected = document.getElementsByClassName('selected');
const editButtons = [...document.getElementsByClassName('edit')];

const handleEdit = (e) => {
  e.stopPropagation();
  const tds = e.target.parentElement.children;

  e.target.classList.toggle('save');
  if (e.target.classList.contains('save')) {
    e.target.innerHTML = 'Save';
    for (let i = 0; i < tds.length - 1; i++) {
      tds[i].setAttribute("contenteditable", "true")
    }
  } else {
    e.target.innerHTML = 'Edit';
    for (let i = 0; i < tds.length - 1; i++) {
      tds[i].removeAttribute("contenteditable")
    }
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name');
  const surname = document.getElementById('surname');
  const email = document.getElementById('email');
  const date = new Date();
  const formattedDate = date.toJSON().slice(0, 10).split('-').reverse().join('.');
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.classList.add('edit');
  td.innerHTML = 'Edit';
  td.addEventListener('click', handleEdit);
  
  const template = `
      <td>${name.value}</td>
      <td>${surname.value}</td>
      <td>${email.value}</td>
      <td>${formattedDate}</td>
  `;

  tr.innerHTML += template;
  tr.append(td);
  table.tBodies[0].append(tr);

  name.value = '';
  surname.value = '';
  email.value = '';
});

table.tBodies[0].addEventListener('click', (e) => {
  if (e.target.hasAttribute("contenteditable")) return;

  e.target.parentElement.classList.toggle('selected')

  if (selected.length === 0) deleteButton.innerHTML = 'Delete'
  else deleteButton.innerHTML = `Delete ${selected.length} selected`;
})

deleteButton.addEventListener('click', () => {
  [...selected].forEach(element => element.remove())

  if (selected.length === 0) deleteButton.innerHTML = 'Delete'
  else deleteButton.innerHTML = `Delete ${selected.length} selected`;
})

editButtons.forEach(button => {
  button.addEventListener('click', handleEdit)
});
