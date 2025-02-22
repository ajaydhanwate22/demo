import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text, } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';


const Customerpageheader = () => {

      const [StartVisible, setStartVisible] = useState(false);
      const [materialName, setMaterialName] = useState('');
      const [materialQuantity, setMaterialQuantity] = useState('');
      const [unit, setUnit] = useState('');
    
      const showStartModal = () => setStartVisible(true);
      const hideStartModal = () => setStartVisible(false);
    
      const handleSubmit = () => {
        if (materialName && materialQuantity && unit) {  
          setMaterialName('');
          setMaterialQuantity('');
          setUnit('');
          hideStartModal(); 
        } else {
          alert('Please fill in all the fields.');
        }
      };
  
      const [isMenuVisible, setIsMenuVisible] = useState(false);
  
      const toggleMenu = () => {
          setIsMenuVisible(!isMenuVisible);
      };

  const navigation = useNavigation();

  return (
    <>
    <View style={{flexDirection:"row", width:"100%", borderBottomWidth:0.5, borderColor:"#d3d3d3",paddingVertical:10,}}>
    <View style={{flexDirection:"row",width:"30%", paddingLeft:5}}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text><Ionicons name='chevron-back-sharp' size={40} color='black' /></Text>
        </TouchableOpacity>
        <View style={{justifyContent:"center"}}>
        <Text style={{color:"#000000"}}>Site ID: </Text>
        <Text style={{color:"#000000"}} >5399550</Text>
        </View>
    </View>
    <View style={{width:"40%", alignItems:"center", paddingHorizontal:20, justifyContent:"center"}}>
    <Text style={{ fontWeight: "700", color: "#f01a05", textAlign: "center" }}>Mr. Mayur Mehta 10 Kwp</Text>
    </View>
    <TouchableOpacity onPress={toggleMenu} style={{width:"30%", alignItems:"flex-end", paddingHorizontal:20, justifyContent:"center"}}>
    <Text><Feather name='menu' size={30} color='black' /></Text>
    </TouchableOpacity>
  </View>


                    {isMenuVisible && (
                    <View style={{ position: 'absolute', top: 60,  right: 0, backgroundColor: 'white',borderWidth: 1,borderColor: '#d3d3d3',
                        borderRadius: 5,padding: 10,width: '45%',shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.25,shadowRadius: 3.5,
                        elevation: 5,marginRight:10,zIndex: 999}}>
                        {/* <TouchableOpacity onPress={() => { }} style={{ marginBottom: 5 }}>
                        <Text style={{ paddingVertical: 4, color: 'black', borderBottomWidth:0.3, borderColor:"#d3d3d3" }}>Add Inforamtion</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => navigation.navigate('InverterForm')}  style={{ marginBottom: 5 }}>
                        <Text style={{ paddingVertical: 4, color: 'black', borderBottomWidth:0.3, borderColor:"#d3d3d3" }}>Inverter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('LoggerForm')}  style={{ marginBottom: 5 }}>
                        <Text style={{ paddingVertical: 4, color: 'black', borderBottomWidth:0.3, borderColor:"#d3d3d3" }}>Logger</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('BatteryForm')}  style={{ marginBottom: 0 }}>
                        <Text style={{ paddingVertical: 2, color: 'black' }}>Battery</Text>
                        </TouchableOpacity>
                    </View>
                    )}
  </>

  )
}

export default Customerpageheader
const styles = StyleSheet.create({
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" }

})