import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList  } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


const AboutSolarPlant = () => {

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
                              <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "bold", textAlign:"center" }}>About Solar Power Plant Details</Text>
                              </View>
                              <TouchableOpacity  onPress={() => navigation.goBack()}  style={{ justifyContent:"center",alignItems: "center" }}>
                                        <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                              </TouchableOpacity>
                        </Pressable>
                        
        
                        <View style={{ width: "90%", alignSelf: "center", marginTop:-20 }}>
                          <TextInput style={styles.Input}
                            placeholder='Technology used for Solar Module' placeholderTextColor='#000' value={kWatt} 
                            onChangeText={setkWatt} />
                              <TextInput style={styles.Input}
                            placeholder='European Efficiency1' placeholderTextColor='#000'  value={ConnectedLoad}
                            onChangeText={setConnectedLoad} />
                            <TextInput style={styles.Input}
                            placeholder='European Efficiency1' placeholderTextColor='#000' value={BU}
                            onChangeText={setBU}  />
                            <TextInput style={styles.Input}
                            placeholder='Solar Module' placeholderTextColor='#000' value={Kva}
                            onChangeText={setKva}  />
                            <TextInput style={styles.Input}
                            placeholder='Ongrid Smart Inverter' placeholderTextColor='#000' value={Tariff}
                            onChangeText={setTariff}  />
                             <TextInput style={styles.Input}
                            placeholder='Solar system Wattege 1' placeholderTextColor='#000' value={Tariff}
                            onChangeText={setTariff}  />
                            <TextInput style={styles.Input}
                            placeholder='Solar system Wattege 2' placeholderTextColor='#000' value={Tariff}
                            onChangeText={setTariff}  />
                            <TextInput style={styles.Input}
                            placeholder='Solar Module Rating & Quntity 1' placeholderTextColor='#000' value={Tariff}
                            onChangeText={setTariff}  />
                            <TextInput style={styles.Input}
                            placeholder='Solar Module Rating & Quntity 2' placeholderTextColor='#000' value={Tariff}
                            onChangeText={setTariff}  />
                            <TextInput style={styles.Input}
                            placeholder='Solar module rating and ' placeholderTextColor='#000' value={Tariff}
                            onChangeText={setTariff}  />
                            <TextInput style={styles.Input}
                            placeholder='Smart Inverter Kwatt 2' placeholderTextColor='#000' value={Tariff}
                            onChangeText={setTariff}  />
                        </View>
                     </Pressable>
                </ScrollView>
  
            <Pressable style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", elevation: 3 }}>
                <TouchableOpacity style={{ width: "90%", height: 50, backgroundColor: "#f2be25", borderRadius: 6, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#000", }}>
                    <Text style={{ fontSize: 15, fontWeight: "700", color: "#000" }}> Submit</Text>
                </TouchableOpacity>
            </Pressable>
            </SafeAreaView>
  )
}

export default AboutSolarPlant
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 10, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" }
})