class Customer {
    constructor(name, lastName, dni, addressType, consumption, debt) {
        this.name = name;
        this.lastName = lastName;
        this.dni = dni;
        this.addressType = addressType;
        this.consumption = consumption;
        this.debt = debt;
        this.calculateAmountPayable();
    }

    calculateAmountPayable() {
        let costPerKW;
        if (this.addressType === "Residencial") {
            costPerKW = 2.25;
            if (this.consumption > 5000) {
                costPerKW *= 0.85; // 15% de descuento
            } else if (this.consumption > 2000) {
                costPerKW *= 0.90; // 10% de descuento
            }
        } else if (this.addressType === "Comercial") {
            costPerKW = 4.5;
            if (this.consumption > 7000) {
                costPerKW *= 0.85; // 15% de descuento
            } else if (this.consumption > 5000) {
                costPerKW *= 0.90; // 10% de descuento
            }
        }
        this.amountPayable = this.consumption * costPerKW;
    }
}

const customers = [];

function addCustomer() {
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const dni = document.getElementById("dni").value;
    const addressType = document.getElementById("addressType").value;
    const consumption = parseFloat(document.getElementById("consumption").value);
    const debt = parseFloat(document.getElementById("debt").value);

    if (name && lastName && dni && addressType && !isNaN(consumption) && !isNaN(debt)) {
        const customer = new Customer(name, lastName, dni, addressType, consumption, debt);
        customers.push(customer);
        showCustomers();
        document.getElementById("name").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("dni").value = "";
        document.getElementById("addressType").value = "";
        document.getElementById("consumption").value = "";
        document.getElementById("debt").value = "";
    }
}

function showCustomers(customersToShow = customers) {
    const customersTable = document.getElementById("customers-table");
    customersTable.innerHTML = "";

    // Crear la tabla y su encabezado
    const table = document.createElement("table");
    table.className = "table";
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.appendChild(thead);
    table.appendChild(tbody);

    // Crear la fila de encabezado
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Nombre</th><th>Apellido</th><th>DNI</th><th>Tipo de Domicilio</th><th>Consumo (KW)</th><th>Deuda</th><th>Monto a Pagar</th><th>Acciones</th>";
    thead.appendChild(headerRow);

    for (const customer of customersToShow) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.lastName}</td>
            <td>${customer.dni}</td>
            <td>${customer.addressType}</td>
            <td>${customer.consumption} KW</td>
            <td>$${customer.debt.toFixed(2)}</td>
            <td>$${customer.amountPayable.toFixed(2)}</td>
        `;

        // Agregar botón de eliminación
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.onclick = () => deleteCustomer(customer);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tbody.appendChild(row);
    }

    customersTable.appendChild(table);
}

function deleteCustomer(customer) {
    const index = customers.indexOf(customer);
    if (index !== -1) {
        customers.splice(index, 1);
        showCustomers();
    }
}

function searchByAmount() {
    const amountToSearch = parseFloat(document.getElementById("searchAmount").value);
    const filteredCustomers = customers.filter(customer => customer.debt === amountToSearch);
    showCustomers(filteredCustomers);
}

function showDebtors() {
    const debtorCustomers = customers.filter(customer => customer.debt > 0);
    showCustomers(debtorCustomers);
}

function sortByName() {
    const sortedCustomers = [...customers].sort((a, b) => a.name.localeCompare(b.name));
    showCustomers(sortedCustomers);
}
