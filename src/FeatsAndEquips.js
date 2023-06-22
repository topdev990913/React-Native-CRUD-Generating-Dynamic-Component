import React, { useState } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import Icon from 'react-native-vector-icons/AntDesign';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';

import { styles } from './Styles';

const FeatsAndEquips = ({ category, data, itemInfos, setItemInfos, selectedInput, setSelectedInput }) => { 
  
    const [modalVisible, setModalVisible] = useState(false);    
    const [header, setHeader] = useState('');
    const [currentItems, setCurrentItems] = useState([]);
    const [selectedType, setSelectedType] = useState('Equipment');

    const onChangeValue = (id, value) => {
        const objekt = {...itemInfos};        
        const index = objekt.itemInfos.findIndex((item) => item.featandequipid === id);

        objekt.itemInfos[index].Value = value;
        setItemInfos({...objekt});
    }

    const isInItemInfos = (item) => {
        const objekt = {...itemInfos};
        return objekt.itemInfos.filter(i => i.featandequipid === item.ID).length > 0 ? true : false;
    }

    const renderFeatsAndEquips = (item) => {
        let selectedCount = item.FeatsAndEquips.filter(i => isInItemInfos(i)).length;
        return (item.FeatsAndEquips.length) ? <TouchableOpacity
                    key={item.ID} 
                    style={[ selectedCount ? styles.button : styles.buttonNormal ]} 
                    onPress={() => { 
                        setModalVisible(true); 
                        setHeader(item.Header); 
                        setCurrentItems(item.FeatsAndEquips);
                        setSelectedType(item.Type);
                    }} >                        
                    <Text style={ selectedCount ? styles.buttonLabel : styles.buttonLabelNormal}>
                        { selectedCount ? item.Header + " (" + selectedCount + ")" : item.Header }
                    </Text>
                </TouchableOpacity> : <View key={item.ID} /> 
    }

    const renderChip = (item) => {
        const isSelected = isInItemInfos(item);
        return (
            <TouchableOpacity style={isSelected ? styles.chipSelected : styles.chip} onPress={() => handleChipPress(item)} key={item.ID}>
                <Text style={isSelected ? styles.buttonLabel : styles.buttonLabelNormal}>
                   {isSelected ? <Icon name="check" /> : <Icon name="plus" />}
                   &nbsp;{item.Name}
                </Text>
            </TouchableOpacity>
        );
    };

    const handleChipPress = (item) => {
        const objekt = {...itemInfos};
        const index = objekt.itemInfos.findIndex(i => i.featandequipid === item.ID);
        if (index < 0) {
            const subIndex = data.Subcategories.findIndex((subcat) => subcat.ID === item.SubCatID);
            objekt.itemInfos.push({
                "Header": data.Subcategories[subIndex].Header,
                "Data": item.Name,
                "Value": item.Value,
                "subcategoryid": item.SubCatID,
                "featandequipid": item.ID
            });
            setItemInfos({...objekt});
        } else {
            setItemInfos({...objekt, "itemInfos":objekt.itemInfos.filter(i => i.featandequipid !== item.ID)});
        }
    };

    const removeChip = (item) => {
        const objekt = {...itemInfos};
        setItemInfos({...objekt, "itemInfos":objekt.itemInfos.filter(i => i !== item)});
    }

    const renderColumns = (item) => {
        const original = currentItems.filter(i => i.ID === item.featandequipid)[0];
        if (selectedType === 'Equipment') {
            return (
                <View key={item.featandequipid} style={[styles.flexRow, styles.flexGrow, styles.width100]}>
                    <TextInput
                        style={[ styles.input, styles.flexGrow, selectedInput === item.featandequipid && styles.inputSelected ]}
                        onFocus={() => setSelectedInput(item ? item.featandequipid : '')}
                        onBlur={() => setSelectedInput('')}
                        placeholder={item.Data}
                        value={item.Value}
                        onChangeText={(value) => {onChangeValue(item.featandequipid, value)}} />
                    <TouchableOpacity style={styles.button} onPress={() => removeChip(item)}>
                        <Text style={[styles.buttonLabel, styles.paddingTop8]}><IconFeather name="trash-2" /></Text>
                    </TouchableOpacity>
                </View>
            )
        } 

        return (
            <View key={item.featandequipid} style={[styles.flexRow, styles.flexGrow, styles.width100]}>
                <Text style={[ styles.input, styles.width40 ]}>
                    { item.Data }
                </Text>
                {original.Value && original.Value.includes(';') &&
                    <SelectDropdown
                        buttonStyle={[ styles.picker, styles.flexGrow ]}
                        buttonTextStyle={{ fontSize: 14 }}
                        defaultButtonText={item.Value ? item.Value : "Välj " + item.Data}
                        renderDropdownIcon={isOpened => {
                            return <IconAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={16} />;
                        }}
                        data={original.Value.split(";")}
                        onSelect={(selectedItem, index) => { onChangeValue(item.featandequipid, selectedItem) }} />
                }        
                {!original.Value && 
                    <TextInput
                        style={[ styles.input, styles.flexGrow, selectedInput === item.ID && styles.inputSelected ]}
                        onFocus={() => setSelectedInput(item ? item.ID : '')}
                        onBlur={() => setSelectedInput('')}
                        placeholder={item.Data}
                        value={item.Value}
                        onChangeText={(value) => {onChangeValue(item.featandequipid, value)}} />
                }        
                <TouchableOpacity style={[styles.button]} onPress={() => removeChip(item)}>
                    <Text style={[styles.buttonLabel, styles.paddingTop8]}><IconFeather name="trash-2" /></Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={[styles.white]}>
            <Text style={[styles.marginHor6, styles.marginTop10, styles.textBold]}>Egenskaper*</Text>      
            <ScrollView style={[styles.marginVer5]} horizontal={true}>
                { data.Subcategories
                    .filter(subcat => subcat.Type === 'Equipment' || subcat.Type === 'Feature')
                    .sort((a, b) => a.order - b.order)
                    .map((subcat) => renderFeatsAndEquips(subcat))
                }    
            </ScrollView> 
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text>{ header } ({ category })</Text>    
                        <TouchableOpacity onPress={() => setModalVisible(false)}><Icon name="close" /></TouchableOpacity>
                    </View>
                    <ScrollView style={styles.modalBody}>
                        <View style={[styles.modalContent, styles.flexRow, styles.flexWrap]}>
                            {currentItems.map(renderChip)} 
                            {currentItems.length > 0 && itemInfos.itemInfos.filter(item => item.subcategoryid === currentItems[0].SubCatID).map(renderColumns)}
                        </View>
                    </ScrollView>
                    <View style={styles.modalFooter}> 
                        <TouchableOpacity style={[styles.button, styles.width100]} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonLabel}><Icon name="plus" /> Skapa egen</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default FeatsAndEquips;