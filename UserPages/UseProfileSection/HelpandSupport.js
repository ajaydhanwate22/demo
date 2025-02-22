import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList,Linking   } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


const HelpandSupport = () => {

    const navigation = useNavigation();

    const openWhatsApp = () => {
        const phoneNumber = '9890828999'; 
        const url = `whatsapp://send?phone=91${phoneNumber}`; 
        Linking.openURL(url).catch((err) => console.error("Error opening WhatsApp: ", err));
      };
    
      const makeCall = () => {
        const phoneNumber = '9890828999'; 
        const url = `tel:+91${phoneNumber}`; 
        Linking.openURL(url).catch((err) => console.error("Error making call: ", err));
      };
    

  
  return (
    <SafeAreaView style={styles.PageContainer}>
        <ScrollView>
            <View style={{paddingHorizontal:20, paddingTop:30,paddingBottom:10,flexDirection:'row', justifyContent:'space-between', backgroundColor:"#f2be25"}}> 
                <View style={{flexDirection:'row',gap:10}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}  style={{justifyContent:"center", alignItems:"center", alignSelf:'center'}}>
                    <AntDesign name="arrowleft" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={{fontSize:19, fontWeight:'bold',color:'black', alignSelf:'center'}}>Help & Support</Text>
                </View>
                <View>
                    <TouchableOpacity>
                    <FontAwesome6 name="chevron-up" size={25} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        <View style={{marginTop:10}}>
            <TouchableOpacity style={{padding:20, borderBottomWidth:1,  borderColor: "#000",paddingVertical:15, paddingHorizontal:30}} onPress={() => navigation.navigate('FAQs')} >
                <View><Text style={{fontSize:14, color:'black'}}>FAQs</Text></View>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:20, borderBottomWidth:1,  borderColor: "#000",paddingVertical:15,paddingHorizontal:30}} onPress={openWhatsApp}>
                <View><Text style={{fontSize:14, color:'black'}}>Help on Whatsapp</Text></View>
            </TouchableOpacity>
            
            <TouchableOpacity style={{padding:20, borderBottomWidth:1,  borderColor: "#000",paddingVertical:15,paddingHorizontal:30}} onPress={makeCall}>
                <View><Text style={{fontSize:14, color:'black'}}>Call US</Text></View>
            </TouchableOpacity>


            <TouchableOpacity style={{padding:20,paddingVertical:15,paddingHorizontal:30}}>
                <View><Text style={{fontSize:14, color:'black'}}>Message US</Text></View>
            </TouchableOpacity>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default HelpandSupport
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
})