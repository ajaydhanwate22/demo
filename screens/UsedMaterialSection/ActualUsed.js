import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Customerpageheader from '../reusablescreens/Customerpageheader';


const ActualUsed = ({ navigation } ) => {

  const data = [
    { srNo: 1, material: 'Solar panel', quantity: '12 pieces', cost: '₹ 500' },
    { srNo: 2, material: 'Solar panel', quantity: '12 pieces', cost: '₹ 500' },
    { srNo: 3, material: 'Solar panel', quantity: '12 pieces', cost: '₹ 500' },
    { srNo: 4, material: 'Solar panel', quantity: '12 pieces', cost: '₹ 500' },
    { srNo: 5, material: 'Solar panel', quantity: '12 pieces', cost: '₹ 500' },
  ];


  const totalCost = data.reduce((acc, item) => acc + parseInt(item.cost.replace('₹', '').replace(' ', '')), 0);

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
  
  return (
    <SafeAreaView style={styles.PageContainer}>
       <ScrollView>
        {/* Header With logo and menu  */}
            <Customerpageheader/>

        {/* page container */}
           <TouchableOpacity style={{ width: "100%", height: 40, overflow: "hidden", alignSelf: "center" }}>
                  <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }} >               
                       <Text style={{ fontSize: 19.1, color: "#000", fontWeight: "bold" }}>Actual Use Material</Text>
                  </LinearGradient>
           </TouchableOpacity>

                 <Pressable style={{ borderBottomWidth: 0.3, borderColor: '#343341'}}>
                    <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.3, borderColor: '#343341',}}>
                      <View style={{ width:"50%", borderRightWidth: 0.3,borderColor: '#343341', }}> 
                        <Text style={{ fontSize: 16, color: "#000000",padding: 10, fontWeight:"bold",paddingLeft:13 }}>Date</Text>
                      </View>
                      <View style={{ width:"50%"}}>
                        <View  style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="calendar-outline" size={25} color="#000000" style={{ paddingLeft: 10,textShadowColor: 'black',    textShadowOffset: { width: 1, height: 1 },  textShadowRadius: 1, }} />
                        <Text style={{ fontSize: 16, color: "#000000",padding:10   }}>01/07/2025</Text>
                        </View>
                      </View>
                    </View>

                    <View  style={{ flexDirection: 'row', width: '100%',}}>
                      <View style={{ width:"50%", borderRightWidth: 0.3,borderColor: '#343341',}}> 
                        <Text style={{ fontSize: 16, color: "#000000",padding: 10, fontWeight:"bold",paddingLeft:13}}>Engineer name </Text>
                      </View>
                      <View style={{ width:"50%",}}>
                        <Text style={{ fontSize: 16, color: "#000000",padding: 10   }}>Chetan Kale</Text>
                      </View>
                    </View>
                  </Pressable>


                        {/* table */}


                   <View style={{ width: '100%', alignItems: 'center'}}>
         
                     {/* table heading */}
                     <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',backgroundColor:'#f2be25',marginTop:20, }} >
                       <View style={{ width: '20%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 8 }}>
                         <Text style={{ fontSize: 17, fontWeight:'bold', color: "#000000" }}> Sr.No</Text>
                       </View>
                       <View style={{ width: '34%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 8 }}>
                         <Text style={{ fontSize: 17, color: "#000000",fontWeight:'bold',  }}>Material List</Text>
                       </View>
                       <View style={{ width: '23%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 8 }}>
                         <Text style={{ fontSize: 17, color: "#000000",fontWeight:'bold',  }}>Quantity</Text>
                       </View>
                       <View style={{ width: '23%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 8 }}>
                         <Text style={{ fontSize: 17, color: "#000000",fontWeight:'bold',  }}>Cost</Text>
                       </View>
                     </View> 
         
                      {/* Table Content */}
                      {data.map((item, index) => {
                        const isEvenRow = index % 2 === 0;
                        return (<View key={item.srNo} style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',
                              backgroundColor: isEvenRow ? '#fff' : '#e7e7e7',}}>
                            <View style={{ width: '20%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 10 }}>
                              <Text style={{ fontSize: 16, color: "#000000" }}>{item.srNo}</Text>
                            </View>
                            <View style={{ width: '34%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 10 }}>
                              <Text style={{ fontSize: 16, color: "#000000" }}>{item.material}</Text>
                            </View>
                            <View style={{ width: '23%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 10 }}>
                              <Text style={{ fontSize: 16, color: "#000000" }}>{item.quantity}</Text>
                            </View>
                            <View style={{ width: '23%', alignItems: 'center', borderRightWidth: 0.3, borderColor: '#343341', paddingVertical: 10, justifyContent: "space-around", flexDirection: 'row' }}>
                              {/* Uncomment if you want to display MaterialIcon */}
                              {/* <MaterialIcons name="currency-rupee" size={20} color="#000000" /> */}
                              <Text style={{ fontSize: 16, color: "#000000" }}>{item.cost}</Text>
                            </View>
                          </View>
                        );
                      })}

                      {/* Total Row */}
                      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', backgroundColor: '#e7e7e7', paddingVertical: 10, paddingRight: 20, gap: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: "700", color: "#000000" }}>Total:</Text>
                        <Text style={{ fontSize: 16, fontWeight: "700", color: "#000000" }}>₹ {totalCost}</Text>
                      </View>

                    </View>
               </ScrollView>
                <Pressable style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", elevation: 3 }}>
                    <TouchableOpacity style={{ width: "90%", height: 50, backgroundColor: "#f2be25", borderRadius: 6, justifyContent: "center", alignItems: "center" }} >
                      <View style={{flexDirection: 'row', gap:10}}>
                      {/* <Entypo name="plus" size={25} color="white" style={{backgroundColor:"#f01a05", borderRadius:25}} /> */}
                      <Text style={{ fontSize: 15, fontWeight: "700", color: "#000000", alignSelf:"center" }}>Submit</Text>
                      </View> 
                    </TouchableOpacity>
                </Pressable>

              {/*Modal */}          
 
            <Modal visible={StartVisible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
                <Pressable style={{ width: "90%", height: 100, alignSelf: "center", display: "flex", flexDirection: "row" }}>
                  <View style={{ width: "80%", height: "100%", justifyContent: "center", }}>
                    <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "bold" }}>Add  Required Material</Text>
                    </View>
                    <TouchableOpacity onPress={() => hideStartModal()} style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ fontSize: 33, color: "#000", fontWeight: "400" }}>x</Text>
                    </TouchableOpacity>
                </Pressable>

                <View style={{ width: "90%", alignSelf: "center" }}>
                  <TextInput style={styles.Input}
                    placeholder='Material  name' placeholderTextColor='#000' value={materialName} 
                    onChangeText={setMaterialName} />
                      <TextInput style={styles.Input}
                    placeholder='Material Quantity' placeholderTextColor='#000'  value={materialQuantity}
                    onChangeText={setMaterialQuantity} />
                    <TextInput style={styles.Input}
                    placeholder='Unit' placeholderTextColor='#000' value={unit}
                    onChangeText={setUnit}  />
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

export default ActualUsed
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" }
})