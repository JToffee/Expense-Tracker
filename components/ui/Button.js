import { View, StyleSheet, Pressable, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const colors = GlobalStyles.colors;

function Button({ children, onPress, mode, style }) {
	return (
		<View style={style}>
			<Pressable
				onPress={onPress}
				style={({ pressed }) => pressed && styles.pressed}
			>
				<View style={[styles.button, mode === "flat" && styles.flat]}>
					<Text
						style={[styles.buttonText, mode === " flat" && styles.flatText]}
					>
						{children}
					</Text>
				</View>
			</Pressable>
		</View>
	);
}

export default Button;

const styles = StyleSheet.create({
	button: {
		borderRadius: 8,
		padding: 8,
		backgroundColor: colors.primary200,
	},
	flat: {
		backgroundColor: "transparent",
	},
	buttonText: {
		color: colors.white,
		textAlign: "center",
	},
	flatText: {
		color: colors.primary200,
	},
	pressed: {
		opacity: 0.75,
		backgroundColor: colors.primary100,
		borderRadius: 8,
	},
});
