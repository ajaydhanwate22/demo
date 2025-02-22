import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const ForgotPassword = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.PageContainer}>
            <ScrollView>

                <Pressable style={styles.logoSection}>
                    <View style={styles.logoSectionDiv1}>
                        <Text style={styles.logoSectionDiv1Text}>Akshay</Text>
                        <Text style={styles.logoSectionDiv1Text}>Urja</Text>
                        <Text style={styles.logoSectionDiv1Text}>Solar</Text>
                    </View>
                    <View style={styles.logoSectionDiv2}>
                        <Image
                            source={{ uri: 'https://realrate.store/AkshayUrjaSolar/Images/akshaySolarLogo-removebg-preview.png' }} // Replace with your splash image path
                            style={styles.logo}
                        />
                    </View>

                </Pressable>
                <Pressable style={styles.BannerSection}>
                    <Text style={styles.bannerTitle}>Oh, no !</Text>
                    <Text style={styles.bannerTitle}>I forgot</Text>
                    <Text style={styles.bannerText}>Enter your email, phone, or username and we'll send you a link to change a new password</Text>
                </Pressable>

                <Pressable style={styles.AuthFormGroup}>
                    <TextInput placeholder='Email ' placeholderTextColor={"#c1c1c1"} style={styles.AuthFormGroupInput} />
                </Pressable>
                <TouchableOpacity style={styles.signinBtn}>
                    <Text style={{ color: "#f2be25", fontSize: 15, fontWeight: "700" }}>Forgot Password </Text>
                </TouchableOpacity>

                <Pressable style={{ width: "90%", alignSelf: "center", justifyContent: "center", height: 50, borderWidth: 1, display: "flex", flexDirection: "row", alignItems: "center", marginTop: 100 }}>
                    <Text style={{ fontSize: 12, color: "#c1c1c1", fontWeight: "600" }}>Don't have an account ?  </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={{ fontSize: 15, color: "#f2be25", fontWeight: "700" }}>Sign Up</Text>
                    </TouchableOpacity>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    PageContainer: { backgroundColor: "#fff", height: "100%" },
    logoSection: { width: "90%", alignSelf: "center", height: 80, display: "flex", flexDirection: "row"},
    logoSectionDiv1: { width: "80%", justifyContent: "center", alignItems: "flex-end" },
    logoSectionDiv2: { width: "20%", justifyContent: "center", alignItems: "center", height: "100%" },
    logoSectionDiv1Text: { fontSize: 14.4, color: "#f01a05", fontWeight: "700" },
    logo: { width: "100%", height: "100%", marginTop: 15 },
    BannerSection: { width: "90%", alignSelf: "center", marginBottom: 50 },
    bannerTitle: { fontSize: 55, color: "#343341", fontWeight: "700" },
    bannerText: { color: "#c1c1c1", fontSize: 12, fontWeight: "500", width: "80%" },
    AuthFormGroup: { width: "90%", alignSelf: "center", height: 60 },
    AuthFormGroupInput: { backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#f2be25", height: "100%" },
    AuthFormLinks: { width: "90%", alignSelf: "center", height: 50, display: "flex", flexDirection: "row" },
    AuthFormLinksDiv1: { width: "50%", height: "100%", justifyContent: "center" },
    AuthFormLinksDiv2: { width: "50%", height: "100%", justifyContent: "center", alignItems: "flex-end" },
    AuthFormLinksDiv2Text: { fontSize: 12, color: "#c1c1c1", fontWeight: "500" },
    signinBtn: { backgroundColor: "#343341", width: "90%", alignSelf: "center", height: 50, justifyContent: "center", alignItems: "center", marginTop: 20 },
})