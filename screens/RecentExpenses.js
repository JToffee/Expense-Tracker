import ExpensesOutput from "../components/ExpensesOutput.js/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { useEffect, useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrrorOverlay from "../components/ui/ErrrorOverlay";

function RecentExpenses() {
	//loading state
	const [isFetching, setIsFetching] = useState(true);

	//error state
	const [error, setError] = useState();

	//expenses context
	const expensesCtx = useContext(ExpensesContext);

	// const [fetchedExpenses, setFetchedExpenses] = useState([]);
	useEffect(() => {
		async function getExpenses() {
			setIsFetching(true);

			// fetch expenses form the backend
			try {
				const expenses = await fetchExpenses();
				expensesCtx.setExpenses(expenses);
			} catch (error) {
				//error handling
				setError(`Could not fetch expenses :  ${error.message}`);
			}
			setIsFetching(false);

			// setFetchedExpenses(expenses);
		}

		getExpenses();
	}, []);

	function errorHandler() {
		setError(null);
	}

	//Show error overlay
	if (error && !isFetching) {
		return <ErrrorOverlay message={error} onConfirm={errorHandler} />;
	}

	//show loading overlay
	if (isFetching) {
		return <LoadingOverlay />;
	}

	//filter recent expenses
	const recentExpenses = expensesCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7daysAgo = getDateMinusDays(today, 7);

		return expense.date >= date7daysAgo && expense.date <= today;
	});

	return (
		<ExpensesOutput
			expenses={recentExpenses}
			expensesPeriod="Last 7 days"
			fallbackText="No expenses in the last 7 days"
		/>
	);
}
export default RecentExpenses;
