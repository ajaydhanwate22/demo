import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList  } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


const ProfileUpdate = () => {

    const navigation = useNavigation();

      const [updatename , setupdatename] = useState('');
      const [updateEmail , setupdateEmail] = useState('');
      const [UpdateNo, setUpdateNo] = useState('');
      const [Updatelocation , setUpdatelocation] = useState ('');
      const [password, setpassword]= useState ('');
      
        const handleUpdate = () => {
          if (updatename && updateEmail && UpdateNo && Updatelocation && password) {  
            setupdatename('');
            setupdateEmail('');
            setUpdateNo('');
            setpassword ('');
            setUpdatelocation ('');
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
                                    <Text style={{ fontSize: 19, color: "#f01a05", fontWeight: "bold",  }}>Profile Update</Text>
                                </View>
        
                        <View style={{ width: "90%", alignSelf: "center" }}>
                          <TextInput style={styles.Input}
                            placeholder='Update Name' placeholderTextColor='#000' value={updatename} 
                            onChangeText={setupdatename} />
                              <TextInput style={styles.Input}
                            placeholder='Update Email' placeholderTextColor='#000'  value={updateEmail}
                            onChangeText={setupdateEmail} />
                            <TextInput style={styles.Input}
                            placeholder='Upate Mobile Number' placeholderTextColor='#000' value={UpdateNo}
                            onChangeText={setUpdateNo}  />
                            <TextInput style={styles.Input}
                            placeholder='Update Location' placeholderTextColor='#000' value={Updatelocation}
                            onChangeText={setUpdatelocation}  />
                            <TextInput style={styles.Input}
                            placeholder='Password' placeholderTextColor='#000' value={password}
                            onChangeText={setpassword}  />
                          <View style={{ width: "100%", height: 45, alignSelf: "flex-end", marginTop: 100 }}>
                            <TouchableOpacity style={styles.btn} onPress={handleUpdate} >
                              <Text style={{ color: "#000", fontWeight: "700", fontSize: 14 }}>Update</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                     </Pressable>
                </ScrollView>
            </SafeAreaView>
  )
}

export default ProfileUpdate
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" }
})