import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput } from 'react-native'
import React, { useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Searchbar, Text, Button } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Customerpageheader from './reusablescreens/Customerpageheader';
import Activescreen from './reusablescreens/Activescreen';


const CustomerPage = ( { navigation } ) => {



    return (
        <SafeAreaView style={styles.PageContainer}>
                {/* main header */}

            <Customerpageheader/>

            <Activescreen/>
  
                <Pressable style={{ width: "90%", alignSelf: "center", }}>
                    <Text>All Section</Text>
                </Pressable>
 
        </SafeAreaView>
    )
}

export default CustomerPage

const styles = StyleSheet.create({
    PageContainer: { backgroundColor: "#fff", height: "100%" },
    btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
    Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
})

