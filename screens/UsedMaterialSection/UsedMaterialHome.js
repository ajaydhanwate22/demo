import { StyleSheet, View, Text,Pressable, TouchableOpacity,ScrollView ,SafeAreaView } from 'react-native'
import React  from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Customerpageheader from '../reusablescreens/Customerpageheader';
import Activescreen from '../reusablescreens/Activescreen';

const UsedMaterialHome = ({ navigation } ) => {
  
  return (
            <>
          <SafeAreaView style={styles.PageContainer}>
            <ScrollView>
              <Customerpageheader/>
                <Activescreen/>
            <Pressable style={{ width: "100%", alignSelf: "center", paddingTop: 10 }}>
              
                <TouchableOpacity style={{ width: "100%", height: 40, overflow: "hidden", alignSelf: "center" }}>
                    <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }} >
                        <Text style={{ fontSize: 19.1, color: "#000", fontWeight: "bold" }}>Used Material</Text>
                    </LinearGradient>
                </TouchableOpacity>

            <Pressable style={{ width: "90%", alignSelf: "center", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 30, flexWrap: "wrap" }}>
            <TouchableOpacity onPress={() => navigation.navigate('RequiredMaterial')}  style={{ width: "48%", height: 100 }}>
                <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Required</Text>
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Material</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate('ApproveMaterial')}   style={{ width: "48%", height: 100 }}>
                <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Approved</Text>
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Material  </Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PurchaseMaterial')} style={{ width: "48%", height: 100,marginTop:10 }}>
                <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Purchsed</Text>
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Material  </Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('UsedCheck')} style={{ width: "48%", height: 100,marginTop:10 }}>
                <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Use Check</Text>
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Material  </Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ReturnMaterial')} style={{ width: "48%", height: 100 ,marginTop:10}}>
                <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Return </Text>
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Material  </Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity   onPress={() => navigation.navigate('ActualUsed')}  style={{ width: "48%", height: 100,marginTop:10 }}>
                <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Actual Use </Text>
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Material  </Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity   onPress={() => navigation.navigate('TeaCoffeeBill')}  style={{ width: "48%", height: 100,marginTop:10 }}>
                <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Tea Coffee</Text>
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Screen </Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity   onPress={() => navigation.navigate('ApproveTeaCoffeBill')}  style={{ width: "48%", height: 100,marginTop:10 }}>
                <LinearGradient colors={['#ffde59', '#ff914d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Approved Tea Coffee</Text>
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "600" }}>Screen </Text>
                </LinearGradient>
            </TouchableOpacity>
          </Pressable>

          </Pressable>
        </ScrollView>

            <Pressable style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", elevation: 3 }}>
              <TouchableOpacity style={{ width: "80%", height: 40, backgroundColor: "#f2be25", borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ fontSize: 15, fontWeight: "700", color: "#000" }}>Closing Balance :  Rs. 520000/-</Text>
                </TouchableOpacity>
            </Pressable>

      </SafeAreaView>
            </>
  )
}

export default UsedMaterialHome
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
})