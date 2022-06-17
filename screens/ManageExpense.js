import { View, StyleSheet } from "react-native";
import { useLayoutEffect } from "react";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useContext, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrrorOverlay from "../components/ui/ErrrorOverlay";

const colors = GlobalStyles.colors;
function ManageExpense({ route, navigation }) {
	//error state
	const [error, setError] = useState();

	//submitting state
	const [isSubmitting, setIsSubmitting] = useState(false);

	const expensesCtx = useContext(ExpensesContext);
	const editedExpenseId = route.params?.expenseId;

	const isEditing = !!editedExpenseId;

	const selectedExpense = expensesCtx.expenses.find(
		(expense) => expense.id === editedExpenseId
	);

	useLayoutEffect(
		() =>
			navigation.setOptions({
				title: isEditing ? "Edit Expense" : "Add Expense",
			}),
		[navigation, isEditing]
	);

	async function deleteExpenseHandler() {
		setIsSubmitting(true);
		try {
			await deleteExpense(editedExpenseId);
			expensesCtx.deleteExpense(editedExpenseId);
			navigation.goBack();
		} catch (error) {
			//error handling
			setError(`Could not delete expenses :  ${error.message}`);
			setIsSubmitting(false);
		}
	}

	function cancelHandler() {
		navigation.goBack();
	}

	async function confirmHandler(expenseData) {
		setIsSubmitting(true);
		try {
			if (isEditing) {
				expensesCtx.updateExpense(editedExpenseId, expenseData);
				await updateExpense(editedExpenseId, expenseData);
			} else {
				const id = await storeExpense(expenseData);

				expensesCtx.addExpense({ ...expenseData, id: id });
			}
			navigation.goBack();
		} catch (error) {
			//error handling
			setError(`Could not save expense :  ${error.message}`);
			setIsSubmitting(false);
		}
	}
	function errorHandler() {
		setError(null);
	}
	if (error && !isSubmitting) {
		return <ErrrorOverlay message={error} onConfirm={errorHandler} />;
	}
	if (isSubmitting) {
		return <LoadingOverlay />;
	}

	return (
		<View style={styles.container}>
			<ExpenseForm
				onCancel={cancelHandler}
				submitButtonLabel={isEditing ? "Update" : "Add"}
				onSubmit={confirmHandler}
				defaultValues={selectedExpense}
			/>

			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon={"trash"}
						color={colors.error500}
						size={26}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
}
export default ManageExpense;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: colors.primary800,
	},
	deleteContainer: {
		marginTop: 24,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: colors.primary200,
		alignItems: "center",
	},
});
