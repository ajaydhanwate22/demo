import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput, Alert, ActivityIndicator, Animated, Easing, PermissionsAndroid, Platform,Text } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';


const UserVisit = ({navigation}) => {

    const payments = [
        { id: 1,  title: 'Akshay', working: 'Clean Panel', date: '22/12/2024'},
        { id: 2,  title: 'Akshay', working: 'Clean Panel', date: '22/12/2024'},
        { id: 3,  title: 'Akshay', working: 'Clean Panel', date: '22/12/2024'}];
        
  return (
    <SafeAreaView style={styles.PageContainer}>
        <ScrollView>
                        <View style={{flexDirection:"row", width:"100%", borderBottomWidth:0.5, borderColor:"#d3d3d3",padding:10,justifyContent:"space-between"}}>
                        <View style={{flexDirection:"row",gap:3}}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text><Ionicons name='chevron-back-sharp' size={40} color='black' /></Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{justifyContent:"center"}}>
                            <Text style={{color: "#f01a05",textAlign:"center", justifyContent:"center", fontWeight:"bold", fontSize:19.1}}>Visited Data</Text>
                            </View>
                        <View style={{ justifyContent:"center", paddingRight:10}}>
                        <Text><Feather name='menu' size={30} color='black' /></Text>
                        </View>
                    </View>


                    <View style={{paddingHorizontal:30}}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',gap:15, marginTop:20,marginBottom:10}} >  
                          <TouchableOpacity style={{}}>
                          <Entypo name="plus" size={22} color="#f01a05" style={{backgroundColor:"#f2be25", borderRadius:25}} />
                          </TouchableOpacity>
                            <Text style={{ fontSize: 16,  color: "#000000", justifyContent:"center", textAlign:"center", fontWeight:'bold'}}>View Report</Text>
                     </View>

                        {/* comtent */}
                        {payments.map((payment) => (
                        <TouchableOpacity  key={payment.id} style={{borderColor:"black", borderBottomWidth:1, marginTop:10,gap:2}} onPress={() => navigation.navigate('Visiteddata')}>
                        <Text style={{fontSize:14, color:"black",}}>{payment.title}</Text>
                        <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:10}}> 
                          <Text style={{fontSize:12, color:"#f01a05"}}>Working: {payment.working}</Text>
                          <Text style={{fontSize:12, color:"#f01a05"}}>Date : {payment.date}</Text>
                        </View>
                        </TouchableOpacity>
                         ))}
                        </View>
        </ScrollView>
</SafeAreaView>
  )
}

export default UserVisit

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
})