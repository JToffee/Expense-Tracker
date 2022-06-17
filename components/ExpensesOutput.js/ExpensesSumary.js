import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const colors = GlobalStyles.colors;

function ExpensesSummary({ expenses, periodName }) {
	const expensesSum = expenses.reduce(
		(sum, expense) => sum + expense.amount,
		0
	);
	return (
		<View style={styles.container}>
			<Text style={styles.period}>{periodName}</Text>
			<Text style={styles.sum}>KSH{expensesSum.toFixed(2)}</Text>
		</View>
	);
}
export default ExpensesSummary;

const styles = StyleSheet.create({
	container: {
		padding: 8,
		backgroundColor: colors.primary50,
		borderRadius: 6,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	period: {
		fontSize: 12,
		color: colors.primary400,
		fontFamily: "inter400",
	},
	sum: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.primary500,
		fontFamily: "inter500",
	},
});
