import { StyleSheet, View, Text,Pressable, TouchableOpacity,ScrollView ,SafeAreaView } from 'react-native'
import React  from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Customerpageheader from '../reusablescreens/Customerpageheader';
import Activescreen from '../reusablescreens/Activescreen';

const BillHome = ({ navigation } ) => {
  
  return (
            <>
          <SafeAreaView style={styles.PageContainer}>
            <ScrollView>
              <Customerpageheader/>
                <Activescreen/>
                    <TouchableOpacity style={{ width: "100%", height: 40, overflow: "hidden", alignSelf: "center", marginTop:10 }}>
                        <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }} >
                            <Text style={{ fontSize: 19.1, color: "#000", fontWeight: "bold" }}>Convert Quotation Into Bill</Text>
                        </LinearGradient>
                </TouchableOpacity>

                                    <View style={{paddingHorizontal:20, marginTop:20}}>                
                                        <TouchableOpacity style={{borderColor:"black", borderBottomWidth:1, marginTop:10}}  onPress={() => navigation.navigate('Quotation1')}>
                                        <Text style={{fontSize:16, color:"black", fontWeight:"bold"}}>Quotation_1</Text>
                                        <View style={{ marginBottom:10}}> 
                                          <Text style={{fontSize:14, color:"black"}}>Date : 22/12/2024</Text>
                                          <Text style={{fontSize:14, color:"green"}}>Status: active</Text>
                                        </View>
                                        </TouchableOpacity>
                
                                        <TouchableOpacity style={{borderColor:"black", borderBottomWidth:1, marginTop:10}}>
                                        <Text style={{fontSize:16, color:"black", fontWeight:"bold"}}>Quotation_2</Text>
                                        <View style={{ marginBottom:10}}> 
                                          <Text style={{fontSize:14, color:"black"}}>Date : 22/12/2024</Text>
                                          <Text style={{fontSize:14, color:"green"}}>Status: active</Text>
                                        </View>
                                        </TouchableOpacity>
                                    </View>
            </ScrollView>
            </SafeAreaView>
            </>
  )
}

export default BillHome
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
})