import { FlatList, View, Text } from "react-native";
import ExpenseItem from "./ExpenseITem";

function renderExpenseItem(itemData) {
	return <ExpenseItem {...itemData.item} />;
}
function ExpensesList({ expenses }) {
	return (
		<View>
			<FlatList
				data={expenses}
				renderItem={renderExpenseItem}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
}
export default ExpensesList;
