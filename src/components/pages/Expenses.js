import { useState } from "react";
import classes from "./Expenses.module.css";

const Expenses = () => {
  // State variables for managing form inputs and expenses list
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [customCategory, setCustomCategory] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    // Create a new expense object with the form input values
    const newExpense = { amount, description, category, customCategory };

    // Update the expenses state with the new expense using the spread operator
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    // Clear form input values after submission
    setAmount("");
    setDescription("");
    setCategory("");
    setCustomCategory("");
  };

  return (
    <>
      {/* Expense Tracker Form */}
      <form onSubmit={submitHandler}>
        <h2>Expenses Tracker</h2>

        {/* Input for Amount */}
        <label htmlFor="amount">Amount</label>
        <input
          className={classes.expense_amt}
          id="amount"
          type="number"
          placeholder="Enter your amount..."
          onChange={(event) => setAmount(event.target.value)}
          value={amount}
          required
        ></input>

        {/* Textarea for Description */}
        <label htmlFor="description">Description</label>
        <textarea
          className={classes.description}
          id="description"
          placeholder="Enter the description..."
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          required
        ></textarea>

        {/* Dropdown for Category */}
        <label>Category</label>
        <select
          onChange={(event) => setCategory(event.target.value)}
          value={category}
        >
          <option>Select</option>
          <option>Food</option>
          <option>Petrol</option>
          <option>Salary</option>
          <option>Other</option>
        </select>

        {/* Custom Category Input (conditional based on selected category) */}
        {category === "Other" && (
          <input
            className={classes.custom_category}
            type="text"
            placeholder="Enter custom category..."
            value={customCategory}
            onChange={(event) => setCustomCategory(event.target.value)}
          />
        )}

        {/* Submit Button */}
        <button type="submit">Add Expense</button>

        {/* Display Expenses List */}
        <section>
          {/* Display expenses using the map function */}
          {expenses.length > 0 && (
            <ul className={classes.expenses_list}>
              {expenses.map((item, index) => (
                <li key={index}>
                  {item.description}: {item.amount}, {item.category}
                  {/* Display custom category in parentheses for "Other" category */}
                  {item.category === "Other" && `(${item.customCategory})`}
                </li>
              ))}
            </ul>
          )}
        </section>
      </form>
    </>
  );
};

export default Expenses;
