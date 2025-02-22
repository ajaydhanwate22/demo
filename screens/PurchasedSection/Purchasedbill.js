import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';


const Purchasedbill = () => {

    const tableData = [
        { srNo: 1, material: 'Solar panel', quantity: '12 pieces', cost: 500, total: 6000 },
      ];
   
    const totalCost = tableData.reduce((acc, row) => acc + row.total, 0);    

    const navigation = useNavigation();

      const [StartVisible, setStartVisible] = useState(false);
        const [MaterialName, setMaterialName] = useState('');
        const [Quantity, setQuantity] = useState('');
        const [Cost, setCost] = useState('');
    
      const showStartModal = () => setStartVisible(true);
      const hideStartModal = () => setStartVisible(false);
    
      const handleSubmit = () => {
        if (MaterialName && Quantity && Cost) {  
          setMaterialName('');
          setQuantity('');
          setCost('');
          hideStartModal(); 
        } else {
          alert('Please fill in all the fields.');
        }
      };


    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };


  return (
    <SafeAreaView style={styles.PageContainer}>
        {/* header */}
        <ScrollView>
        <View style={{flexDirection:"row", width:"100%", borderBottomWidth:0.5, borderColor:"#d3d3d3",padding:10,justifyContent:"space-between"}}>
            <View style={{flexDirection:"row",gap:3}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{justifyContent:'center'}}>
                    <Text><Ionicons name='chevron-back-sharp' size={40} color='black' /></Text>
                </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:"center"}} onPress={() => navigation.navigate('SupplierUpdate')} > 
                 <Text style={{color: "#f01a05", justifyContent:"center", fontWeight:"bold", fontSize:14}}>Kohinnoor Enterprises</Text>
                    <Text style={{color: "black", justifyContent:"center", fontSize:12}}>sangamner</Text>
            </TouchableOpacity>
            </View>
            <View style={{ justifyContent:"center", paddingRight:10}}>
                <TouchableOpacity onPress={toggleMenu}>
                <Text><Feather name='menu' size={30} color='black' /></Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* Heading */}
        <TouchableOpacity style={{ width: "100%", height: 40, overflow: "hidden", alignSelf: "center" }}>
            <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }} >               
                <Text style={{ fontSize: 19.1, color: "#000", fontWeight: "bold" }}>Purchased Bill</Text>
            </LinearGradient>
        </TouchableOpacity>

        {/* page content */}

        <Pressable style={{ }}>
                <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.5, borderColor: '#343341',}}>
                    <View style={{ width:"50%", borderRightWidth: 0.3,borderColor: '#343341', }}> 
                       <Text style={{ fontSize: 16, color: "#000000",padding: 10, fontWeight:"bold",  paddingLeft:13 }}>Date</Text>
                     </View>
                    <View style={{ width:"50%"}}>
                        <View  style={{ flexDirection: 'row', alignItems: 'center' }}>
                         <Ionicons name="calendar-outline" size={25} color="#000000" style={{ paddingLeft: 10,textShadowColor: 'black',    textShadowOffset: { width: 1, height: 1 },  textShadowRadius: 1, }} />
                              <Text style={{ fontSize: 16, color: "#000000",padding:10   }}>17/01/2025</Text>
                      </View>
                     </View>
                </View>
        
                 <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.5, borderColor: '#343341',}}>
                    <View style={{ width:"50%", borderRightWidth: 0.3,borderColor: '#343341', }}> 
                        <Text style={{ fontSize: 16, color: "#000000",padding: 10, fontWeight:"bold", paddingLeft:13 }}>Receipt Number</Text>
                     </View>
        
                    <View style={{ width:"50%", }}> 
                        <Text style={{ fontSize: 16, color: "#000000",padding: 10 }}>Au_001</Text>
                     </View>
                </View>
                   
                 <View  style={{ flexDirection: 'row', width: '100%',}}>
                        <View style={{ width:"50%", borderRightWidth: 0.3,borderColor: '#343341',}}> 
                            <Text style={{ fontSize: 16, color: "#000000",padding: 10, fontWeight:"bold", paddingLeft:13}}>Sell Person Name & Signature On Bill</Text>
                        </View>
                         <View style={{ width:"50%",}}>
                            <Text style={{ fontSize: 16, color: "#000000",padding: 10   }}> </Text>
                          </View>
                 </View>                               
                </Pressable>

                  {/* table */}
        
        
                  <View style={{ width: '100%', alignItems: 'center'}}>
        
                    {/* table heading */}
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',backgroundColor:'#f2be25',borderbow: 0.3, borderColor: '#343341', }} >
                      <View style={{ width: '15%',borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 8, alignItems:"center" }}>
                        <Text style={{ fontSize: 16, fontWeight:'bold', color: "#000000" }}> Sr.No</Text>
                      </View>
                      <View style={{ width: '30%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 8}}>
                        <Text style={{ fontSize: 16, color: "#000000",fontWeight:'bold',  }}>Material List</Text>
                      </View>
                      <View style={{ width: '20%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 16, color: "#000000",fontWeight:'bold',  }}>Quantity</Text>
                      </View>
                      <View style={{ width: '15%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 16, color: "#000000",fontWeight:'bold',  }}>Cost</Text>
                      </View>
                      <View style={{ width: '20%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 16, color: "#000000",fontWeight:'bold',  }}>Total</Text>
                      </View>
                    </View> 
        
                    {/* table content */}
                        {tableData.map((row, index) => (
                    <View key={index} style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start', backgroundColor: index % 2 === 0 ? 'white' : '#e7e7e7', borderBottomWidth:0.3, borderColor:"#343341" }}>
                    <View style={{ width: '15%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 10 }}>
                        <Text style={{ fontSize: 14, color: '#000000' }}>{row.srNo}</Text>
                    </View>
                    <View style={{ width: '30%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 10 }}>
                        <Text style={{ fontSize: 14, color: '#000000' }}>{row.material}</Text>
                    </View>
                    <View style={{ width: '20%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 10 }}>
                        <Text style={{ fontSize: 14, color: '#000000' }}>{row.quantity}</Text>
                    </View>
                    <View style={{ width: '15%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 10 }}>
                        <Text style={{ fontSize: 14, color: '#000000' }}>₹ {row.cost}</Text>
                    </View>
                    <View style={{ width: '20%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 10 }}>
                        <Text style={{ fontSize: 14, color: '#000000' }}>₹ {row.total}</Text>
                    </View>
                    </View>
                ))}

                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end',backgroundColor:'white',paddingVertical: 10, paddingRight:20,gap:15  }} >
                          <TouchableOpacity onPress={showStartModal} >
                          <Entypo name="plus" size={20} color="#f01a05" style={{backgroundColor:"#f2be25", borderRadius:25}} />
                          </TouchableOpacity>
                          <View style={{justifyContent:"center"}}>
                          <Text style={{ fontSize: 14,  color: "#000000", textAlign:"center"}}>Add material</Text>
                          </View>
                        </View>
        
                        {/* Total cost */}
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', backgroundColor: '#e7e7e7', paddingVertical: 10, paddingRight: 20, gap: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000' }}>Total:</Text>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000' }}>₹ {totalCost}.00</Text>
                        </View>
                        </View>               
                    </ScrollView>

                    {isMenuVisible && (
                    <View style={{ position: 'absolute', top: 60,  right: 0, backgroundColor: 'white',borderWidth: 1,borderColor: '#d3d3d3',
                        borderRadius: 5,padding: 10,width: '45%',shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.25,shadowRadius: 3.5,
                        elevation: 5,marginRight:5}}>
                        <TouchableOpacity onPress={() => { }} style={{ marginBottom: 5 }}>
                        <Text style={{ paddingVertical: 4, color: 'black', borderBottomWidth:0.3, borderColor:"#d3d3d3" }}>Profile Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {  }} style={{ marginBottom: 0 }}>
                        <Text style={{ paddingVertical: 2, color: 'black', }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    )}


                    
                                <Modal visible={StartVisible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
                                    <Pressable style={{justifyContent:"space-between",flexDirection:'row', padding:20,}}>
                                    <View style={{justifyContent: "center",alignItems:"center" }}>
                                        <Text style={{ fontSize: 21, color: "#f01a05", fontWeight: "bold", textAlign:"center" }}>Add  Material</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => hideStartModal()} style={{ justifyContent:"center",alignItems: "center" }}>
                                        <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                                    </TouchableOpacity>
                                    </Pressable>
                    
                                    <View style={{ width: "90%", alignSelf: "center" }}>
                                      <TextInput style={styles.Input}
                                        placeholder='Material Name' placeholderTextColor='#000' value={MaterialName} 
                                        onChangeText={setMaterialName} />
                                          <TextInput style={styles.Input}
                                        placeholder='Quantity' placeholderTextColor='#000'  value={Quantity}
                                        onChangeText={setQuantity} />
                                        <TextInput style={styles.Input}
                                        placeholder='Rate' placeholderTextColor='#000' value={Cost}
                                        onChangeText={setCost}  />
                                      <View style={{ width: "100%", height: 45, alignSelf: "flex-end", marginTop: 100 }}>
                                        <TouchableOpacity style={styles.btn} onPress={handleSubmit} >
                                          <Text style={{ color: "#000", fontWeight: "700", fontSize: 14 }}>Submit</Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                 </Modal>

                        <Pressable style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", elevation: 3 }}>
                            <TouchableOpacity style={{ width: "90%", height: 50, backgroundColor: "#f2be25", borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                              <Text style={{ fontSize: 15, fontWeight: "700", color: "#000000", alignSelf:"center" }}>Submit</Text>
                            </TouchableOpacity>
                        </Pressable>
                    </SafeAreaView>
  )
}

export default Purchasedbill
const styles = StyleSheet.create({
    PageContainer: { backgroundColor: "#fff", height: "100%" },
    btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
    Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
})