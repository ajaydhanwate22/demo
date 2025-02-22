import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput, Alert, ActivityIndicator, Animated, Easing, PermissionsAndroid, Platform,Text } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import HomeHeader from '../components/HomeHeader';


const Payment = ({navigation}) => {
  return (
  <SafeAreaView style={styles.PageContainer}>
    <Pressable style={{ width: "100%", height: "8%", marginBottom: 25 }}>
    <HomeHeader />
  </Pressable>
  <Pressable style={{width:"100%", backgroundColor:"#f2be25", marginTop:-14}}>
  <Text style={{padding:8, fontWeight:"bold",fontSize:19.1, textAlign:"center", justifyContent:"center", color:"black"}}>Payment</Text>
  </Pressable>
  <View style={{marginTop:25, paddingHorizontal:20, gap:15}}>
    <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
    <TouchableOpacity style={{ width: "48%" }} onPress={() => navigation.navigate('ReceivedUdhariPayment')} >
    <LinearGradient  colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={{ borderRadius: 10, padding: 15, gap: 10 }} >
           <View style={{gap:10}}>
              <Text style={{ textAlign: "center", fontSize: 18, fontWeight: 'bold',color: "#000" }}>₹ 2,50000</Text>
              <Text style={{ textAlign: "center", fontSize: 16,color: "#000" }}>Received Udhari Payment</Text>
            </View>
      </LinearGradient>
    </TouchableOpacity>
    <TouchableOpacity style={{ width: "48%" }}  onPress={() => navigation.navigate('PurchasePayPayment')} >
    <LinearGradient  colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={{ borderRadius: 10, padding: 15, gap: 15 }} >
           <View style={{gap: 10}}>
              <Text style={{ textAlign: "center", fontSize: 18, fontWeight: 'bold',color: "#000" }}>₹ 10,000</Text>
              <Text style={{ textAlign: "center", fontSize: 16,color: "#000" }}>Purchase Pay Payment</Text>
            </View>
      </LinearGradient>
    </TouchableOpacity>
    </View>


  <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
  <TouchableOpacity style={{ width: "48%" }}>
    <View style={{ backgroundColor: 'rgb(230, 230, 230)',   borderRadius: 10, padding: 15,  gap: 10 }} >
      <View style={{ gap: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: 'bold',color: "#000" }}>₹ 2,90000</Text>
        <Text style={{ textAlign: "center", fontSize: 16 ,color: "#000"}}>Remaining Collection</Text>
      </View>
    </View>
  </TouchableOpacity>
  
  <TouchableOpacity style={{ width: "48%" }}>
    <View style={{ backgroundColor: 'rgb(230, 230, 230)',borderRadius: 10, padding: 15,  gap: 15 }}>
      <View style={{ gap: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: 'bold',color: "#000" }}>₹ 60000</Text>
        <Text style={{ textAlign: "center", fontSize: 16,color: "#000" }}>Remaining Pay Payment</Text>
      </View>
    </View>
  </TouchableOpacity>
</View>
</View>
</SafeAreaView>
  )
}

export default Payment

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
})