import { StyleSheet, View, Text,Pressable, TouchableOpacity,ScrollView ,SafeAreaView } from 'react-native'
import React  from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Customerpageheader from '../reusablescreens/Customerpageheader';
import Activescreen from '../reusablescreens/Activescreen';

const LedgerHome = ({ navigation } ) => {
  
  return (
            <>
          <SafeAreaView style={styles.PageContainer}>
            <ScrollView>
              <Customerpageheader/>
                <Activescreen/>
            </ScrollView>
            </SafeAreaView>
            </>
  )
}

export default LedgerHome
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
})