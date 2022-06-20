import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const colors = GlobalStyles.colors;

function Input({ style, invalid, label, textInputConfig }) {
	const inputStyles = [styles.input];

	//Adding extra styling to input conditionally

	if (textInputConfig && textInputConfig.multiline)
		inputStyles.push(styles.inputMultiline);

	if (invalid) {
		inputStyles.push(styles.invalidInput);
	}

	return (
		<View style={[styles.inputContainer, style]}>
			<Text style={[styles.label, invalid && styles.invalidLabel]}>
				{label}
			</Text>
			<TextInput style={inputStyles} {...textInputConfig} />
		</View>
	);
}

export default Input;

const styles = StyleSheet.create({
	inputContainer: {
		marginHorizontal: 4,
		marginVertical: 8,
	},
	label: {
		color: colors.white,
		fontSize: 12,
		marginBottom: 4,
	},
	input: {
		backgroundColor: colors.accent200,
		padding: 6,
		borderRadius: 6,
		fontSize: 18,
		color: colors.primary800,
	},
	inputMultiline: {
		minHeight: 100,
		textAlignVertical: "top",
	},
	invalidLabel: {
		color: colors.error500,
	},
	invalidInput: {
		backgroundColor: colors.error50,
	},
});
