import { StyleSheet, View, Pressable, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

const Activescreen = () => {
    const navigation = useNavigation();
    const route = useRoute(); 

    const getButtonStyle = (screenName) => {
        return {
            backgroundColor: route.name === screenName ? "#f01a05" : "#f2be25", 
            borderRadius: 50,
        };
    };

    return (
        <>
            <Pressable style={{ flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
                <TouchableOpacity style={getButtonStyle('CustomerPage')} onPress={() => navigation.navigate('CustomerPage')}>
                    <Text style={{ alignSelf: "center", padding: 10, paddingHorizontal: 30, color: "#000", fontWeight: "600" }}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={getButtonStyle('UsedMaterialHome')} onPress={() => navigation.navigate('UsedMaterialHome')}>
                    <Text style={{ alignSelf: "center", padding: 10, paddingHorizontal: 30, color: "#000", fontWeight: "600" }}>Used Material</Text>
                </TouchableOpacity>
                <TouchableOpacity style={getButtonStyle('QuotationHome')} onPress={() => navigation.navigate('QuotationHome')}>
                    <Text style={{ alignSelf: "center", padding: 10, paddingHorizontal: 10, color: "#000", fontWeight: "600" }}>Quotation</Text>
                </TouchableOpacity>
            </Pressable>

            <Pressable style={{ flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
                <TouchableOpacity style={getButtonStyle('BillHome')} onPress={() => navigation.navigate('BillHome')}>
                    <Text style={{ alignSelf: "center", padding: 10, paddingHorizontal: 30, color: "#000", fontWeight: "600" }}>Bill</Text>
                </TouchableOpacity>
                <TouchableOpacity style={getButtonStyle('LedgerHome')} onPress={() => navigation.navigate('LedgerHome')}>
                    <Text style={{ alignSelf: "center", padding: 10, paddingHorizontal: 54, color: "#000", fontWeight: "600" }}>Ledger</Text>
                </TouchableOpacity>
                <TouchableOpacity style={getButtonStyle('VisitHome')} onPress={() => navigation.navigate('VisitHome')}>
                    <Text style={{ alignSelf: "center", padding: 10, paddingHorizontal: 30, color: "#000", fontWeight: "600" }}>Visit</Text>
                </TouchableOpacity>
            </Pressable>
        </>
    )
}

export default Activescreen;

const styles = StyleSheet.create({
  
});
