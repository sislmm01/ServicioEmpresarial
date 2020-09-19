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
