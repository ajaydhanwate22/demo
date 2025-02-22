import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';



const Quotationpaymentloan = ({ navigation } ) => {
  

  const [solarProjectCost, setSolarProjectCost] = useState('');
  const [paymentAfterMaterial, setPaymentAfterMaterial] = useState('');
  const [paymentAfterInverter, setPaymentAfterInverter] = useState('');
  const [remainingAmount, setRemainingAmount] = useState('');
  const [loanBillCost, setLoanBillCost] = useState('');
  const [solarPaid, setSolarPaid] = useState('');
  const [bankLoan, setBankLoan] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [year, setYear] = useState('');
  const [monthlyEMI, setMonthlyEMI] = useState('');
  const [yearlyEMI, setYearlyEMI] = useState('');
  const [totalInterest, setTotalInterest] = useState('');
  const [totalRepayment, setTotalRepayment] = useState('');


  const handleSubmit = () => {
    if (!solarProjectCost || !paymentAfterMaterial || !paymentAfterInverter || !remainingAmount ||
        !loanBillCost || !solarPaid || !bankLoan || !interestRate || !year || !monthlyEMI ||
        !yearlyEMI || !totalInterest || !totalRepayment) {
      alert("Please fill all the fields.");
      return;
    }
    console.log("Form Submitted!");
  };
  
  
  return (
    <SafeAreaView style={styles.PageContainer}>
       <ScrollView>
        {/* Header With logo and menu  */}
                                 <Pressable style={{ width: "90%", height: 100, alignSelf: "center", display: "flex", flexDirection: "row",marginTop:-20 }}>
                                     <View style={{ width: "90%", height: "100%", justifyContent: "center", }}>
                                       <Text style={{ fontSize: 19.1, color: "#f01a05", fontWeight: "bold" }}>Payment & Loan Bill</Text>
                                       </View>
                                       <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "10%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                         <Text style={{ fontSize: 33, color: "#000", fontWeight: "400" }}>x</Text>
                                       </TouchableOpacity>
                                   </Pressable>

        {/* page container */}
                  <TouchableOpacity style={{ width: "100%", height: 40, overflow: "hidden", alignSelf: "center",marginTop:-20  }}>
                          <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", borderWidth:1,  }} >               
                              <Text style={{ fontSize: 19.1, color: "#000", fontWeight: "bold" }}>Payment</Text>
                          </LinearGradient>
                  </TouchableOpacity>

                 <Pressable style={{ borderBottomWidth: 0.5, borderColor: '#343341',}}>
                    <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.3, borderColor: '#343341', backgroundColor:'#e7e7e7' }}>
                      <View style={{ width:"70%", borderRightWidth: 0.3,borderColor: '#343341', }}> 
                        <Text style={{ fontSize: 14, color: "#000000",padding: 10 }}>Solar Project Cost</Text>
                      </View>
                      <View style={{ width:"30%"}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center',paddingLeft:10}}>
                        <Text style={{ fontSize: 14, color: "#000000" }}>₹</Text>
                        <TextInput style={{ fontSize: 14, color: "#000000",flex:1  }} keyboardType="numeric" value={solarProjectCost} onChangeText={setSolarProjectCost}/>
                        </View>
                      </View>
                    </View>

                    <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.3, borderColor: '#343341',}}>
                      <View style={{ width:"70%", borderRightWidth: 0.5,borderColor: '#343341',}}> 
                        <Text style={{ fontSize: 14, color: "#000000",padding: 10,}}>60% Amount After Delivered Installation Material  (10 to 15 Days)</Text>
                      </View>
                      <View style={{ width:"30%",paddingLeft:10}}>
                      <TextInput style={{ fontSize: 14, color: "#000000",flex:1  }} value={paymentAfterMaterial} onChangeText={setPaymentAfterMaterial}/>
                      </View>
                    </View>

                    <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.3, borderColor: '#343341', backgroundColor:'#e7e7e7' }}>
                      <View style={{ width:"70%", borderRightWidth: 0.3,borderColor: '#343341', }}> 
                        <Text style={{ fontSize: 14, color: "#000000",padding: 10 }}>35% Amount After Delivered Solar module & Ongrid smart Inverter</Text>
                      </View>
                      <View style={{ width:"30%",paddingLeft:10}}>
                      <TextInput style={{ fontSize: 14, color: "#000000",flex:1  }} value={paymentAfterInverter} onChangeText={setPaymentAfterInverter}/>
                      </View>
                    </View>

                    <View  style={{ flexDirection: 'row', width: '100%',}}>
                      <View style={{ width:"70%", borderRightWidth: 0.3,borderColor: '#343341',}}> 
                        <Text style={{ fontSize: 14, color: "#000000",padding: 10,}}>Remaining Amount Of 5% Should be Paid  before Installtion of NetMeter</Text>
                      </View>
                      <View style={{ width:"30%",paddingLeft:10}}>
                      <TextInput style={{ fontSize: 14, color: "#000000",flex:1}} value={remainingAmount} onChangeText={setRemainingAmount}/>
                      </View>
                    </View>
                  </Pressable>


                  <TouchableOpacity style={{ width: "100%", height: 40, overflow: "hidden", alignSelf: "center", marginTop:20  }}>
                  <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", borderWidth:1,  }} >               
                       <Text style={{ fontSize: 19.1, color: "#000", fontWeight: "bold" }}>Loan Bill</Text>
                  </LinearGradient>
           </TouchableOpacity>

           <Pressable style={{ borderBottomWidth: 0.3, borderColor: '#343341',}}>
                    <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.3, borderColor: '#343341', backgroundColor:'#e7e7e7' }}>
                      <View style={{ width:"70%", borderRightWidth: 0.3,borderColor: '#343341', }}> 
                        <Text style={{ fontSize: 14, color: "#000000",padding: 10 }}>Solar Project Cost</Text>
                      </View>
                      <View style={{ width:"30%"}}>
                      <View style={{ flexDirection: 'row', alignItems: 'center',paddingLeft:10, }}>
                        <Text style={{ fontSize: 14, color: "#000000" }}>₹</Text>
                        <TextInput style={{ fontSize: 14, color: "#000000",flex:1 }} keyboardType="numeric" value={loanBillCost} onChangeText={setLoanBillCost}/>
                        </View>
                      </View>
                    </View>

                    <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.3, borderColor: '#343341',}}>
                      <View style={{ width:"70%", borderRightWidth: 0.5,borderColor: '#343341',}}> 
                        <Text style={{ fontSize: 14, color: "#000000",padding: 10,}}>Solar Paid 30%</Text>
                      </View>
                      <View style={{ width:"30%",paddingLeft:10}}>
                      <TextInput style={{ fontSize: 14, color: "#000000",flex:1  }} value={solarPaid} onChangeText={setSolarPaid} />
                      </View>
                    </View>

                    <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.3, borderColor: '#343341', backgroundColor:'#e7e7e7' }}>
                      <View style={{ width:"70%", borderRightWidth: 0.3,borderColor: '#343341', }}> 
                        <Text style={{ fontSize: 14, color: "#000000",padding: 10 }}>Bank Loan 70% </Text>
                      </View>
                      <View style={{ width:"30%",paddingLeft:10}}>
                      <TextInput style={{ fontSize: 14, color: "#000000",flex:1  }} value={bankLoan} onChangeText={setBankLoan} />
                      </View>
                    </View>

                    <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.3, borderColor: '#343341', }}>
                      <View style={{ width:"70%", borderRightWidth: 0.3,borderColor: '#343341',}}> 
                        <Text style={{ fontSize: 14, color: "#000000",padding: 10,}}>Bank Intrest Rate</Text>
                      </View>
                      <View style={{ width:"30%",paddingLeft:10}}>
                      <TextInput style={{ fontSize: 14, color: "#000000",flex:1  }} value={interestRate} onChangeText={setInterestRate}/>
                      </View>
                    </View>

                    <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.3,backgroundColor:'#e7e7e7' }}>
                      <View style={{ width:"70%", borderRightWidth: 0.3,borderColor: '#343341', }}> 
                        <Text style={{ fontSize: 14, color: "#000000",padding: 10 }}>Year</Text>
                      </View>
                      <View style={{ width:"30%",paddingLeft:10}}>
                      <TextInput style={{ fontSize: 14, color: "#000000",flex:1  }} value={year} onChangeText={setYear}/>
                      </View>
                    </View>

                    <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.5}}>
                      <View style={{ width:"70%", borderRightWidth: 0.3,borderColor: '#343341', }}> 
                        <Text style={{ fontSize: 14, color: "#000000",padding: 10 }}>Monthly EMI</Text>
                      </View>
                      <View style={{ width:"30%",paddingLeft:10}}>
                      <TextInput style={{ fontSize: 14, color: "#000000",flex:1  }} value={monthlyEMI} onChangeText={setMonthlyEMI}/>
                      </View>
                    </View>

                    <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.3,backgroundColor:'#e7e7e7' }}>
                      <View style={{ width:"70%", borderRightWidth: 0.3,borderColor: '#343341', }}> 
                        <Text style={{ fontSize: 14, color: "#000000",padding: 10 }}>Yearly EMI</Text>
                      </View>
                      <View style={{ width:"30%",paddingLeft:10}}>
                      <TextInput style={{ fontSize: 14, color: "#000000",flex:1  }} value={yearlyEMI} onChangeText={setYearlyEMI}/>
                      </View>
                    </View>

                    <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.3 }}>
                      <View style={{ width:"70%", borderRightWidth: 0.3,borderColor: '#343341', }}> 
                        <Text style={{ fontSize: 14, color: "#000000",padding: 10 }}>Total Intrest</Text>
                      </View>
                      <View style={{ width:"30%",paddingLeft:10}}>
                      <TextInput style={{ fontSize: 14, color: "#000000",flex:1  }} value={totalInterest} onChangeText={setTotalInterest}/>
                      </View>
                    </View>

                    <View  style={{ flexDirection: 'row', width: '100%',borderBottomWidth: 0.3,backgroundColor:'#e7e7e7' }}>
                      <View style={{ width:"70%", borderRightWidth: 0.3,borderColor: '#343341', }}> 
                        <Text style={{ fontSize: 14, color: "#000000",padding: 10 }}>Total Repayment</Text>
                      </View>
                      <View style={{ width:"30%",paddingLeft:10}}>
                      <TextInput style={{ fontSize: 14, color: "#000000",flex:1  }} value={totalRepayment} onChangeText={setTotalRepayment}/>
                      </View>
                    </View>

                  </Pressable>
               </ScrollView>
                <Pressable style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", elevation: 3 }}>
                    <TouchableOpacity style={{ width: "90%", height: 50, backgroundColor: "#f2be25", borderRadius: 6, justifyContent: "center", alignItems: "center" }} onPress={handleSubmit} >
                      <View style={{flexDirection: 'row', gap:10}}>
                      {/* <Entypo name="plus" size={25} color="white" style={{backgroundColor:"#f01a05", borderRadius:25}} /> */}
                      <Text style={{ fontSize: 15, fontWeight: "700", color: "#000000", alignSelf:"center" }}>Submit</Text>
                      </View> 
                    </TouchableOpacity>
                </Pressable>
      </SafeAreaView>
  )
}

export default Quotationpaymentloan
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" }
})