import axios from "axios";

// Helper functions to send requests

const BACKEND_URL =
	"https://expense-tracker-3be8b-default-rtdb.firebaseio.com/";

//Store expenses to firebase and return the id
export async function storeExpense(expenseData) {
	const response = await axios.post(
		`${BACKEND_URL}/expenses.json`,
		expenseData
	);

	const id = response.data.name;
	return id;
}

//fetch expenses from firebase
export async function fetchExpenses() {
	const response = await axios.get(`${BACKEND_URL}/expenses.json`);

	const expenses = [];
	for (const key in response.data) {
		const expenseObj = {
			id: key,
			amount: response.data[key].amount,
			date: new Date(response.data[key].date),
			description: response.data[key].description,
		};

		expenses.push(expenseObj);
	}
	return expenses;
}

//Update expenses in firebase
export function updateExpense(id, expenseData) {
	return axios.put(`${BACKEND_URL}/expenses/${id}.json/`, expenseData);
}

//Delete expenses in firebase
export function deleteExpense(id) {
	return axios.delete(`${BACKEND_URL}/expenses/${id}.json/`);
}
