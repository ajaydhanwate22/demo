import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList  } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


const MonthlyBillUpdate = ({ navigation } ) => {

  const data = [
    { srNo: 1, billMonth: 'January', totalUnit: '', billAmount: '' },
    { srNo: 2, billMonth: 'February', totalUnit: '', billAmount: '' },
    { srNo: 3, billMonth: 'March', totalUnit: '', billAmount: '' },
    { srNo: 4, billMonth: 'April', totalUnit: '', billAmount: '' },
    { srNo: 5, billMonth: 'May', totalUnit: '', billAmount: '' },
    { srNo: 6, billMonth: 'June', totalUnit: '', billAmount: '' },
    { srNo: 7, billMonth: 'July', totalUnit: '', billAmount: '' },
    { srNo: 8, billMonth: 'August', totalUnit: '', billAmount: '' },
    { srNo: 9, billMonth: 'September', totalUnit: '', billAmount: '' },
    { srNo: 10, billMonth: 'October', totalUnit: '', billAmount: '' },
    { srNo: 11, billMonth: 'November', totalUnit: '', billAmount: '' },
    { srNo: 12, billMonth: 'December', totalUnit: '', billAmount: '' },
  ];
  

  // to used dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const options = [
    { title: 'MSEB Three Phase Lite Connection 01', screen: '' },
    { title: 'MSEB Three Phase Lite Connection 02', screen: '' },
    { title: 'MSEB Three Phase Lite Connection 03', screen: 'MSEB3phaseConnection' },
  ];
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleSelectItem = (item) => {
    setIsDropdownOpen(false); 
    navigation.navigate(item.screen);
  };


  const [dataState, setDataState] = useState(data); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);  
  const [selectedMonth, setSelectedMonth] = useState("");

  const [unitAndAmount, setUnitAndAmount] = useState(
    dataState.map(row => ({ unit: '', amount: '' }))
  );  

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthSelect = (month) => {
    const updatedData = [...dataState];
    updatedData[selectedRow].billMonth = month; // update the month for the clicked row
    setDataState(updatedData);
    setSelectedMonth(month);
    setModalVisible(false);
  };

  const [extraUnit, setExtraUnit] = useState('');
  const [extraAmount, setExtraAmount] = useState('');


  const [totalUnit, setTotalUnit] = useState(0); // To store total unit
  const [totalAmount, setTotalAmount] = useState(0); // To store total amount
  
  // Function to calculate total unit and total amount
  const calculateTotal = () => {
    let unit = 0;
    let amount = 0;
    
    unitAndAmount.forEach(item => {
      unit += parseFloat(item.unit) || 0;
      amount += parseFloat(item.amount) || 0;
    });
    
    // Add extra unit and amount
    unit += parseFloat(extraUnit) || 0;
    amount += parseFloat(extraAmount) || 0;

    setTotalUnit(unit); // Update state for total unit
    setTotalAmount(amount); // Update state for total amount
  };

  // Call calculateTotal whenever unitAndAmount or extraUnit and extraAmount change
  useEffect(() => {
    calculateTotal();
  }, [unitAndAmount, extraUnit, extraAmount]);



    // Handle Submit
  // Handle Submit
  const handleSubmit = () => {
    const submissionData = dataState.map((row, index) => ({
      srNo: row.srNo,
      billMonth: row.billMonth,
      totalUnit: unitAndAmount[index].unit,
      billAmount: unitAndAmount[index].amount,
    }));

    submissionData.push({
      srNo: 'Extra',
      billMonth: 'Extra',
      totalUnit: extraUnit,
      billAmount: extraAmount,
    });
  
    const totalData = {
      totalUnit: totalUnit.toFixed(0),
      totalAmount: totalAmount.toFixed(2),
    };

    console.log('Submitting the following data:', submissionData, totalData);
  };  
  

  
  return (
    <SafeAreaView style={styles.PageContainer}>
       <ScrollView>

        {/* page container */}
        <View style={{flexDirection:"row", justifyContent:"space-between",padding:5,paddingVertical:8}}>
        <Text style={{ fontSize: 19.1, color: "#f01a05", fontWeight: "bold", alignSelf:"center", justifyContent:"center", paddingLeft:30}}>Monthly Bill Update</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 26, color: "#000", fontWeight: "300", alignSelf:"center",paddingRight:30 }}>X</Text>  
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ width: "100%", height: 45, overflow: "hidden", alignSelf: "center",  borderColor:"#343341",borderTopWidth: 1,borderBottomWidth: 1,   }} onPress={toggleDropdown}>
                  <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", alignItems: "center", gap:10, justifyContent:"flex-start" ,paddingHorizontal:30 }} >  
              <AntDesign name={isDropdownOpen ? "caretdown" : "caretright"} size={20} color="#000000" />             
              <Text style={{ fontSize: 16.1, color: "#000", fontWeight: "bold" }}>MSEB Singal Phase Lite Connection 01</Text>
                  </LinearGradient>
           </TouchableOpacity>

           {isDropdownOpen && (
            <FlatList
            data={options}
            renderItem={({ item ,index  }) => (
            <TouchableOpacity onPress={() => handleSelectItem(item)} style={{paddingVertical: 10,paddingLeft: 60,borderBottomWidth: 1,
            borderBottomColor: '#ddd',backgroundColor: index % 2 === 0 ? 'white' : '#e7e7e7',}}>
            <Text style={{ fontSize: 16, color: '#000' }}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}style={{width: '100%',backgroundColor: 'white', borderRadius: 5,}}
        />
      )}

                        {/* table */}
                    <View style={{ width: '100%', alignItems: 'center',borderWidth: 1, borderColor: '#343341', marginTop:20}}>
          
                      {/* table heading */}
                      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',backgroundColor:'#f2be25',borderBottomWidth: 1,borderColor: '#343341', }} >
                        <View style={{ width: '15%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 5 }}>
                          <Text style={{ fontSize: 17, fontWeight:'bold', color: "#000000" }}> Sr.No</Text>
                        </View>
                        <View style={{ width: '30%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 5 }}>
                          <Text style={{ fontSize: 17, color: "#000000",fontWeight:'bold',  }}>Bill  Month</Text>
                        </View>
                        <View style={{ width: '25%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 5 }}>
                          <Text style={{ fontSize: 17, color: "#000000",fontWeight:'bold',  }}>Total Unit</Text>
                        </View>
                        <View style={{ width: '30%', alignItems: 'center', paddingVertical: 5 }}>
                          <Text style={{ fontSize: 17, color: "#000000",fontWeight:'bold',  }}>Bill Amount</Text>
                        </View>
                      </View> 
          
                      {/* table content */}
                      <FlatList
                       data={dataState}
                        renderItem={({ item, index }) => (
                      <View  style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',backgroundColor: index % 2 === 0 ? '#e7e7e7' : 'white',borderBottomWidth: 1,borderColor: '#343341', }} >
                        <View style={{ width: '15%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                          <Text style={{ fontSize: 16, color: "#000000", textAlign:'center' }}>{item.srNo}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { setModalVisible(true); setSelectedRow(index); }}  style={{ width: '30%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                              <View style={{flexDirection:"row", justifyContent:"center", gap:1}}>
                                      <Text style={{ textAlign: "center", fontSize: 16,color: "#000", fontWeight:'bold'}}>{item.billMonth || 'Select Month'}</Text>
                              </View>
                        </TouchableOpacity>
                        <TextInput style={{fontSize:16,color: "#000000", textAlign:"center", width:'25%', alignItems:'center',  borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10,}}  keyboardType='numeric' value={unitAndAmount[index].unit}       onChangeText={(text) => { const newUnitAndAmount = [...unitAndAmount]; newUnitAndAmount[index].unit = text; setUnitAndAmount(newUnitAndAmount);}}/>
                        <View style={{ width:"30%"}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center',paddingLeft:20, }}>
                          <Text style={{ fontSize: 14, color: "#000000" }}>₹</Text>
                          <TextInput style={{ fontSize: 14, color: "#000000",flex:1,}} keyboardType="numeric"  value={unitAndAmount[index].amount} onChangeText={(text) => { const newUnitAndAmount = [...unitAndAmount]; newUnitAndAmount[index].amount = text;
                        setUnitAndAmount(newUnitAndAmount);
                            }}/>
                          </View>
                        </View>
                      </View>
                      )}keyExtractor={(item, index) => index.toString()} />


                      <View  style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start',backgroundColor:'#e7e7e7',borderBottomWidth: 1,borderColor: '#343341', }} >
                        <View style={{ width: '15%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                          <Text style={{ fontSize: 16, color: "#000000", textAlign:'center' }}>13</Text>
                        </View>
                        <TouchableOpacity  style={{ width: '30%', alignItems: 'center', borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10 }}>
                              <View style={{flexDirection:"row", justifyContent:"center", gap:1}}>
                                      <Text style={{ textAlign: "center", fontSize: 16,color: "#000", fontWeight:'bold'}}>Extra</Text>
                              </View>
                        </TouchableOpacity>
                        <TextInput style={{fontSize:16,color: "#000000", textAlign:"center", width:'25%', alignItems:'center',  borderRightWidth: 1, borderColor: '#343341', paddingVertical: 10,}}  keyboardType='numeric' value={extraUnit}             onChangeText={(text) => setExtraUnit(text)}/>
                        <View style={{ width:"30%"}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center',paddingLeft:20, }}>
                          <Text style={{ fontSize: 14, color: "#000000" }}>₹</Text>
                          <TextInput style={{ fontSize: 14, color: "#000000",flex:1,}} keyboardType="numeric"value={extraAmount}              onChangeText={(text) => setExtraAmount(text)}/>
                          </View>
                        </View>
                      </View>
                      

                      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start' }} >
                        <View style={{ width: '15%', alignItems: 'center',  borderColor: '#343341', paddingVertical: 10 }}>
                          <Text style={{ fontSize: 16, color: "#000000" }}> </Text>
                        </View>
                        <View style={{ width: '30%', alignItems: 'center',  borderColor: '#343341', paddingVertical: 10 }}>
                          <Text style={{ fontSize: 16,  color: "#000000", fontWeight:"bold" }}>Total</Text>
                        </View>
                        <View style={{ width: '25%', alignItems: 'center',  borderColor: '#343341', paddingVertical: 10 }}>
                          <Text style={{ fontSize: 16,  color: "#000000", fontWeight:"bold" }}>{totalUnit.toFixed(0)}</Text>
                        </View>
                        <View style={{ width: '30%', alignItems: 'center',  borderColor: '#343341', paddingVertical: 10,justifyContent:"space-around",flexDirection:'row' }}>
                        <Text style={{ fontSize: 16,  color: "#000000", fontWeight:"bold" }}> ₹ {totalAmount.toFixed(2)}</Text>
                        </View>
                      </View>

                    </View>
              </ScrollView>
                <Pressable style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", elevation: 3 }}>
                    <TouchableOpacity style={{ width: "90%", height: 50, backgroundColor: "#f2be25", borderRadius: 6, justifyContent: "center", alignItems: "center",borderWidth: 1,borderColor: '#343341',  }} onPress={handleSubmit} >
                      <View style={{flexDirection: 'row', gap:10}}>
                      <Text style={{ fontSize: 15, fontWeight: "700", color: "#000000", alignSelf:"center" }}>Submit</Text>
                      </View> 
                    </TouchableOpacity>
                </Pressable>

                
                                        {/* Modal for Month Selection */}
                        <Modal
                          visible={modalVisible}
                          animationType="slide"
                          transparent={true}
                          onRequestClose={() => setModalVisible(false)}
                        >
                          <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                              <Text style={styles.modalTitle}>Select Month</Text>
                              <FlatList
                                data={months}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                  <TouchableOpacity style={styles.monthOption} onPress={() => handleMonthSelect(item)}>
                                    <Text style={styles.monthText}>{item}</Text>
                                  </TouchableOpacity>
                                )}
                              />
                              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButtonText}>Close</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Modal>
      </SafeAreaView>
  )
}

export default MonthlyBillUpdate
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
  modalBackground: {flex: 1,justifyContent: 'center',  alignItems: 'center', backgroundColor:  'rgba(29, 24, 24, 0.5)',},
  modalContainer: {width: '70%',backgroundColor: 'white',borderRadius: 10,padding: 10,
    alignItems: 'center',},
  modalTitle: {fontSize: 18,fontWeight: 'bold', color:'black',marginBottom: 10,},
  monthOption: {padding: 10,marginBottom: 10,backgroundColor: '#f2f2f2', borderRadius: 5, width: '100%',alignItems: 'center',paddingHorizontal:50},
  monthText: {fontSize: 12,color: '#333',},
  closeButton: {padding: 10, backgroundColor: '#f01a05', borderRadius: 5,marginTop: 10,paddingHorizontal:50},
  closeButtonText: {color: '#fff',fontSize: 16, fontWeight: 'bold',},
})