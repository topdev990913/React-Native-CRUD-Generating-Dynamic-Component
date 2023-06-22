import React from 'react';
import { View, Text, Switch } from 'react-native';

import { styles, colors } from './Styles';

const Footer = ({ data, dataHandler, itemInfos, setItemInfos }) => { 

    const onChangeValue = (id, value) => {
        const objekt = {...data};
        let subIndex = 0, featIndex = 0;
        
        subIndex = data.Subcategories.findIndex((subcat) => subcat.Type === 'Footer');
        featIndex = data.Subcategories[subIndex].FeatsAndEquips.findIndex(item => item.ID === id);

        objekt.Subcategories[subIndex].FeatsAndEquips[featIndex].Value = value;

        dataHandler(objekt);        

        addItemInfos(id, value);
    }

    const addItemInfos = (id, value) => {
        const objekt = {...itemInfos};
        const index = objekt.itemInfos.findIndex(i => i.featandequipid === id);
        const subIndex = data.Subcategories.findIndex(i => i.Type === 'Footer');
        const featIndex = data.Subcategories[subIndex].FeatsAndEquips.findIndex(i => i.ID === id);

        if (index < 0) {
            objekt.itemInfos.push({
                "Header": data.Subcategories[subIndex].Header,
                "Data": data.Subcategories[subIndex].FeatsAndEquips[featIndex].Name,
                "Value": value,
                "subcategoryid": data.Subcategories[subIndex].FeatsAndEquips[featIndex].SubCatID,
                "featandequipid": id
            });
        } else {
            objekt.itemInfos[index].Value = value;
        }

        setItemInfos({...objekt});
    }

    const renderFooterItem = (item) => {
        return <View key={ item.ID }
                    style={[styles.flexRow, styles.justifyContentBetween, styles.marginHor6, styles.marginTop10,]}>
                    <Text>{ item.Name }</Text>
                    <Switch
                        trackColor={{ false: colors.gray, true: colors.primary }}
                        thumbColor={ item.Value === true ? colors.white : colors.whiteSmoke }
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => { onChangeValue(item.ID, value) }}
                        value={ typeof(item.Value) === 'string' ? false : item.Value }
                    />
                </View>
    }

    return (
        <View style={[styles.white]}>
            <Text style={[styles.marginHor6, styles.marginTop10, styles.textBold]}>
                { data.Subcategories
                    .filter(subcat => subcat.Type === 'Footer')[0]
                    .Header }
            </Text>
            <View style={styles.flexColumn}>
                { data.Subcategories
                    .filter(subcat => subcat.Type === 'Footer')[0]
                    .FeatsAndEquips
                    .sort((a, b) => a.Order - b.Order)
                    .map(renderFooterItem) }
            </View>
        </View>
    )
}

export default Footer;