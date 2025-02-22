import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Customerpageheader from '../reusablescreens/Customerpageheader';

const Quotation1 = ({ navigation } ) => {

  
const tableData = [
  { srNo: 1, desc: 'SUN-6K-SF04LP1-EU(Hybrid)', HsnSac:'8541', quantity: '12 pieces', cost :'₹ 5000', total:' ₹ 60,000'},
];


   const [StartVisible, setStartVisible] = useState(false);

   const [Description, setDescription] = useState('');
  const [hsnSAC, setHsnSAC] = useState('');
  const [qnty, setQnty] = useState('');
  const [unit, setUnit] = useState('');
  const [rate, setRate] = useState('');
 
   const showStartModal = () => setStartVisible(true);
   const hideStartModal = () => setStartVisible(false);

   const handleSubmit = () => {
    if (Description && hsnSAC && qnty && unit && rate) {  
      setDescription('');
      setHsnSAC('');
      setQnty('');
      setUnit('');
      setRate('');
      hideStartModal(); 
    } else {
      alert('Please fill in all the fields.');
    }
  };
  
  
  return (
    <SafeAreaView style={styles.PageContainer}>
            <ScrollView>
                {/* Header With logo and menu but */}
                  <Customerpageheader/>

                {/* page container */}
                <TouchableOpacity style={{ width: "100%", height: 40, overflow: "hidden", alignSelf: "center" }}>
                    <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }} >
                          <Text style={{ fontSize: 19.1, color: "#000", fontWeight: "bold" }}>Bill</Text>
                      </LinearGradient>
                </TouchableOpacity>

                  <Pressable style={{ borderBottomWidth: 0.3, borderColor: '#343341'}}>
                    <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.3, borderColor: '#343341',}}>
                      <View style={{ width:"50%", borderRightWidth: 0.3,borderColor: '#343341', }}> 
                        <Text style={{ fontSize: 16, color: "#000000",padding: 10, fontWeight:"bold", }}>Date</Text>
                      </View>
                      <View style={{ width:"50%"}}>
                        <View  style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="calendar-outline" size={25} color="#000000" style={{ paddingLeft: 10,textShadowColor: 'black',    textShadowOffset: { width: 1, height: 1 },  textShadowRadius: 1, }} />
                        <Text style={{ fontSize: 16, color: "#000000",padding:10   }}>21/01/2025</Text>
                        </View>
                      </View>
                    </View>

                    <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.3, borderColor: '#343341' }}>
                      <View style={{ width:"50%", borderRightWidth: 0.3,borderColor: '#343341',}}> 
                        <Text style={{ fontSize: 16, color: "#000000",padding: 10,fontWeight:"bold"}}>Quotation_1</Text>
                      </View>
                      <View style={{ width:"50%",}}>
                        <Text style={{ fontSize: 16, color: "#000000",padding: 10   }}>Q_0001</Text>
                      </View>
                    </View>

                    <View  style={{ flexDirection: 'row', width: '100%',}}>
                      <View style={{ width:"50%", borderRightWidth: 0.3,borderColor: '#343341',}}> 
                        <Text style={{ fontSize: 16, color: "#000000",padding: 10,fontWeight:"bold"}}>Bill NO.</Text>
                      </View>
                      <View style={{ width:"50%",}}>
                        <Text style={{ fontSize: 16, color: "#000000",padding: 10   }}>B_0001</Text>
                      </View>
                    </View>
                  </Pressable>


                  {/* table */}


                  <View style={{borderBottomWidth: 0.3, borderColor: '#343341',}}>

                    {/* table heading */}
                    <View style={{ flexDirection: 'row', width: '100%', backgroundColor:'#f2be25' }} >
                      <View style={{ width: '10%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 16, color: "#000000",fontWeight:'bold',textAlign:'center',paddingHorizontal:3  }}> Sr.No</Text>
                      </View>
                      <View style={{ width: '25%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 16, color: "#000000",fontWeight:'bold',textAlign:'center'  }}>Description of Goods</Text>
                      </View>
                      <View style={{ width: '15%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 16, color: "#000000",fontWeight:'bold',  }}>HSN/SAC</Text>
                      </View>
                      <View style={{ width: '17%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 16, color: "#000000",fontWeight:'bold',  }}>Qnty</Text>
                      </View>
                      <View style={{ width: '16%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 16, color: "#000000",fontWeight:'bold',  }}>Rate</Text>
                      </View>
                      <View style={{ width: '17%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 16, color: "#000000",fontWeight:'bold',  }}>Total</Text>
                      </View>
                    </View> 

                    {/* table content */}
                    {tableData.map((row, index) => (
                      <View  key={index} style={{ flexDirection: 'row',width: '100%', justifyContent: 'flex-start',backgroundColor: index % 2 === 0 ? 'white' : '#e7e7e7', borderTopWidth: 0.3, borderColor: '#343341',
                        }} >
                        <View style={{ width: '10%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 10 }}>
                          <Text style={{ fontSize: 14, color: "#000000", textAlign:"center" }}>{row.srNo}</Text>
                        </View>
                        <View style={{ width: '25%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', padding: 10, justifyContent:'center'}}>
                          <Text style={{ fontSize: 14, color: "#000000", textAlign:'center',paddingHorizontal:4 }}>{row.desc}</Text>
                        </View>
                        <View style={{ width: '15%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 10, justifyContent:'center' }}>
                          <Text style={{ fontSize: 14, color: "#000000", textAlign:'center'}}>{row.HsnSac}</Text>
                        </View>
                        <View style={{ width: '17%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 10, justifyContent:'center' }}>
                          <Text style={{ fontSize: 14, color: "#000000", textAlign:'center'}}>{row.quantity}</Text>
                        </View>
                        <View style={{ width: '16%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 10, justifyContent:'center' }}>
                          <Text style={{ fontSize: 14, color: "#000000", textAlign:'center'}}>{row.cost}</Text>
                        </View>
                        <View style={{ width: '17%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 10, justifyContent:'center' }}>
                          <Text style={{ fontSize: 14, color: "#000000", textAlign:'center'}}>{row.total}</Text>
                        </View>
                      </View>
                    ))} 
                  </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end',backgroundColor:'white',marginVertical: 20, paddingRight:20,gap:15  }} >
                         <TouchableOpacity onPress={showStartModal} >
                             <Entypo name="plus" size={25} color="#f01a05" style={{backgroundColor:"#f2be25", borderRadius:25}} />
                     </TouchableOpacity>
                     <View style={{justifyContent:"center"}}>
                     <Text style={{ fontSize: 14,  color: "#000000"}}>Add New Row</Text>
                     </View>
                </View>

                <View style={{borderWidth:1, backgroundColor:"#e7e7e7",borderColor: '#343341'}}>
                    <View style={{justifyContent:'flex-end',padding:10, paddingRight:30}}>
                    <Text style={{textAlign:'right', fontSize:16, fontWeight:'bold',color: "#000000"}}>Total: ₹ 60,000.00</Text>
                    </View>
                </View>

                <View style={{paddingHorizontal:30, paddingVertical:10}}>
                    <View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
                        <View style={{flexDirection:'row',gap:30}}>
                        <Text style={{fontSize:14, color:'black'}}>OUTPUT SGST @ 9%</Text>
                        <Text style={{fontSize:14, color:'black'}}>444.78</Text>
                        </View>
                        <View style={{flexDirection:'row',gap:15}}>
                        <Text style={{fontSize:14, color:'black'}}>OUTPUT C GST @ 6%</Text>
                        <Text style={{fontSize:14, color:'black'}}>11,276.40</Text>
                        </View>
                        <View style={{flexDirection:'row',gap:15}}>
                        <Text style={{fontSize:14, color:'black'}}>OUTPUT C GST @ 6%</Text>
                        <Text style={{fontSize:14, color:'black'}}>11,276.40</Text>
                        </View>
                        <View style={{flexDirection:'row',gap:40}}>
                        <Text style={{fontSize:14, color:'black'}}>Less :Rounding</Text>
                        <Text style={{fontSize:14, color:'black'}}>(-)0.36</Text>
                        </View>
                    </View>
                </View>

                
                <View style={{borderWidth:1, backgroundColor:"#e7e7e7",borderColor: '#343341'}}>
                    <View style={{justifyContent:'flex-end',padding:10, paddingRight:30}}>
                    <Text style={{textAlign:'right', fontSize:16, fontWeight:'bold',color: "#000000"}}>Grand Total:  1,20,000.00</Text>
                    </View>
                </View>
            </ScrollView>
                <Pressable style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", elevation: 3 }}>
                    <TouchableOpacity style={{ width: "90%", height: 50, backgroundColor: "#f2be25", borderRadius: 6, justifyContent: "center", alignItems: "center" }} onPress={showStartModal}>
                      <View style={{flexDirection: 'row', gap:10}}>
                      <Text style={{ fontSize: 15, fontWeight: "700", color: "#000000", alignSelf:"center" }}>Submit</Text>
                      </View>
                    </TouchableOpacity>
                </Pressable>

                   {/*Modal */}

                <Modal visible={StartVisible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
                                    <Pressable style={{justifyContent:"space-between",flexDirection:'row', padding:20,}}>
                                    <View style={{justifyContent: "center",alignItems:"center" }}>
                                        <Text style={{ fontSize: 19, color: "#f01a05", fontWeight: "bold", textAlign:"center" }}>Add Item</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => hideStartModal()} style={{ justifyContent:"center",alignItems: "center" }}>
                                        <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                                    </TouchableOpacity>
                                    </Pressable>
    
                    <View style={{ width: "90%", alignSelf: "center" }}>
                      <TextInput style={styles.Input}
                        placeholder='Description of Goods' placeholderTextColor='#000'  value={Description} 
                        onChangeText={setDescription}/>
                          <TextInput style={styles.Input}
                        placeholder='HSN/SAC' placeholderTextColor='#000'   value={hsnSAC}
                        onChangeText={setHsnSAC} />
                        <TextInput style={styles.Input}
                        placeholder='Qnty' placeholderTextColor='#000'   value={qnty}
                        onChangeText={setQnty} />
                        <TextInput style={styles.Input}
                        placeholder='Unit' placeholderTextColor='#000'   value={unit}
                        onChangeText={setUnit} />
                        <TextInput style={styles.Input}
                        placeholder='Rate' placeholderTextColor='#000'   value={rate}
                        onChangeText={setRate} />
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

export default Quotation1
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
})