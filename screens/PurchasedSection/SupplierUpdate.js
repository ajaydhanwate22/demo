import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';


const SupplierUpdate = () => {

    const navigation = useNavigation();

          const [StartVisible, setStartVisible] = useState(false);
          const [dateandtime, setdateandtime] = useState('');
          const [addsupplier, setaddsupplier] = useState('');
          const [number, setnumber] = useState('');
          const [address, setaddress] = useState('');
          const [gst, setgst] = useState('');

          useEffect(() => {
            const currentDate = new Date();
          
            // Get the day, month, and year
            const day = currentDate.getDate();
            const month = currentDate.toLocaleString('default', { month: 'long' }); // Full month name (e.g., January)
            const year = currentDate.getFullYear();
          
            // Get the time in hours and minutes
            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;  // Convert to 12-hour format
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;  // Pad minutes with leading zero if needed
          
            // Construct the formatted date string
            const formattedDate = `${day} ${month} ${year}, ${formattedHours}:${formattedMinutes} ${ampm}`;
            
            // Set the formatted date and time to the state
            setdateandtime(formattedDate);
          }, []);
          
          const showStartModal = () => setStartVisible(true);
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
                    
                                <View visible={StartVisible} style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
                                    <Pressable style={{justifyContent:"space-between",flexDirection:'row', padding:20,}}>
                                    <View style={{justifyContent: "center",alignItems:"center" }}>
                                        <Text style={{ fontSize: 21, color: "#f01a05", fontWeight: "bold", textAlign:"center" }}>Update Profile</Text>
                                    </View>
                                    <TouchableOpacity  onPress={() => navigation.goBack()} style={{ justifyContent:"center",alignItems: "center" }}>
                                        <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                                    </TouchableOpacity>
                                    </Pressable>
                    
                                        <View style={{ width: "90%", alignSelf: "center" }}>
                                            <TextInput style={[styles.Input,  { color: '#000' }]}
                                                placeholder='Update Date & Time' placeholderTextColor='#000' value={dateandtime}  editable={false}  />
                                           <TextInput style={styles.Input} 
                                                placeholder='Update Supplier' placeholderTextColor='#000'  value={addsupplier} onChangeText={setaddsupplier} />
                                            <TextInput style={styles.Input} placeholder='Update Mobile Number' placeholderTextColor='#000' value={number} onChangeText={setnumber}  />
                                             <TextInput style={styles.Input} 
                                                 placeholder='Update Supplier Address' placeholderTextColor='#000' value={address} onChangeText={setaddress}  />
                                              <TextInput style={styles.Input} 
                                                 placeholder='Update GST (Optional)' placeholderTextColor='#000' value={gst} onChangeText={setgst}  />
                                             <View style={{ width: "100%", height: 45, alignSelf: "flex-end", marginTop: 100 }}>
                                                <TouchableOpacity style={styles.btn} onPress={handleSubmit} >
                                                    <Text style={{ color: "#000", fontWeight: "700", fontSize: 14 }}>Update</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                 </View>
  )
}

export default SupplierUpdate
const styles = StyleSheet.create({
    PageContainer: { backgroundColor: "#fff", height: "100%" },
    btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
    Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
})