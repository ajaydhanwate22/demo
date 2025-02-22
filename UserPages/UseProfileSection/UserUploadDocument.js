import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput,SafeAreaView, Text,FlatList  } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';


const UserUploadDocument = () => {

    const navigation = useNavigation();

      const [AddharCard, SetAddharCard] = useState('');
      const [Name, Setname] = useState('');
      const [imageUri, setImageUri] = React.useState(null);
      
        const selectImage = () => {
          launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.error('ImagePicker Error: ', response.error);
            } else {
              console.log(response.assets[0].uri);
              setImageUri(response.assets[0].uri); // Set the image URI to state
            }
          });
        };
      
        const handleUpdate = () => {
          if (AddharCard && imageUri)  {  
            SetAddharCard('');
            setImageUri('');
          } else {
            alert('Please fill in all the fields.');
          }
        };
  
  return (
    <SafeAreaView style={styles.PageContainer}>
         <ScrollView>
                 <Pressable style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
                        <Pressable style={{justifyContent:"space-between",flexDirection:'row', padding:20,}}>
                        <TouchableOpacity  onPress={() => navigation.goBack()}  style={{ alignItems: "center" }}>
                                      <Text style={{ fontSize: 26, color: "#000", fontWeight: "400" }}>X</Text>
                        </TouchableOpacity>
                        <Image source={{ uri: 'https://realrate.store/AkshayUrjaSolar/Images/akshyurjalogo.jpeg' }} 
                                style={{ width: 130,  height:50,justifyContent:"center" }}
                                resizeMode="contain"
                              />
                          </Pressable>

                          <View style={{padding:20}}>
                                    <Text style={{ fontSize: 19, color: "#f01a05", fontWeight: "bold",  }}>Upload Document Details as follows:</Text>
                            </View>
        
                            <Pressable style={{ width: "90%", alignSelf: "center", height: 85, display: "flex", flexDirection: "row" }}>
                                <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity onPress={selectImage} style={{ borderWidth: 0.3, borderColor: "#000", justifyContent: "center", alignItems: "center", width: "100%", height: "80%", borderRadius:10}}>
                                    {imageUri != null ? (
                                    <Image
                                        source={{ uri: imageUri }}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                    ) : (
                                    <View style={{ width: "100%", height: "100%", justifyContent: "center", paddingLeft:30,}}>
                                        <Text style={{fontWeight:"bold", color:"black"}}>Pan Card</Text>
                                        <View style={{flexDirection:"row",alignItems: "center", gap:5 }}>
                                      <Text><FontAwesome5 name='cloud-upload-alt' size={20} color='black' /></Text>
                                      <Text style={{justifyContent: "center",color:"black"}}>Upload File</Text>
                                      </View>
                                    </View>
                                    )}

                                </TouchableOpacity>
                                </View>
                            </Pressable>

                            <Pressable style={{ width: "90%", alignSelf: "center", height: 85, display: "flex", flexDirection: "row" }}>
                                <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity onPress={selectImage} style={{ borderWidth: 0.3, borderColor: "#000", justifyContent: "center", alignItems: "center", width: "100%", height: "80%", borderRadius:10}}>
                                    {imageUri != null ? (
                                    <Image
                                        source={{ uri: imageUri }}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                    ) : (
                                    <View style={{ width: "100%", height: "100%", justifyContent: "center", paddingLeft:30,}}>
                                        <Text style={{fontWeight:"bold", color:"black"}}>Addhar Card</Text>
                                        <View style={{flexDirection:"row",alignItems: "center", gap:5 }}>
                                      <Text><FontAwesome5 name='cloud-upload-alt' size={20} color='black' /></Text>
                                      <Text style={{justifyContent: "center",color:"black"}}>Upload File</Text>
                                      </View>
                                    </View>
                                    )}

                                </TouchableOpacity>
                                </View>
                            </Pressable>

                            <Pressable style={{ width: "90%", alignSelf: "center", height: 85, display: "flex", flexDirection: "row" }}>
                                <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity onPress={selectImage} style={{ borderWidth: 0.3, borderColor: "#000", justifyContent: "center", alignItems: "center", width: "100%", height: "80%", borderRadius:10}}>
                                    {imageUri != null ? (
                                    <Image
                                        source={{ uri: imageUri }}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                    ) : (
                                    <View style={{ width: "100%", height: "100%", justifyContent: "center", paddingLeft:30,}}>
                                        <Text style={{fontWeight:"bold", color:"black"}}>Income Poof Card</Text>
                                        <View style={{flexDirection:"row",alignItems: "center", gap:5 }}>
                                      <Text><FontAwesome5 name='cloud-upload-alt' size={20} color='black' /></Text>
                                      <Text style={{justifyContent: "center",color:"black"}}>Upload File</Text>
                                      </View>
                                    </View>
                                    )}

                                </TouchableOpacity>
                                </View>
                            </Pressable>

                            
                            <Pressable style={{ width: "90%", alignSelf: "center", height: 85, display: "flex", flexDirection: "row" }}>
                                <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity onPress={selectImage} style={{ borderWidth: 0.3, borderColor: "#000", justifyContent: "center", alignItems: "center", width: "100%", height: "80%", borderRadius:10}}>
                                    {imageUri != null ? (
                                    <Image
                                        source={{ uri: imageUri }}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                    ) : (
                                    <View style={{ width: "100%", height: "100%", justifyContent: "center", paddingLeft:30,}}>
                                        <Text style={{fontWeight:"bold", color:"black"}}>Last 12 Month Bills</Text>
                                        <View style={{flexDirection:"row",alignItems: "center", gap:5 }}>
                                      <Text><FontAwesome5 name='cloud-upload-alt' size={20} color='black' /></Text>
                                      <Text style={{justifyContent: "center",color:"black"}}>Upload File</Text>
                                      </View>
                                    </View>
                                    )}

                                </TouchableOpacity>
                                </View>
                            </Pressable>
                     </Pressable>
                </ScrollView>
                  <Pressable  style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", elevation: 3 }}>
                        <TouchableOpacity  onPress={() => navigation.navigate('DocumentsDetails')} style={{ width: "90%", height: 50, backgroundColor: "#f2be25", borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                              <Text style={{ fontSize: 15, fontWeight: "700", color: "#000000", alignSelf:"center" }}>Submit</Text>
                        </TouchableOpacity>
                    </Pressable>
            </SafeAreaView>
  )
}

export default UserUploadDocument
const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Input: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" }
})