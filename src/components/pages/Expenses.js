import { useEffect, useState } from "react";
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
    // const newExpense = { amount, description, category, customCategory };
    const newExpense = {
      amount,
      description,
      category,
    };
    // condtionally sote custom category in objectx`
    if (customCategory) {
      newExpense.customCategory = customCategory;
    }

    // Update the expenses state with the new expense using the spread operator
    // setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    fetch(
      "https://expense-tracker-56d18-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        body: JSON.stringify(newExpense),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Adding new expense failed");
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error.message));

    // Clear form input values after submission
    setAmount("");
    setDescription("");
    setCategory("");
    setCustomCategory("");
  };

  // Use the useEffect hook to perform an asynchronous operation when the component mounts
  useEffect(() => {
    // Make a GET request to the specified API endpoint
    fetch(
      "https://expense-tracker-56d18-default-rtdb.firebaseio.com/expenses.json",
      { method: "GET" }
    )
      // Handle the response from the API
      .then((response) => {
        // Check if the response status is okay
        if (!response.ok) {
          // If not okay, throw an error with a custom message
          throw new Error("Data fetching failed");
        }
        // If okay, parse the response body as JSON and return the result
        return response.json();
      })
      // Handle the parsed data from the JSON response
      .then((data) => {
        // Extract values from the data object (or use an empty object if data is null or undefined)
        const fetchedValues = Object.values(data || {});
        const fetchedIds = Object.keys(data || {});

        let expensesWithIds = [];
        for (let i = 0; i < fetchedIds.length; i++) {
          expensesWithIds = [
            ...expensesWithIds,
            { id: fetchedIds[i], ...fetchedValues[i] },
          ];
        }
        // Set the component's state with the fetched expenses
        setExpenses(expensesWithIds);
      })
      // Handle any errors that occurred during the fetch or parsing process
      .catch((error) => console.log(error.message));
  }, [expenses]); // The empty dependency array ensures that this useEffect runs only once when the component mounts

  // Function to handle the deletion of an expense by making a DELETE request to the Firebase Realtime Database
  const deleteHandler = (id) => {
    fetch(
      `https://expense-tracker-56d18-default-rtdb.firebaseio.com/expenses/${id}.json`,
      { method: "DELETE" } // Specify that this is a DELETE request
    )
      .then((response) => {
        // Check if the response status is not okay 
        if (!response.ok) {
          throw new Error("Expenses deletion failed"); // Throw an error if deletion is not successful
        }
        // If the response status is okay, the deletion was successful
      })
      .catch((error) => console.log(error.message)); // Catch any errors that occurred during the fetch or deletion process
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

        {/* Display expenses using the map function */}
        {expenses.length > 0 && (
          <ul className={classes.expenses_list}>
            {expenses.map((item) => (
              <li key={item.id}>
                <strong>Item:</strong>
                {item.description}: <strong>Rs.</strong>
                {item.amount}, <strong>Category:</strong>
                {item.category}
                {/* Display custom category in parentheses for "Other" category */}
                {item.category === "Other" && `(${item.customCategory})`}
                <button onClick={() => deleteHandler(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
};

export default Expenses;
