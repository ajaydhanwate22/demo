import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput, Alert, ActivityIndicator, Animated, Easing, PermissionsAndroid, Platform,Text } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';


const ReceivedUdhariPayment = ({navigation}) => {

    const payments = [
        { id: 1,  title: 'Darshan DryFruite 6 KW', amount: 40000, date: '22/12/2024'},
        { id: 2,  title: 'Darshan DryFruite 6 KW', amount: 40000, date: '22/12/2024'},
        { id: 3,  title: 'Darshan DryFruite 6 KW', amount: 40000, date: '22/12/2024'}];

        const [StartVisible, setStartVisible] = useState(false);
        const [dateandtime, setdateandtime] = useState('');
        const [customer, setcustomer] = useState('');
        const [amount, setamount] = useState('');
        const [photo, setphoto] = useState('');
      
        const showStartModal = () => setStartVisible(true);
        const hideStartModal = () => setStartVisible(false);
      
        const handleSubmit = () => {
          if (dateandtime && customer && amount && photo) {  
            setdateandtime('');
            setcustomer('');
            setamount('');
            setphoto('');
            hideStartModal(); 
          } else {
            alert('Please fill in all the fields.');
          }
        };
        
  return (
    <SafeAreaView style={styles.PageContainer}>
        <ScrollView>
                        <View style={{flexDirection:"row", width:"100%", borderBottomWidth:0.5, borderColor:"#d3d3d3",padding:10,justifyContent:"space-between"}}>
                        <View style={{flexDirection:"row",gap:3}}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text><Ionicons name='chevron-back-sharp' size={40} color='black' /></Text>
                        </TouchableOpacity>
                            <View style={{justifyContent:"center"}}>
                            <Text style={{color: "#f01a05",textAlign:"center", justifyContent:"center", fontWeight:"bold", fontSize:19.1}}>Received Udhari Payment </Text>
                            </View>
                        </View>
                        <View style={{ justifyContent:"center", paddingRight:10}}>
                        <Text><Feather name='menu' size={30} color='black' /></Text>
                        </View>
                    </View>


                    <View style={{paddingHorizontal:30}}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',gap:15, marginTop:20,marginBottom:10}} >  
                          <TouchableOpacity style={{}} onPress={showStartModal}>
                          <Entypo name="plus" size={22} color="#f01a05" style={{backgroundColor:"#f2be25", borderRadius:25}} />
                          </TouchableOpacity>
                            <Text style={{ fontSize: 14,  color: "#000000", justifyContent:"center", textAlign:"center"}}>Add Received Udhari Payment</Text>
                     </View>

                        {/* comtent */}
                        {payments.map((payment) => (
                        <View  key={payment.id} style={{borderColor:"black", borderBottomWidth:1, marginTop:10,gap:2}}>
                        <Text style={{fontSize:14, color:"black", fontWeight:'bold'}}>{payment.title}</Text>
                        <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:10}}> 
                          <Text style={{fontSize:12, color:"#f01a05"}}>Received Amount: ₹ {payment.amount}</Text>
                          <Text style={{fontSize:12, color:"#f01a05"}}>Date : {payment.date}</Text>
                        </View>
                        </View>
                         ))}
                        </View>
        </ScrollView>

                 {/* modal */}
            <Modal visible={StartVisible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
                                    <Pressable style={{justifyContent:"space-between",flexDirection:'row', padding:20,}}>
                                    <View style={{justifyContent: "center",alignItems:"center" }}>
                                        <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "bold", textAlign:"center" }}>Add  Received Udhari Payment</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => hideStartModal()} style={{ justifyContent:"center",alignItems: "center" }}>
                                        <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                                    </TouchableOpacity>
                                    </Pressable>
                                        
                <View style={{ width: "90%", alignSelf: "center" }}>
                    <TextInput style={styles.Input}
                        placeholder='Date & Time' placeholderTextColor='#000' value={dateandtime} onChangeText={setdateandtime} />
                   <TextInput style={styles.Input} 
                        placeholder='Select Customer' placeholderTextColor='#000'  value={customer} onChangeText={setcustomer} />
                    <TextInput style={styles.Input} placeholder='Amount' placeholderTextColor='#000' value={amount} onChangeText={setamount}  />
                     <TextInput style={styles.Input} 
                         placeholder='Take Photo Or Upload Photo' placeholderTextColor='#000' value={photo} onChangeText={setphoto}  />
                     <View style={{ width: "100%", height: 45, alignSelf: "flex-end", marginTop: 100 }}>
                        <TouchableOpacity style={styles.btn} onPress={handleSubmit} >
                            <Text style={{ color: "#000", fontWeight: "700", fontSize: 14 }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
           </Modal>
 <Pressable style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", elevation: 3 }}>
    <TouchableOpacity style={{ width: "85%", height: 40, backgroundColor: "#f2be25", borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 15, fontWeight: "700", color: "#000" }}>Payment Report</Text>
  </TouchableOpacity>
</Pressable>




</SafeAreaView>
  )
}

export default ReceivedUdhariPayment

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
})