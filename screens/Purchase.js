import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput, Alert, ActivityIndicator, Animated, Easing, PermissionsAndroid, Platform,Text } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeHeader from '../components/HomeHeader';

const Purchase = ({navigation}) => {
  

      const payments = [
          { id: 1,  title: 'Kohinnoor Enterprises', location: 'sangamner,sangamner', date: '22/12/2024'},
          { id: 2,  title: 'Kohinnoor Enterprises', location: 'sangamner,sangamner', date: '22/12/2024'},
          { id: 3,  title: 'Kohinnoor Enterprises', location: 'sangamner,sangamner', date: '22/12/2024'},
          { id: 4,  title: 'Kohinnoor Enterprises', location: 'sangamner,sangamner', date: '22/12/2024'},
          { id: 5,  title: 'Kohinnoor Enterprises', location: 'sangamner,sangamner', date: '22/12/2024'},
        ]
          
          const [StartVisible, setStartVisible] = useState(false);
          const [dateandtime, setdateandtime] = useState('');
          const [addsupplier, setaddsupplier] = useState('');
          const [number, setnumber] = useState('');
          const [address, setaddress] = useState('');
          const [gst, setgst] = useState('');
        
          const showStartModal = () => {
            // Get the current date and time
            const currentDate = new Date();
            const day = currentDate.getDate();
            const month = currentDate.toLocaleString('default', { month: 'long' }); // Full month name (e.g., January)
            const year = currentDate.getFullYear();
            
            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;  // Convert to 12-hour format
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;  // Pad minutes with leading zero if needed
        
            const formattedDate = `${day} ${month} ${year}, ${formattedHours}:${formattedMinutes} ${ampm}`;
            setdateandtime(formattedDate);
            setStartVisible(true);
          };
          const hideStartModal = () => setStartVisible(false);
        
          const handleSubmit = () => {
            if (dateandtime && addsupplier && number && address && gst) {  
              setdateandtime('');
              setaddsupplier('');
              setnumber('');
              setaddress('');
              setgst('');
              hideStartModal(); 
            } else {
              alert('Please fill in all the fields.');
            }
          };

  return (
  <SafeAreaView style={styles.PageContainer}>
    <Pressable style={{ width: "100%", height: "8%", marginBottom: 25 }}>
    <HomeHeader />
  </Pressable>
  <ScrollView>
  <View style={{ paddingHorizontal:20, gap:15}}>
    <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
    <TouchableOpacity style={{ width: "48%" }} onPress={() => navigation.navigate('')} >
    <LinearGradient  colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={{ borderRadius: 10, padding: 15, gap: 10 }} >
           <View style={{gap:10}}>
              <Text style={{ textAlign: "center", fontSize: 18,color: "#000" }}>25</Text>
              <Text style={{ textAlign: "center", fontSize: 16,color: "#000",fontWeight: 'bold' }}>Supplier</Text>
            </View>
      </LinearGradient>
    </TouchableOpacity>
    <TouchableOpacity style={{ width: "48%" }}  onPress={() => navigation.navigate('')} >
    <LinearGradient  colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={{ borderRadius: 10, padding: 15, gap: 15 }} >
           <View style={{gap: 10}}>
              <Text style={{ textAlign: "center", fontSize: 18,color: "#000" }}>₹ 1000</Text>
              <Text style={{ textAlign: "center", fontSize: 16,color: "#000",fontWeight: 'bold' }}>Due Payment</Text>
            </View>
      </LinearGradient>
    </TouchableOpacity>
    </View>
</View>
 
 {/* page section */}

                    <View style={{paddingHorizontal:30}}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',gap:15, marginTop:30,marginBottom:5}} >  
                          <TouchableOpacity style={{justifyContent:"center"}} onPress={showStartModal}>
                          <Entypo name="plus" size={22} color="#f01a05" style={{backgroundColor:"#f2be25", borderRadius:25}} />
                          </TouchableOpacity>
                          <View style={{justifyContent:"center"}}>
                            <Text style={{ fontSize: 14,  color: "#000000",textAlign:"center"}}>Add Supplier</Text>
                          </View>
                     </View>

                        {/* comtent */}
                        {payments.map((payment) => (
                        <TouchableOpacity  key={payment.id} style={{borderColor:"black", borderBottomWidth:1, marginTop:10,gap:2, marginBottom:10}}  onPress={() => navigation.navigate('Purchasedbill')}>
                        <Text style={{fontSize:14, color:"black", fontWeight:'bold'}}>{payment.title}</Text>
                        <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:10,paddingRight:10}}> 
                          <Text style={{fontSize:12, color:"#f01a05"}}>{payment.location}</Text>
                          <Text style={{fontSize:12, color:"#f01a05"}}>Date : {payment.date}</Text>
                        </View>
                        </TouchableOpacity>
                         ))}
                        </View>
                        </ScrollView>




                                         {/* modal */}
                                    <Modal visible={StartVisible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
                                    <Pressable style={{justifyContent:"space-between",flexDirection:'row', padding:20,}}>
                                    <View style={{justifyContent: "center",alignItems:"center" }}>
                                        <Text style={{ fontSize: 21, color: "#f01a05", fontWeight: "bold", textAlign:"center" }}>Add  Supplier</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => hideStartModal()} style={{ justifyContent:"center",alignItems: "center" }}>
                                        <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                                    </TouchableOpacity>
                                    </Pressable>
                                                                
                                        <View style={{ width: "90%", alignSelf: "center" }}>
                                            <TextInput style={[styles.Input,  { color: '#000' }]}
                                                placeholder='Date & Time' placeholderTextColor='#000' value={dateandtime} editable={false} />
                                           <TextInput style={styles.Input} 
                                                placeholder='Add Supplier' placeholderTextColor='#000'  value={addsupplier} onChangeText={setaddsupplier} />
                                            <TextInput style={styles.Input} placeholder='Mobile Number' placeholderTextColor='#000' value={number} onChangeText={setnumber}  />
                                             <TextInput style={styles.Input} 
                                                 placeholder='Supplier Address' placeholderTextColor='#000' value={address} onChangeText={setaddress}  />
                                              <TextInput style={styles.Input} 
                                                 placeholder='GST (Optional)' placeholderTextColor='#000' value={gst} onChangeText={setgst}  />
                                             <View style={{ width: "100%", height: 45, alignSelf: "flex-end", marginTop: 100 }}>
                                                <TouchableOpacity style={styles.btn} onPress={handleSubmit} >
                                                    <Text style={{ color: "#000", fontWeight: "700", fontSize: 14 }}>Submit</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                   </Modal>
</SafeAreaView>
  )
}

export default Purchase

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
})