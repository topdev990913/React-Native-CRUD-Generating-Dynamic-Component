import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

import { styles } from './Styles';

const BaseInfo = ({ data, dataHandler, itemInfos, setItemInfos, selectedInput, setSelectedInput }) => {

    const [textValue, setTextValue] = useState('');

    const onChangeValue = (id, value) => {
        const objekt = {...itemInfos};
        let index = -1, subIndex = 0, featIndex = 0, isHeaderValue = false;              
        
        index = objekt.itemInfos.findIndex(item => item.featandequipid === id);
        subIndex = data.Subcategories.findIndex((subcat) => subcat.Type === 'Basinfo');
        featIndex = data.Subcategories[subIndex].FeatsAndEquips.findIndex(item => item.ID === id);
        isHeaderValue = data.Subcategories[subIndex].FeatsAndEquips[featIndex].IsHeaderValue;

        const category = {...data};

        if (index < 0) {
            objekt.itemInfos.push({
                "Header": data.Subcategories[subIndex].Header,
                "Data": data.Subcategories[subIndex].FeatsAndEquips[featIndex].Name,
                "Value": value,
                "subcategoryid": data.Subcategories[subIndex].FeatsAndEquips[featIndex].SubCatID,
                "featandequipid": id
            });

        } else {

            if (isHeaderValue) {
                if (data.Subcategories[subIndex].FeatsAndEquips[featIndex].IsNumber) {
                    category.CategoryName = category.CategoryName.replace(` ${data.Subcategories[subIndex].FeatsAndEquips[featIndex].Name}:`, '');
                }

                category.CategoryName = category.CategoryName.replace(` ${objekt.itemInfos[index].Value}`, '');             
            }
            objekt.itemInfos[index].Value = value;
        }
        
        if (isHeaderValue) {
            category.CategoryName = category.CategoryName.includes(value) ? 
                category.CategoryName : 
                category.CategoryName + 
                (data.Subcategories[subIndex].FeatsAndEquips[featIndex].IsNumber ? ` ${data.Subcategories[subIndex].FeatsAndEquips[featIndex].Name}: ` : " ") + 
                value;   
        }

        dataHandler({...category});
        setItemInfos({...objekt});
    }

    const renderBaseInfoItem = (item) => {
        return item.Value?.includes(';') ?
                <SelectDropdown
                    key={item.ID}
                    buttonStyle={[ styles.picker, item.Fullwidth ? styles.width98 : styles.width50 ]}
                    buttonTextStyle={{ fontSize: 14 }}
                    defaultButtonText={"Välj " + item.Name}
                    renderDropdownIcon={isOpened => {
                        return <IconAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={16} />;
                    }}
                    data={item.Value.split(";")}
                    onSelect={(selectedItem, index) => { onChangeValue(item.ID, selectedItem) }} />
                : <TextInput
                    key={item.ID}
                    style={[ styles.input, item.Fullwidth ? styles.width98 : styles.width50, selectedInput === item.ID && styles.inputSelected ]}
                    keyboardType={item.IsNumber ? "numeric" : "default"}
                    onFocus={() => setSelectedInput(item ? item.ID : '')}
                    onBlur={() => setSelectedInput('')}
                    placeholder={item.Name}
                    value={item.Value}
                    onEndEditing={() => {onChangeValue(item.ID, textValue)}}
                    onChangeText={(value) => setTextValue(value)} />
    }

    return (
        <View style={[styles.flexRow, styles.flexWrap, styles.white]}>
            { data.Subcategories && data.Subcategories
                .filter(subcat => subcat.Type === 'Basinfo')[0]
                .FeatsAndEquips
                .sort((a, b) => a.Order - b.Order)
                .map(renderBaseInfoItem) }
        </View>
    );
}

export default BaseInfo;