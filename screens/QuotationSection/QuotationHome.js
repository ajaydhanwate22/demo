import { StyleSheet, View, Text, TextInput, Modal, TouchableOpacity, Pressable, ScrollView, SafeAreaView } from 'react-native';
import React,{ useState }  from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Customerpageheader from '../reusablescreens/Customerpageheader'
import Activescreen from '../reusablescreens/Activescreen'

const QuotationHome = ({ navigation } ) => {
  
  return (
            <>
          <SafeAreaView style={styles.PageContainer}>
            <ScrollView>
                <Customerpageheader/>
                <Activescreen/>
              <Pressable style={{ width: "100%", alignSelf: "center", paddingTop: 10 }}>

                <TouchableOpacity style={{ width: "100%", height: 40, overflow: "hidden", alignSelf: "center" }}>
                    <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }} >
                        <Text style={{ fontSize: 19.1, color: "#000", fontWeight: "bold" }}>Add Customer Quotation Details</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Pressable style={{ width: "90%", alignSelf: "center", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 30, flexWrap: "wrap" }}>
                    <TouchableOpacity onPress={() => navigation.navigate('GeneralDeatilled')}  style={{ width: "48%", height: 100 }}>
                        <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>General</Text>
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Details</Text>
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Update</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => navigation.navigate('MonthlyBillUpdate')}   style={{ width: "48%", height: 100 }}>
                        <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Monthly</Text>
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Bill</Text>
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Updates</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('AboutSolarPlant')}  style={{ width: "48%", height: 100,marginTop:10 }}>
                        <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>About Solar</Text>
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Power Plant</Text>
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Details</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('QuotationGSTupdate')}   style={{ width: "48%", height: 100,marginTop:10 }}>
                        <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Quotation</Text>
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>& GST</Text>
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Update</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('DetailedInfoAbout')} style={{ width: "48%", height: 100,marginTop:10 }}>
                        <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Detailed Info</Text>
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>About Materials</Text>
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Supplied</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Quotationpaymentloan')} style={{ width: "48%", height: 100,marginTop:10 }}>
                        <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Payment</Text>
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>& Loan</Text>
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Bill</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
          </ScrollView>
  
            <Pressable style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", elevation: 3 }}>
                <TouchableOpacity style={{ width: "80%", height: 40, backgroundColor: "#f2be25", borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "700", color: "#000" }}>Generate Quotation</Text>
                </TouchableOpacity>
            </Pressable>
          </SafeAreaView>
          </>
  )
}

export default QuotationHome
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
})