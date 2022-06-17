import ExpensesOutput from "../components/ExpensesOutput.js/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
	const expensesCtx = useContext(ExpensesContext);

	return (
		<ExpensesOutput
			expenses={expensesCtx.expenses}
			expensesPeriod="Total"
			fallbackText="No expenses found"
		></ExpensesOutput>
	);
}
export default AllExpenses;
