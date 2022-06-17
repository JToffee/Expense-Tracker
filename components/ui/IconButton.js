import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

function IconButton({ icon, color, size, onPress }) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => pressed && styles.pressed}
		>
			<View style={styles.buttonContainer}>
				<Ionicons name={icon} color={color} size={size} />
			</View>
		</Pressable>
	);
}

export default IconButton;

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 24,
		padding: 6,
		margin: 8,
	},
	pressed: {
		opacity: 0.75,
	},
});
