import React, {useState, useEffect} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Alert from './components/Alert'
import uuid from 'uuid/v4'


const initialExpenses = localStorage.getItem('expenses') ?
    JSON.parse(localStorage.getItem("expenses")) : [];

function App() {
    // ********************STATE VALUES *************************
    //ALL expenses, add expenses
    const [expenses, setExpenses] = useState(initialExpenses);

    //single expense
    const [charge, setCharge] = useState('');

    //single amount
    const [amount, setAmount] = useState('');
    //alert
    const [alert, setAlert] = useState({show: false});
    // edit
    const [edit, setEdit] = useState(false);
    //edit item
    const [id, setId] = useState(0);

    // ******************** USEeffect *************************

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    // ******************** FUNCTIONALITY *************************
    //handle charge
    const handleCharge = e => {
        setCharge(e.target.value)
    };
    //handle Amount
    const handleAmount = e => {
        setAmount(e.target.value)
    };
    //handle Alert
    const handleAlert = ({type, text}) => {
        setAlert({show: true, type, text});
        setTimeout(() => {
            setAlert({show: false});
        }, 3000)
    };

    // handle Submit
    const handleSubmit = e => {
        e.preventDefault();
        if (charge !== '' && amount > 0) {

            if (edit) {
                let tempExpenses = expenses.map(item => {
                    return item.id === id ? {...item, charge, amount} : item
                });
                setExpenses(tempExpenses);
                setEdit(false);
                handleAlert({type: 'success', text: 'Item edited'});
            } else {
                const singleExpense = {id: uuid(), charge, amount};
                setExpenses([...expenses, singleExpense]);
                handleAlert({type: 'success', text: 'Item added'});
            }
            setCharge('');
            setAmount('');
        } else {
            //handle alert called
            handleAlert({
                type: 'danger', text: "charge can't be empty value and amount " +
                    "value has to be bigger than the thero"
            })
        }
    };
    // clear all items
    const clearItems = () => {
        setExpenses([]);
        handleAlert({type: "danger", text: "all items deleted"})
    };
    // handle delete
    const handleDelete = (id) => {
        let tempExpenses = expenses.filter(item => item.id !== id);
        setExpenses(tempExpenses);
        handleAlert({type: 'danger', text: 'item deleted'});
    };
    // handle edit
    const handleEdit = (id) => {
        let expense = expenses.find(item => item.id === id);
        let {charge, amount} = expense;
        setCharge(charge);
        setAmount(amount);
        setEdit(true);
        setId(id);
    };

    return (
        <>
            {alert.show && <Alert type={alert.type} text={alert.text}/>}
            <Alert/>
            <h1>budget calculator </h1>
            <main className="App">
                <ExpenseForm
                    charge={charge}
                    amount={amount}
                    handleCharge={handleCharge}
                    handleAmount={handleAmount}
                    handleSubmit={handleSubmit}
                    edit={edit}
                />
                <ExpenseList
                    expenses={expenses}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    clearItems={clearItems}
                />
            </main>
            <h1>
                total spending : <span className="total">
                ${expenses.reduce((acc, curr) => {
                return (acc += parseInt(curr.amount));
            }, 0)}
            </span>
            </h1>
        </>
    );
}

export default App;
