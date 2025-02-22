import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList  } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


const QuotationGSTupdate = () => {

    const navigation = useNavigation();

    const [Solarplantcost1, setSolarplantcost1]= useState ('');
    const [GSTAmount1, setGSTAmount1]= useState ('');
    const [WithGSTTotalCost1, setWithGSTTotalCost1]= useState ('');
    const [PerWattRate1, setPerWattRate1]= useState ('');
    const [SolarPlantCost2, setSolarPlantCost2]= useState ('');
    const [GSTAmount2, setGSTAmount2]= useState ('');
    const [WithGSTTotalCost2, setWithGSTTotalCost2]= useState ('');
    const [PerWattRate2, setPerWattRate2]= useState ('');

    const handleSubmitGst = () => {
      if (Solarplantcost1 && GSTAmount1 && WithGSTTotalCost1 && PerWattRate1 && SolarPlantCost2 && GSTAmount2 && WithGSTTotalCost2 &&PerWattRate2) {  
          setSolarplantcost1('');
          setGSTAmount1('');
          setWithGSTTotalCost1('');
          setPerWattRate1 ('');
          setSolarPlantCost2 ('');
          setGSTAmount2 ('');
          setWithGSTTotalCost2 ('');
          setPerWattRate2 ('');
      } else {
        alert('Please fill in all the fields.');
      }
    };
  
  return (
    <SafeAreaView style={styles.PageContainer}>
       <ScrollView>

             <Pressable  style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
                 <Pressable style={{justifyContent:"space-between",flexDirection:'row', padding:20,}}>
                     <View style={{justifyContent: "center",alignItems:"center" }}>
                        <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "bold", textAlign:"center" }}>Quotation & GST Update</Text>
                    </View>
                    <TouchableOpacity  onPress={() => navigation.goBack()}  style={{ justifyContent:"center",alignItems: "center" }}>
                              <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                      </TouchableOpacity>
                  </Pressable>

                <View style={{ width: "90%", alignSelf: "center" }}>
                  <TextInput style={styles.Input}
                    placeholder='Solar plant cost 1' placeholderTextColor='#000' value={Solarplantcost1} 
                    onChangeText={setSolarplantcost1} />
                      <TextInput style={styles.Input}
                    placeholder='13.8% GST Amount 1' placeholderTextColor='#000'  value={GSTAmount1}
                    onChangeText={setGSTAmount1} />
                    <TextInput style={styles.Input}
                    placeholder='With GST Total Cost 1' placeholderTextColor='#000' value={WithGSTTotalCost1}
                    onChangeText={setWithGSTTotalCost1} />
                    <TextInput style={styles.Input}
                    placeholder='Per Watt Rate 1' placeholderTextColor='#000' value={PerWattRate1}
                    onChangeText={setPerWattRate1}  />
                    <TextInput style={styles.Input}
                    placeholder='Solar Plant Cost 2' placeholderTextColor='#000' value={SolarPlantCost2}
                    onChangeText={setSolarPlantCost2}  />
                                          <TextInput style={styles.Input}
                    placeholder='13.8% GST Amount 2' placeholderTextColor='#000'  value={GSTAmount2}
                    onChangeText={setGSTAmount2} />
                    <TextInput style={styles.Input}
                    placeholder='With GST Total Cost 2' placeholderTextColor='#000' value={WithGSTTotalCost2}
                    onChangeText={setWithGSTTotalCost2}  />
                    <TextInput style={styles.Input}
                    placeholder='Per Watt Rate 2' placeholderTextColor='#000' value={PerWattRate2}
                    onChangeText={setPerWattRate2}  />
                  <View style={{ width: "100%", height: 45, alignSelf: "flex-end", marginTop: 100 }}>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmitGst} >
                      <Text style={{ color: "#000", fontWeight: "700", fontSize: 14 }}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
             </Pressable>
        </ScrollView>
      </SafeAreaView>
  )
}

export default QuotationGSTupdate
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" }
})