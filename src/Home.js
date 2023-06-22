import React, { useState } from 'react';
import {View, TouchableOpacity, Text, TextInput} from 'react-native';
import axios from 'axios';

import { styles } from './Styles';

const HomeScreen = ({navigation}) => {
    const [ itemID, setItemID ] = useState('4');
    const [ selectedInput, setSelectedInput ] = useState(0);

	const getItemInfo = (id) => {
		axios(`https://inventeranew.budi.se/api/item?id=${id}`)
		.then((res) => {
			navigation.navigate('Lastbil', {"category":res.data.Item.Category, "header":res.data.Item.Header, "description":res.data.Item.Description});
		})
	}

	return (
		<View style={[styles.bgPrimary, styles.flexColumn, styles.justifyContentCenter]}>
			<TextInput
                style={[ styles.input, selectedInput === 'itemID' && styles.inputSelected ]}
                onFocus={() => setSelectedInput('itemID')}
                onBlur={() => setSelectedInput('')}
                keyboardType='numeric'
                placeholder='Item ID'
                value={itemID}
                onChangeText={text => setItemID(text)} />
			<TouchableOpacity style={styles.button} onPress={() => getItemInfo(itemID)}>
				<Text style={styles.buttonLabel}>Check</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Lastbil', {"category":4, "header":null, "description":null})}>
				<Text style={styles.buttonLabel}>Go</Text>
			</TouchableOpacity>
		</View>
	);
}

export default HomeScreen;