import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList  } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


const AdvancedForm = () => {

    const navigation = useNavigation();

      const [date , setDate] = useState('');
      const [amount , setamount] = useState('');
      const [reson, setreson] = useState('');


        // This useEffect sets the date and time when the component loads
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

    // Set the formatted date to the state
    setDate(formattedDate);
  }, []);

      
        const handleSubmit = () => {
          if (date && amount && reson) {  
            setDate('');
            setamount('');
            setreson('');
          } else {
            alert('Please fill in all the fields.');
          }
        };
  
  return (
    <SafeAreaView style={styles.PageContainer}>
       <ScrollView>

                    <Pressable style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
                        <Pressable style={{justifyContent:"space-between",flexDirection:'row', padding:20,}}>
                        <TouchableOpacity  onPress={() => navigation.goBack()}  style={{ alignItems: "center" }}>
                                      <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                            </TouchableOpacity>
                        <Image source={{ uri: 'https://realrate.store/AkshayUrjaSolar/Images/akshyurjalogo.jpeg' }} // Adjust the path to your logo file
                                style={{ width: 130,  height:50,justifyContent:"center" }}
                                resizeMode="contain"  // Adjust width, height, and margin as needed
                              />
                          </Pressable>

                        <View style={{padding:20}}>
                            <Text style={{ fontSize: 19, color: "#f01a05", fontWeight: "bold",  }}>Request For Advanced</Text>
                        </View>

                        <View style={{ width: "90%", alignSelf: "center" }}>
                          <TextInput style={[styles.Input,  { color: '#000' }]}
                            placeholder='Date & Time' placeholderTextColor='#000'  value={date} 
                            editable={false} />
                              <TextInput style={styles.Input}
                            placeholder='Amount' placeholderTextColor='#000'  value={amount}
                            onChangeText={setamount} />
                            <TextInput style={styles.Input}
                            placeholder='Reason' placeholderTextColor='#000' value={reson}
                            onChangeText={setreson}  />
                          <View style={{ width: "100%", height: 45, alignSelf: "flex-end", marginTop: 100 }}>
                            <TouchableOpacity style={styles.btn} onPress={handleSubmit} >
                              <Text style={{ color: "#000", fontWeight: "700", fontSize: 14 }}>Submit</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                     </Pressable>
                </ScrollView>
            </SafeAreaView>
  )
}

export default AdvancedForm
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" }
})