import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/Home'
import LastbilScreen from './src/Lastbil';
import SkrivbordScreen from './src/Skrivbord';

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator 
				initialRouteName = "Home">
				<Stack.Group>
					<Stack.Screen
						name = "Home"
						component = {HomeScreen}
						options = {{headerShown: false}} />
					<Stack.Screen
						name = "Lastbil"
						component = {LastbilScreen}
						options = {{headerShown: false}} />
					<Stack.Screen
						name = "Skrivbord"
						component = {SkrivbordScreen}
						options = {{headerShown: false}} />
				</Stack.Group>
				<Stack.Group screenOptions={{ presentation: 'modal' }}>
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;