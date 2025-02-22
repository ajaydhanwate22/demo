import { StyleSheet, View, Text,Pressable, TouchableOpacity,ScrollView ,SafeAreaView , Modal, TextInput} from 'react-native'
import React, {useState}  from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Customerpageheader from '../reusablescreens/Customerpageheader';
import Activescreen from '../reusablescreens/Activescreen';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';



const VisitHome = ({ navigation } ) => {

    const [StartVisible, setStartVisible] = useState(false);
      const [dateandtime, setDateandtime] = useState('');
      const [location, setlocation] = useState('');
      const [Visiworking, setVisiworking] = useState('');
      const [photo, setphoto] = useState('');
  
    const showStartModal = () => setStartVisible(true);
    const hideStartModal = () => setStartVisible(false);
  
    const handleSubmit = () => {
      if (dateandtime && location && Visiworking && photo) {  
        setDateandtime('');
        setlocation('');
        setVisiworking('');
        photo('');
        hideStartModal(); 
      } else {
        alert('Please fill in all the fields.');
      }
    };
    
  
  return (
            <>
          <SafeAreaView style={styles.PageContainer}>
            <ScrollView>
              <Customerpageheader/>
                <Activescreen/>                
                  <TouchableOpacity style={{ width: "100%", height: 40, overflow: "hidden", alignSelf: "center", marginTop:10 }}>
                          <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }} >
                              <Text style={{ fontSize: 19.1, color: "#000", fontWeight: "bold" }}>Visit</Text>
                          </LinearGradient>
                    </TouchableOpacity>

                    <View style={{paddingHorizontal:30}}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',gap:15, marginTop:20,marginBottom:10}} >  
                          <TouchableOpacity style={{}} onPress={showStartModal}>
                          <Entypo name="plus" size={22} color="#f01a05" style={{backgroundColor:"#f2be25", borderRadius:25}} />
                          </TouchableOpacity>
                            <Text style={{ fontSize: 16,  color: "#000000", justifyContent:"center", textAlign:"center"}}>Add Visit</Text>
                        </View>

                        <View style={{borderColor:"black", borderBottomWidth:1, marginTop:10,gap:2}}>
                        <Text style={{fontSize:14, color:"black"}}>Panel Testing</Text>
                        <View style={{flexDirection:"row", paddingRight:20, justifyContent:"space-between", marginBottom:10}}> 
                          <Text style={{fontSize:12, color:"#f01a05"}}>Date : 22/12/2024</Text>
                          <Text style={{fontSize:12, color:"#f01a05"}}>Time: 12:30 PM</Text>
                        </View>
                        </View>

                        <View style={{borderColor:"black", borderBottomWidth:1, marginTop:10,gap:2}}>
                        <Text style={{fontSize:14, color:"black"}}>Panel Testing</Text>
                        <View style={{flexDirection:"row", paddingRight:20, justifyContent:"space-between", marginBottom:10}}> 
                          <Text style={{fontSize:12, color:"#f01a05"}}>Date : 22/12/2024</Text>
                          <Text style={{fontSize:12, color:"#f01a05"}}>Time: 12:30 PM</Text>
                        </View>
                        </View>

                        <View style={{borderColor:"black", borderBottomWidth:1, marginTop:10,gap:2}}>
                        <Text style={{fontSize:14, color:"black"}}>Panel Testing</Text>
                        <View style={{flexDirection:"row", paddingRight:20, justifyContent:"space-between", marginBottom:10}}> 
                          <Text style={{fontSize:12, color:"#f01a05"}}>Date : 22/12/2024</Text>
                          <Text style={{fontSize:12, color:"#f01a05"}}>Time: 12:30 PM</Text>
                        </View>
                        </View>
                    </View>


                        {/* modal */}
                                <Modal visible={StartVisible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
                                    <Pressable style={{justifyContent:"space-between",flexDirection:'row', padding:20,}}>
                                    <View style={{justifyContent: "center",alignItems:"center" }}>
                                        <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "bold", textAlign:"center" }}>Add Visit</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => hideStartModal()} style={{ justifyContent:"center",alignItems: "center" }}>
                                        <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                                    </TouchableOpacity>
                                    </Pressable>
                    
                                    <View style={{ width: "90%", alignSelf: "center" }}>
                                      <TextInput style={styles.Input}
                                        placeholder='Date & Time' placeholderTextColor='#000' value={dateandtime} 
                                        onChangeText={setDateandtime} />
                                          <TextInput style={styles.Input}
                                        placeholder='Take Location' placeholderTextColor='#000'  value={location}
                                        onChangeText={setlocation} />
                                        <TextInput style={styles.Input}
                                        placeholder='Visit Working' placeholderTextColor='#000' value={Visiworking}
                                        onChangeText={setVisiworking}  />
                                          <TextInput style={styles.Input}
                                          placeholder='Take Photo Or Upload Photo' placeholderTextColor='#000' value={photo}
                                          onChangeText={setphoto}  />
                                      <View style={{ width: "100%", height: 45, alignSelf: "flex-end", marginTop: 100 }}>
                                        <TouchableOpacity style={styles.btn} onPress={handleSubmit} >
                                          <Text style={{ color: "#000", fontWeight: "700", fontSize: 14 }}>Submit</Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                 </Modal>


            </ScrollView>
                        <Pressable style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", elevation: 3 }}>
                            <TouchableOpacity style={{ width: "80%", height: 40, backgroundColor: "#f2be25", borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 15, fontWeight: "700", color: "#000" }}>Visit Report</Text>
                            </TouchableOpacity>
                        </Pressable>
            </SafeAreaView>
            </>
  )
}

export default VisitHome
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
})