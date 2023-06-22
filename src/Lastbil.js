import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, View, Text, TextInput } from 'react-native';
import axios from 'axios';

import { styles, colors } from './Styles';
import BaseInfo from './BaseInfo';
import FeatsAndEquips from './FeatsAndEquips';
import Footer from './Footer';
 
const LastbilScreen = ({navigation, route}) => {
    const [ data, setData ] = useState(null);
    const [ itemInfos, setItemInfos ] = useState({"itemInfos":[]});
    const [ selectedInput, setSelectedInput ] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            const tempID = route.params.category ? route.params.category : 1
            const result = await axios(`https://inventeranew.budi.se/api/gettemplate/${tempID}`);

            const objekt = {...result.data};
            objekt.CategoryName = route.params.header;
            objekt.CategoryDescription = route.params.description;

            const subIndex = objekt.Subcategories.findIndex(i => i.Type === 'Basinfo');
            const baseInfo = (subIndex < 0) ? null : objekt.Subcategories[subIndex];
            const item = {...itemInfos};

            if (baseInfo) {
                baseInfo.FeatsAndEquips.map((i, t, arr) => {
                    if (i.IsHeaderValue) {
                        // let value = (i.Value) ? (i.Value.includes(';')) ? i.split(';') : i.Value : null;
                        if (i.IsNumber) {

                            const categoryName = objekt.CategoryName;
                            const dataValue = categoryName.substring(categoryName.indexOf(i.Name) + i.Name.length + 2).split(' ')[0];
                            const value = dataValue ? dataValue : undefined;
                            console.log(i.Name, categoryName);
                            if (item.itemInfos.findIndex(el => el.featandequipid === i.ID) < 0) {
                                item.itemInfos.push({
                                    "Header": arr.Header,
                                    "Data": i.Name,
                                    "Value": value,
                                    "subcategoryid": i.SubCatID,
                                    "featandequipid": i.ID
                                });
                            }
                            i.Value = value;
                        }                        
                    }
                    return i;
                })
            }

            // console.log(item.itemInfos);
            // console.log(baseInfo);

            setItemInfos({...item});
            setData({...objekt});            
        };
        fetchData();
    }, []);    

    return (
        <ScrollView style={styles.bgPrimary}>            
            <TextInput
                style={[ styles.input, data && selectedInput === data.CategoryName && styles.inputSelected ]}
                onFocus={() => setSelectedInput(data ? data.CategoryName : '')}
                onBlur={() => setSelectedInput('')}
                placeholder={data && data.CategoryName}
                value={data && data.CategoryName}
                onChangeText={text => setData({...data, 'CategoryName':text})} />
            <TextInput
                multiline
                numberOfLines={5}
                style={[ styles.input, selectedInput === "Beskrivning*" && styles.inputSelected ]}
                onFocus={() => setSelectedInput("Beskrivning*")}
                onBlur={() => setSelectedInput('')}
                placeholder="Beskrivning*"
                value={data && data.CategoryDescription}
                onChangeText={text => setData({...data, 'CategoryDescription':text})} />
            { data &&
                <BaseInfo 
                    data={data}
                    dataHandler={setData}
                    itemInfos={itemInfos}
                    setItemInfos={setItemInfos}
                    selectedInput={selectedInput}
                    setSelectedInput={setSelectedInput} />
            }
            { data && data.Subcategories && data.Subcategories.filter(subcat => subcat.Type === 'Equipment' || subcat.Type === 'Feature').length > 0 && 
                <FeatsAndEquips 
                    category={data.CategoryName}
                    itemInfos={itemInfos}
                    setItemInfos={setItemInfos}
                    selectedInput={selectedInput}
                    setSelectedInput={setSelectedInput}
                    data={data}
                    dataHandler={setData} />
            }
            { data && data.Subcategories && data.Subcategories.filter(subcat => subcat.Type === 'Footer').length > 0 &&
                <Footer
                    data={data}
                    dataHandler={setData}
                    itemInfos={itemInfos}
                    setItemInfos={setItemInfos} />
            } 
            <View
                style={[styles.flexRow, styles.marginTop30]}>
                <TouchableOpacity 
                    style={[styles.button, styles.width50, styles.darken]} 
                    onPress={() => {}}>
                    <Text style={styles.buttonLabel}>FÖRHANDSVISNING</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.width50]} 
                    onPress={() => navigation.navigate('Skrivbord', {"itemInfo":JSON.stringify(itemInfos)})}>
                    <Text style={styles.buttonLabel}>PULICERA</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default LastbilScreen;