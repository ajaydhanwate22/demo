import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList,Button } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const DetailedInfoAbout = ({navigation}) => {

    const [rows, setRows] = useState([
        {
          id: 1,
          moduleMounting: 'Module Mounting Structured',
          company: 'Tata',
          description: 'Fabrication Hite -16 to 18 fit with Civil Work & Color anti-uv, high frequency insulation, chemical resistance & weatherability'
        },
        {
          id: 2,
          moduleMounting: 'Aluminium Rail Fitting Type',
          company: ' Lord- Adhesives America',
          description: 'LOED acrylic-based adhesives deliver world-class performance in bonding to bare metals'
        },
        {   
            id: 3,
            moduleMounting: 'MC 4 Solar Connector',
            company: ' Elmax Quo - Require',
            description: 'MC 4 Con. Pins are Made of Copper with Outer Tin Plated. & High Quality PPO + PA material.'
          },
          
          {
            id: 4,
            moduleMounting: 'AC Cabel DC Cabel Earthing Cabel / Strip',
            company: ' Polycab Quo - Require',
            description: '4 Core Aluminium Armoured AC Cabel 4 / 6 Sq. MM DC Cabel Singal Core Copper Ac Cabel / 25 X 3 Earthing Strip'
          },
          {
            id: 5,
            moduleMounting: 'ACDB / DCDB',
            company: ' Akshay Urja Quo - 1 + 1',
            description: '3 Phase Enclosure with Terminal, AC MCB + SPD Enclosure with Terminal , DC MCB + DC SPD + DC Fuse'
          },
          {
            id: 6,
            moduleMounting: 'Lighting Arrester AC Ground Earthing DC Ground Earthing',
            company: ' Protectwell Quo - 3',
            description: 'ISO 9001 : 2008 Certified, 10 Meter Rang  AC / DC Ground Earthing'
          },
          {
            id: 7,
            moduleMounting: 'Net Meter / Generation Meter',
            company: 'Secure / 2 + 2',
            description: 'Net Energy Import Export Meter / Generation Meter'
          },
          {
            id: 8,
            moduleMounting: 'Standard Pipe & Fitting',
            company: 'Presigan',
            description: 'Pipe & Fitting with Srw, Clamp, PVC Raval Plaug'
          },
          {
            id: 9,
            moduleMounting: 'Walkway',
            company: ' Akshay Urja',
            description: 'specially designed for SAFE & CONTROLLED roof access non-slip, safe and all weather access for mainten of panels'
          },

          {
            id: 10,
            moduleMounting: 'Module Earthing Meter Box Presher Pump ',
            company: ' Akshay Urja ',
            description: 'Included with SS 304 H/W DC Ground Earthing / MS Meter Box With Powder Coating 2.0 MM Thickness Presher Pump with Plumbing Pipe fitting'
          },

          {
            id: 11,
            moduleMounting: 'Cable Clips',
            company: ' Quo - Require',
            description: 'UV Protected Cable Clips'
          },
          {
            id: 12,
            moduleMounting: 'MSEB Netmeter Docume./ Labour Charges / Transportation',
            company: ' Quo - Require',
            description: 'INCLUDE' 
          },

      ]);

      const [highlightedRowId, setHighlightedRowId] = useState(1);

      const [modalVisible, setModalVisible] = useState(false);
      const [editingRow, setEditingRow] = useState(null);

      const [updatedModuleMounting, setUpdatedModuleMounting] = useState('');
      const [updatedCompany, setUpdatedCompany] = useState('');
      const [updatedDescription, setUpdatedDescription] = useState('');

      const openModal = (row) => {
        setEditingRow(row);
        setUpdatedModuleMounting(row.moduleMounting);
        setUpdatedCompany(row.company);
        setUpdatedDescription(row.description);
        setModalVisible(true);
      };


  // Function to update the data for the specific row
  const handleUpdate = () => {
    const updatedRows = rows.map(row => 
      row.id === editingRow.id 
        ? { ...row, moduleMounting: updatedModuleMounting, company: updatedCompany, description: updatedDescription }
        : row
    );
    setRows(updatedRows);
    setModalVisible(false);  // Close the modal after update
  };


  // to add the handle submit button and store the data 
    
  
  return (
    <SafeAreaView style={styles.PageContainer}>
       <ScrollView>
                <View style={{flexDirection:"row", justifyContent:"space-between",padding:5,}}>
                    <View style={{paddingLeft:20}}>
                    <Text style={{ fontSize: 21.1, color: "#f01a05", fontWeight: "bold" }}>Deatailed information about</Text>
                    <Text style={{ fontSize: 21.1, color: "#f01a05", fontWeight: "bold"}}>Material Supplied to your </Text>
                    <Text style={{ fontSize: 21.1, color: "#f01a05", fontWeight: "bold"}}>Solar power plant</Text>
                    </View>
          
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 30, color: "#000", fontWeight: "300", alignSelf:"center",paddingRight:30 }}>X</Text>  
                </TouchableOpacity>
                </View>

                  <View style={{ marginTop:10, borderColor: '#343341',borderTopWidth:1.1}}>
                
                                    {/* table heading */}
                    <View style={{ flexDirection: 'row', width: '100%', backgroundColor:'#f2be25' }} >
                       <View style={{ width: '35%', alignItems: 'center', borderRightWidth: 1.1, borderColor: '#343341', padding: 5, paddingVertical:10, borderBottomWidth:1.1 }}>
                           <Text style={{ fontSize: 14, color: "#000000",fontWeight:'bold',  }}> Description</Text>
                         </View>
                        <View style={{ width: '25%', alignItems: 'center', borderRightWidth: 1.1, borderColor: '#343341', paddingVertical: 5,paddingVertical:10 ,borderBottomWidth:1.1 }}>
                           <Text style={{ fontSize: 14, color: "#000000",fontWeight:'bold',  }}>Make</Text>
                        </View>
                          <View style={{ width: '40%', alignItems: 'center', borderRightWidth: 1.1, borderColor: '#343341', paddingVertical: 5,paddingVertical:10 ,borderBottomWidth:1.1 }}>
                            <Text style={{ fontSize: 14, color: "#000000",fontWeight:'bold',  }}>Specification</Text>
                          </View>
                        </View> 

                         {rows.map(row => (
                           <View key={row.id} style={[styles.row,{backgroundColor: row.id === 1 || row.id === 3 || row.id === 5 || row.id === 7 ||  row.id === 9 ||row.id === 11    ? '#e7e7e7' : 'transparent', },]} >
                                <TouchableOpacity style={{ width: '35%', alignItems: 'center', borderRightWidth: 1.1, borderColor: '#343341', paddingVertical: 10, padding: 5 }} onPress={() => openModal(row)}>
                                    <Text style={{ fontSize: 12, color: "#000000", textAlign: "center" }}>{row.moduleMounting}</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={{ width: '25%', alignItems: 'center', borderRightWidth: 1.1, borderColor: '#343341', paddingVertical: 10, padding: 5 }} onPress={() => openModal(row)}>
                                      <Text style={{ fontSize: 12, color: "#000000", textAlign: "center" }}>{row.company}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '40%', alignItems: 'center', borderRightWidth: 1.1, borderColor: '#343341', paddingVertical: 10, padding: 5 }} onPress={() => openModal(row)}>
                                      <Text style={{ fontSize: 12, color: "#000000", textAlign: "center" }}>{row.description}</Text>
                                      </TouchableOpacity>
                                </View>
                              ))}
                        </View>

        {/* Modal for updating data */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)} >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Data</Text>
            <TextInput style={styles.input} placeholder="Update Module Mounting" value={updatedModuleMounting} onChangeText={setUpdatedModuleMounting}/>
            <TextInput style={styles.input}placeholder="Update Company" value={updatedCompany} onChangeText={setUpdatedCompany} />
            <TextInput style={[styles.input, { height: 100,textAlignVertical: 'top' }]}   placeholder="Update Description" value={updatedDescription} onChangeText={setUpdatedDescription} multiline={true} numberOfLines={4}  />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={{backgroundColor: '#f2be25',padding: 10,borderRadius: 5,flex: 1,alignItems: 'center',}}onPress={handleUpdate}>
                <Text style={{ color: 'black', fontSize: 16 }}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#f2be25', padding: 10,borderRadius: 5,flex: 1,alignItems: 'center',}}onPress={() => setModalVisible(false)} >
                <Text style={{ color: 'black', fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
    </ScrollView>
   <Pressable style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", elevation: 3 }}>
        <TouchableOpacity style={{ width: "90%", height: 50, backgroundColor: "#f2be25", borderRadius: 6, justifyContent: "center", alignItems: "center",borderWidth: 1,borderColor: '#343341',  }} >
                <View style={{flexDirection: 'row', gap:10}}>
                  <Text style={{ fontSize: 16, fontWeight: "700", color: "#000000", alignSelf:"center" }}>Submit</Text>
              </View> 
        </TouchableOpacity>
    </Pressable>
  </SafeAreaView>
  )
}

export default DetailedInfoAbout
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
  row: { flexDirection: 'row', width: '100%', justifyContent: 'flex-start', borderColor: '#343341', borderBottomWidth: 1.1 },
  container: {flexGrow: 1,},
  modalOverlay: {flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)'},
  modalView: {backgroundColor: 'white',padding: 20,borderRadius: 10,width: '90%',},
  modalText: {fontSize: 18,marginBottom: 10,fontWeight:"bold",textAlign:"center",color:"black" },
  input: {height: 40,borderColor: 'black',borderWidth: 1,marginBottom: 10,paddingLeft: 8,}, 
})