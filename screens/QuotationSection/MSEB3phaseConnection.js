import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text, FlatList } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


const MSEB3phaseConnection = ({ navigation } ) => {

  // to used dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const options = [
    { title: 'MSEB Singal Phase Lite Connection 01', screen: 'MonthlyBillUpdate' },
    { title: 'MSEB Three Phase Lite Connection 01', screen: '' },
    { title: 'MSEB Three Phase Lite Connection 02', screen: '' },
  ];
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleSelectItem = (item) => {
    setIsDropdownOpen(false); 
    navigation.navigate(item.screen);
  };
  // end


const [StartVisible, setStartVisible] = useState(false);
const [modalHeading, setModalHeading] = useState(''); // New state for dynamic heading

const showStartModal = (heading) => {
  setModalHeading(heading);  // Update the heading based on the button clicked
  setStartVisible(true);
};

const hideStartModal = () => setStartVisible(false);

  return (
    <SafeAreaView style={styles.PageContainer}>
       <ScrollView>

        {/* page container */}

        <View style={{flexDirection:"row", justifyContent:"space-between",padding:5,}}>
        <Text style={{ fontSize: 21.1, color: "#f01a05", fontWeight: "bold", alignSelf:"center", justifyContent:"center", paddingLeft:30}}>Monthly Bill Update</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 30, color: "#000", fontWeight: "300", alignSelf:"center",paddingRight:30 }}>X</Text>  
        </TouchableOpacity>
        </View>

           <TouchableOpacity style={{ width: "100%", height: 45, overflow: "hidden", alignSelf: "center",  borderColor:"#343341",borderTopWidth: 1,borderBottomWidth: 1,   }}onPress={toggleDropdown}>
                  <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", alignItems: "center", gap:10, justifyContent:"flex-start" ,paddingHorizontal:30 }} >  
                  <AntDesign name={isDropdownOpen ? "caretdown" : "caretright"} size={20} color="#000000" />             
                       <Text style={{ fontSize: 16.1, color: "#000", fontWeight: "bold" }}>MSEB Three Phase Lite Connection 03</Text>
                  </LinearGradient>
           </TouchableOpacity>

                      {isDropdownOpen && (
                   <FlatList
                     data={options}
                     renderItem={({ item ,index  }) => (
                       <TouchableOpacity onPress={() => handleSelectItem(item)} style={{paddingVertical: 10,paddingHorizontal: 50,borderBottomWidth: 1,
                           borderBottomColor: '#ddd',backgroundColor: index % 2 === 0 ? 'white' : '#e7e7e7',}}>
                         <Text style={{ fontSize: 16, color: '#000' }}>{item.title}</Text>
                       </TouchableOpacity>
                     )}
                     keyExtractor={(item, index) => index.toString()}style={{width: '100%',backgroundColor: 'white', borderRadius: 5,}}
                   />
                 )}

      {/* table */}
                    <View style={{ width: "100%", height: 45, overflow: "hidden", alignSelf: "center",  paddingHorizontal: 30,flexDirection: "row",justifyContent: "flex-start",gap: 10,alignItems: "center", marginTop:20, borderTopWidth:1,borderColor: '#343341',                 backgroundColor:"#e7e7e7"}}>
                              <TouchableOpacity onPress={() => showStartModal("1.Jan-24-Update Bill Details")} >
                              <Entypo name="plus" size={20} color="#f01a05" style={{backgroundColor:"#f2be25", borderRadius:25}} />
                              </TouchableOpacity>           
                       <Text style={{ fontSize: 16.1, color: "#000", fontWeight: "bold",color: "#f01a05",fontSize: 18.1,  }}>1.jan-24-Update Bill Details</Text>
                   </View>
                   <View style={{ width: '100%', alignItems: 'center',borderWidth: 1, borderColor: '#343341'}}>
                     {/* table content */}  
                     <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',backgroundColor:'#f2be25',borderBottomWidth: 1,borderColor: '#343341', }} >
                       <View style={{ width: '16%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16, color: "#000000", textAlign:"center" }}> 2200-</Text>
                         <Text style={{ fontSize: 16, color: "#000000", textAlign:"center" }}>0600 Hrs</Text>
                       </View>
                       <View style={{ width: '26%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000", textAlign:"center" }}>600-900 & </Text>
                         <Text style={{ fontSize: 16,  color: "#000000", textAlign:"center" }}>1200-1800 Hrs</Text>
                       </View>
                       <View style={{ width: '18%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000", textAlign:"center", paddingHorizontal: 5 }}>0900-</Text>
                         <Text style={{ fontSize: 16,  color: "#000000", textAlign:"center", paddingHorizontal: 5 }}>1200 Hrs</Text>
                       </View>
                       <View style={{ width: '18%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000", textAlign:"center", paddingHorizontal:10 }}>1800-</Text>
                         <Text style={{ fontSize: 16,  color: "#000000", textAlign:"center", paddingHorizontal:10 }}>2200 Hrs</Text>
                       </View>
                       <View style={{ width: '22%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10, alignSelf:"center" }}>
                         <Text style={{ fontSize: 16,  color: "#000000", textAlign:"center", paddingHorizontal:20, }}>Total Unit</Text>
                       </View>
                     </View>
         
                     <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',borderBottomWidth: 1,borderColor: '#343341', backgroundColor:"#e7e7e7" }} >
                       <View style={{ width: '16%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16, color: "#000000" }}> 286</Text>
                       </View>
                       <View style={{ width: '26%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000" }}>1745</Text>
                       </View>
                       <View style={{ width: '18%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000" }}>420</Text>
                       </View>
                       <View style={{ width: '18%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000" }}>1173</Text>
                       </View>
                       <View style={{ width: '22%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000" }}>3624</Text>
                       </View>
                     </View>


                     <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',backgroundColor:"#e7e7e7" }} >
                       <View style={{ width: '15%', alignItems: 'center',  borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16, color: "#000000" }}> </Text>
                       </View>
                       <View style={{ width: '30%', alignItems: 'center',  borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000", fontWeight:"bold" }}></Text>
                       </View>
                       <View style={{ width: '25%', alignItems: 'center',  borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000", fontWeight:"bold" }}>Bill Amount</Text>
                       </View>
                       <View style={{ width: '30%', alignItems: 'center',  borderColor: '#343341', paddingVertical: 10,justifyContent:"space-around",flexDirection:'row' }}>
                       {/* <MaterialIcons name="currency-rupee" size={20} color="#000000" style={{ }} /> */}
                       <Text style={{ fontSize: 16,  color: "#000000"}}>₹ 47,310.00</Text>
                       </View>
                     </View>
                   </View>

                   <View style={{ width: "100%", height: 45, overflow: "hidden", alignSelf: "center",  paddingHorizontal: 30,flexDirection: "row",justifyContent: "flex-start",gap: 10,alignItems: "center", marginTop:20, borderTopWidth:1,borderColor: '#343341', backgroundColor:"#e7e7e7"}}>
                              <TouchableOpacity onPress={() => showStartModal("Extra Unit Bill Details")}>
                              <Entypo name="plus" size={20} color="#f01a05" style={{backgroundColor:"#f2be25", borderRadius:25}} />
                              </TouchableOpacity>           
                       <Text style={{ fontSize: 16.1, color: "#000", fontWeight: "bold",color: "#f01a05",fontSize: 18.1,  }}>Extra Unit- Update Bill Details</Text>
                    </View>
                   <View style={{ width: '100%', alignItems: 'center',borderWidth: 1, borderColor: '#343341'}}>

                     {/* table content */}
                     <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',backgroundColor:'#f2be25',borderBottomWidth: 1,borderColor: '#343341', }} >
                       <View style={{ width: '16%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16, color: "#000000", textAlign:"center" }}> 2200-</Text>
                         <Text style={{ fontSize: 16, color: "#000000", textAlign:"center" }}>0600 Hrs</Text>
                       </View>
                       <View style={{ width: '26%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000", textAlign:"center" }}>600-900 & </Text>
                         <Text style={{ fontSize: 16,  color: "#000000", textAlign:"center" }}>1200-1800 Hrs</Text>
                       </View>
                       <View style={{ width: '18%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000", textAlign:"center", paddingHorizontal: 5 }}>0900-</Text>
                         <Text style={{ fontSize: 16,  color: "#000000", textAlign:"center", paddingHorizontal: 5 }}>1200 Hrs</Text>
                       </View>
                       <View style={{ width: '18%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000", textAlign:"center", paddingHorizontal:10 }}>1800-</Text>
                         <Text style={{ fontSize: 16,  color: "#000000", textAlign:"center", paddingHorizontal:10 }}>2200 Hrs</Text>
                       </View>
                       <View style={{ width: '22%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10, alignSelf:"center" }}>
                         <Text style={{ fontSize: 16,  color: "#000000", textAlign:"center", paddingHorizontal:20, }}>Total Unit</Text>
                       </View>
                     </View>
         
                     <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',borderBottomWidth: 1,borderColor: '#343341', backgroundColor:"#e7e7e7" }} >
                       <View style={{ width: '16%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16, color: "#000000" }}> 286</Text>
                       </View>
                       <View style={{ width: '26%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000" }}>1745</Text>
                       </View>
                       <View style={{ width: '18%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000" }}>420</Text>
                       </View>
                       <View style={{ width: '18%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000" }}>1173</Text>
                       </View>
                       <View style={{ width: '22%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000" }}>3624</Text>
                       </View>
                     </View>


                     <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',backgroundColor:"#e7e7e7" }} >
                       <View style={{ width: '45%', alignItems: 'center',  borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16, color: "#000000" }}> </Text>
                       </View>
                       <View style={{ width: '25%', alignItems: 'center',  borderColor: '#343341', paddingVertical: 10 }}>
                         <Text style={{ fontSize: 16,  color: "#000000", fontWeight:"bold" }}>Bill Amount</Text>
                       </View>
                       <View style={{ width: '30%', alignItems: 'center',  borderColor: '#343341', paddingVertical: 10,justifyContent:"space-around",flexDirection:'row' }}>
                       {/* <MaterialIcons name="currency-rupee" size={20} color="#000000" style={{ }} /> */}
                       <Text style={{ fontSize: 16,  color: "#000000"}}>₹ 47,310.00</Text>
                       </View>
                     </View>
                   </View>

                   </ScrollView>

                <Pressable style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", elevation: 3 }}>
                    <TouchableOpacity style={{ width: "90%", height: 50, backgroundColor: "#f2be25", borderRadius: 6, justifyContent: "center", alignItems: "center",borderWidth: 1,borderColor: '#343341',  }} >
                      <View style={{flexDirection: 'row', gap:10}}>
                      {/* <Entypo name="plus" size={25} color="white" style={{backgroundColor:"#f01a05", borderRadius:25}} /> */}
                      <Text style={{ fontSize: 15, fontWeight: "700", color: "#000000", alignSelf:"center" }}>Submit</Text>
                      </View> 
                    </TouchableOpacity>
                </Pressable>        
 
            <Modal visible={StartVisible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
                        <Pressable style={{justifyContent:"space-between",flexDirection:'row', padding:20,}}>
                              <View style={{justifyContent: "center",alignItems:"center" }}>
                                    <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "bold", textAlign:"center" }}>{modalHeading}</Text>
                                </View>
                          <TouchableOpacity  onPress={() => navigation.goBack()}  style={{ justifyContent:"center",alignItems: "center" }}>
                                      <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                            </TouchableOpacity>
                          </Pressable>

                <View style={{ width: "90%", alignSelf: "center" }}>
                  <TextInput style={styles.Input}
                    placeholder='Add 2200 Hrs-0600 Hrs (unit)' placeholderTextColor='#000'/>
                      <TextInput style={styles.Input}
                    placeholder='0600 Hrs - 0900 & 1200 Hrs-1800 (Units)' placeholderTextColor='#000'/>
                    <TextInput style={styles.Input}
                    placeholder='Add 0900 Hrs - 1200 Hrs (Units)' placeholderTextColor='#000' />

                    <TextInput style={styles.Input}
                    placeholder='Add 1800 Hrs - 2200 Hrs (Units)' placeholderTextColor='#000'/> 
                    
                    <TextInput style={styles.Input}
                    placeholder='Total Unit' placeholderTextColor='#000' /> 

                <TextInput style={styles.Input}
                    placeholder='Bll Amount' placeholderTextColor='#000'/> 
                  <View style={{ width: "100%", height: 45, alignSelf: "flex-end", marginTop: 100 }}>
                    <TouchableOpacity style={styles.btn}>
                      <Text style={{ color: "#000", fontWeight: "700", fontSize: 14 }}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
             </Modal>
      </SafeAreaView>
  )
}

export default MSEB3phaseConnection
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" }
})