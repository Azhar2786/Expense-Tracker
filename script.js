const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const form = document.getElementById("transactionform");
const totalAmount = document.getElementById("total_ruppes");
const spentAmount = document.getElementById("spent_amount");
const gainedAmount = document.getElementById("gained_amount");
const transactionList = document.getElementById('itemlists');
const cancelButton = document.getElementById("cancelButton");
const submitButton = document.getElementById("submitButton");
const plusButton = document.getElementById("plusButton");
const minusButton = document.getElementById("minusButton");

let selectedColor = "green"; 

plusButton.addEventListener('click', () =>{
    console.log(selectedColor);
    selectedColor = "green";
    submitButton.classList.remove("bg-red-500");
    submitButton.classList.add("bg-green-600");
    plusButton.classList.add("selected");
    minusButton.classList.remove("selected");
});

minusButton.addEventListener('click', () =>{
    console.log(selectedColor);
    selectedColor = "red";
    submitButton.classList.remove("bg-green-600");
    submitButton.classList.add("bg-red-500");
    plusButton.classList.remove("selected");
    minusButton.classList.add("selected");
    
});






let count = 0;

form.addEventListener("submit", addTransaction);

function addTransaction(event) {
    event.preventDefault;
    const amount = document.getElementById("amount");
    const title = document.getElementById("title");
    const date = new Date().toLocaleDateString();
 
    if(amount.value != "" && title.value != ""){
        expenses.push( {
            id: expenses.length,
            amount: amount.value,
            title: title.value,
            date: date,
            color: selectedColor,
        });
    
        save(expenses);
        updateTotal();
        render();
        
    }

   
}

function save(expenses){
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// localStorage.clear();

function updateTotal() {
    const gaindTotalNewArray = expenses.filter((transaction) => transaction.color === "green");

    let gaindTotal = 0;
    gaindTotalNewArray.forEach(element => {
        gaindTotal += parseInt(element.amount);;
    });

    const spentTotalNewArray = expenses.filter((transaction) => transaction.color === "red");

    let spentTotal = 0;
    spentTotalNewArray.forEach(element => {
        spentTotal += parseInt(element.amount);
    });

    // console.log(spentTotalNewArray);

    const totalExpenese = gaindTotal - spentTotal;
    console.log(totalExpenese);
    totalAmount.innerText = `Rs. ${totalExpenese}`;
    gainedAmount.innerText = `Gained: ${gaindTotal}`;
    spentAmount.innerText = `Spent: ${spentTotal}`;
}

updateTotal();


function render(){
    expenses.forEach((expense) => {
        const list = document.createElement("li");

        list.classList.add('list_item', 'mx-2', 'bg-zinc-800', 'flex', 'gap-1', 'border-white', 'border-[1px]');

        list.innerHTML = `
            <div class="trans_amount flex items-center justify-center p-2 bg-${expense.color}-600 text-white max-w-[60px] w-[60px] font-bold border-${expense.color}-600 overflow-auto border-[2px]">${expense.amount}</div>

            <div class="right_part flex justify-between items-center w-[95%] px-4">
                <div class="text_area">
                    <h1 class="text-[18px] text-white font-bold">${expense.title}</h1>
                    <p class="date text-white">${expense.date}</p>
                </div>

                <button id="${expense.id}" class="w-[30px] h-[30px] delete_button rounded-full bg-gray-500 text-white flex items-center  justify-center closeButton">
                <i class="ri-close-line hover:bg-${expense.color}-500"></i>
                </button>
            </div>

        `;

        transactionList.appendChild(list);

        const deleteButton = list.querySelector('.delete_button');
        deleteButton.addEventListener('click', () => {
            deleteTransaction(expense.id);
        });
    });
}


render();


function deleteTransaction(id) {
    // Find the index of the transaction with the given id
    const index = expenses.findIndex(transaction => transaction.id === id);
    if (index !== -1) {
        // Remove the transaction from the expenses array
        expenses.splice(index, 1);
        // Update localStorage
        save(expenses);
        // Update the total amounts and re-render the list
        updateTotal();
        transactionList.innerHTML = '';
        render();
    }
}