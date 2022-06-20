import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import {
	Inter_300Light,
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import IconButton from "./components/ui/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

//holds object with two components - navigator, screen

const colors = GlobalStyles.colors;

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpenseOverview() {
	function manageExpenseHandler() {}
	return (
		<BottomTabs.Navigator
			screenOptions={({ navigation }) => ({
				headerStyle: { backgroundColor: colors.primary400 },
				headerTintColor: colors.white,
				tabBarStyle: { backgroundColor: colors.primary400 },
				tabBarActiveTintColor: colors.accent100,
				headerRight: ({ tintColor }) => (
					<IconButton
						icon={"add"}
						color={tintColor}
						size={24}
						onPress={() => navigation.navigate("ManageExpense")}
					/>
				),
			})}
		>
			<BottomTabs.Screen
				name="RecentExpenses"
				component={RecentExpenses}
				options={{
					title: "Recent Expenses",
					tabBarLabel: "Recent",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="hourglass" size={size} color={color} />
					),
				}}
			/>
			<BottomTabs.Screen
				name="AllExpenses"
				component={AllExpenses}
				options={{
					title: "All Expenses",
					tabBarLabel: "All Expenses",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="calendar" size={size} color={color} />
					),
				}}
			/>
		</BottomTabs.Navigator>
	);
}

export default function App() {
	const [fontsLoaded] = useFonts({
		inter300: Inter_300Light,
		inter400: Inter_400Regular,
		inter500: Inter_500Medium,
	});
	if (!fontsLoaded) {
		return <AppLoading />;
	}
	return (
		<>
			<StatusBar style="dark" />
			<ExpensesContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: { backgroundColor: colors.primary400 },
							headerTintColor: colors.white,
						}}
					>
						<Stack.Screen
							name="ExpensesOverview"
							component={ExpenseOverview}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="ManageExpense"
							component={ManageExpense}
							options={{
								presentation: "modal",
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ExpensesContextProvider>
		</>
	);
}
