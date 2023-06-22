import * as React from 'react';
import { ScrollView, View, Text } from 'react-native';
 
const SkrivbordScreen = ({navigation, route}) => {
    return (
        <ScrollView>
            <Text>{route.params.itemInfo}</Text>
        </ScrollView>
    );
};

export default SkrivbordScreen;