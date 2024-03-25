document.getElementById('customerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addCustomer();
});

function addCustomer() {
    var name = document.getElementById('name').value;
    var contact = document.getElementById('contact').value;
    var membership = document.getElementById('membership').value;

    var table = document.getElementById('customerTable');
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = name;
    cell2.innerHTML = contact;
    cell3.innerHTML = membership;
    cell4.innerHTML = '<button class="delete-btn" onclick="deleteCustomer(this)">Delete</button>';

    document.getElementById('name').value = '';
    document.getElementById('contact').value = '';
    document.getElementById('membership').value = 'Basic';
}

function deleteCustomer(row) {
    var rowIndex = row.parentNode.parentNode.rowIndex;
    document.getElementById('customerTable').deleteRow(rowIndex);
}
