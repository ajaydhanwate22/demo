import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList  } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


const GeneralDeatilled = () => {

    const navigation = useNavigation();

      const [kWatt , setkWatt] = useState('');
      const [ConnectedLoad , setConnectedLoad] = useState('');
      const [BU, setBU] = useState('');
      const [Kva , setKva] = useState ('');
      const [Tariff, setTariff]= useState ('');
      
        const handleSubmit = () => {
          if (kWatt && ConnectedLoad && BU && Kva && Tariff) {  
            setkWatt('');
            setConnectedLoad('');
            setBU('');
            setKva ('');
            setTariff ('');
          } else {
            alert('Please fill in all the fields.');
          }
        };
  
  return (
    <SafeAreaView style={styles.PageContainer}>
       <ScrollView>

                    <Pressable style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
                        <Pressable style={{justifyContent:"space-between",flexDirection:'row', padding:20,}}>
                              <View style={{justifyContent: "center",alignItems:"center" }}>
                                    <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "bold", textAlign:"center" }}>General Details Update</Text>
                                </View>
                          <TouchableOpacity  onPress={() => navigation.goBack()}  style={{ justifyContent:"center",alignItems: "center" }}>
                                      <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                            </TouchableOpacity>
                          </Pressable>
        
                        <View style={{ width: "90%", alignSelf: "center" }}>
                          <TextInput style={styles.Input}
                            placeholder='Add Kwatt System' placeholderTextColor='#000' value={kWatt} 
                            onChangeText={setkWatt} />
                              <TextInput style={styles.Input}
                            placeholder='Connected Load' placeholderTextColor='#000'  value={ConnectedLoad}
                            onChangeText={setConnectedLoad} />
                            <TextInput style={styles.Input}
                            placeholder='BU' placeholderTextColor='#000' value={BU}
                            onChangeText={setBU}  />
                            <TextInput style={styles.Input}
                            placeholder='Kva' placeholderTextColor='#000' value={Kva}
                            onChangeText={setKva}  />
                            <TextInput style={styles.Input}
                            placeholder='Tariff' placeholderTextColor='#000' value={Tariff}
                            onChangeText={setTariff}  />
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

export default GeneralDeatilled
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" }
})