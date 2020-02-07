import React from 'react';
import {MdSend} from 'react-icons/md';

const ExpenseForm = () => {
    return <form>
        <div className="form-center">
            <div className="form-group">
                <label htmlFor="charge"> charge</label>
                <input type="text"
                       className="form-control"
                       id="charge"
                       name="charge"
                       placeholder=" Example rent..."
                />
            </div>
            <div className="form-group">
                <label htmlFor="amount"> amount</label>
                <input type="text"
                       className="form-control"
                       id="amount"
                       name="amount"
                       placeholder=" Example 100"
                />
            </div>
        </div>
    </form>;
};

export default ExpenseForm;