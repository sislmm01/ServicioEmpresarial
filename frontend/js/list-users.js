(function () {
  const createColumn = (data) => {
    const td = document.createElement('td');
    const text = document.createTextNode(data);
    td.appendChild(text);
  
    return td;
  }
  
  const createRow = (user) => {
    const tr = document.createElement('tr');
  
    tr.appendChild(createColumn(user.username));
    tr.appendChild(createColumn(user.firstname));
    tr.appendChild(createColumn(user.lastname));
    tr.appendChild(createColumn(user.email));

    const tdOptions = document.createElement('td');
    const deleteButton = document.createElement('button');
    const url = `http://localhost:3000/delete/${user.id}`;
    deleteButton.innerHTML = 'eliminar';
    deleteButton.className = 'btn btn-danger';

    deleteButton.addEventListener('click', () => {
      fetch(url, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(result => {
        alert(result.message);
        location.reload();
      });
    });

    tdOptions.appendChild(deleteButton);
    tr.appendChild(tdOptions);
  
    return tr;
  };
  
  const getUsers = () => {
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(result => {
      const tableBody = document.querySelector("#table-content");
    
      result.response.forEach(user => {
        const tr = createRow(user);
        tableBody.appendChild(tr);
      });
    })
  }

  getUsers();
  
})();
