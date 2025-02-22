import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList  } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


const Visiteddata = () => {

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

                    <Pressable style={{ width: "100%", backgroundColor: "#fff" }}>
                        <Pressable style={{justifyContent:"space-between",flexDirection:'row', padding:20,}}>
                              <View style={{justifyContent: "center",alignItems:"center" }}>
                                    <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "bold", textAlign:"center" }}>Visit Details</Text>
                                </View>
                          <TouchableOpacity  onPress={() => navigation.goBack()}  style={{ justifyContent:"center",alignItems: "center" }}>
                                      <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                            </TouchableOpacity>
                        </Pressable>
                     </Pressable>

                     <View style={{ backgroundColor:'#f2be25'}}>
                        <Text style={{paddingHorizontal:20,paddingVertical:10, fontWeight:'bold',color:'black'}}>Visit Number : 01</Text>
                     </View>

                     <View style={{paddingHorizontal:20, gap:10, marginTop:20}}>
                        <View style={{justifyContent:'space-between',paddingVertical:10, flexDirection:"row",borderBottomWidth: 0.3,borderColor: "#000",}}>
                            <Text style={{fontWeight:'bold',color: "#f01a05"}}>05/01/2025</Text>
                            <Text style={{color: "#f01a05"}}>Time: 3:45PM</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={{fontWeight:'boxld',color:'black'}}>Panel Testing</Text>
                            <Text style={{color:'black'}}>We check panel its Good condition no need to repaire ..</Text>
                        </View>
                        <View style={{borderWidth: 0.3,borderColor: "#000",justifyContent:'center', alignItems:'center', marginTop:50}} >
                            <Text style={{fontSize:16,color:'black', paddingVertical:60}}>Photo</Text>
                        </View>
                     </View>
                </ScrollView>
            </SafeAreaView>
  )
}

export default Visiteddata
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" }
})