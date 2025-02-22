import { StyleSheet, View, ScrollView, Pressable, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, Modal, Animated, Easing } from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, Button, Searchbar } from 'react-native-paper'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Pdf from 'react-native-pdf';
import { Dimensions } from 'react-native'; // Import Dimensions
import Share from 'react-native-share'; // To share the PDF
import RNFS from 'react-native-fs';


const EmployeesPayLedger = ({ navigation }) => {

    const { width, height } = Dimensions.get('window'); // Get device width and height

    const [EmployeesLedger, setEmployeesLedger] = useState([]);
    const [filteredEmployeeLedger, setFilteredEmployeeLedger] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [loading, setLoading] = useState(false);
    const EmployeesLedgerFetch = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://realrate.store/AkshayUrjaSolar/Employees_Pay_Ledger_Fetch_Api.php`);
            // Ensure response data is an array
            const fetchedDailyTask = Array.isArray(response.data) ? response.data : [];
            // console.log(fetchedDailyTask);
            setEmployeesLedger(fetchedDailyTask);

        } catch (error) {
            console.error('Error fetching Daily Working List :', error);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        EmployeesLedgerFetch(); // Assuming fetchProducts is defined and accepts city as a parameter
    }, []);

    useFocusEffect(
        useCallback(() => {
            // Call functions or refresh data when this screen is focused
            EmployeesLedgerFetch();
        }, [])
    );

    //  Filter transactions based on the selected filter
    useEffect(() => {
        if (EmployeesLedger && Array.isArray(EmployeesLedger)) {
            const filtered = EmployeesLedger.filter(EmployeesLedger => EmployeesLedger.emp_name.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredEmployeeLedger(filtered);
        }
    }, [searchQuery, EmployeesLedger]);



    const formatDates = (dateString) => {
        const date = new Date(dateString);
        const day = (`0${date.getDate()}`).slice(-2); // Ensure two digits
        const month = (`0${date.getMonth() + 1}`).slice(-2); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const [isPdfModalVisible, setPdfModalVisible] = useState(false);
    const [NewpdfName, setNewPdfName] = useState('');
    const [NewpdfUri, setNewPdfUri] = useState('');
    const [PrintPdf, setPrintPdf] = useState('');


    const createPDF = async () => {
        try {
            let noofentry = 0;
            const tableRows = EmployeesLedger.map((item, index) => {
                noofentry++;
                   return  `
                   <tr style="width:100%; padding: 10px;height:50px;border:1px solid f2be25">
                    <td style="width:12.5%; text-align:center">${index + 1}</td>
                    <td style="width:12.5%; text-align:center">${item.emp_name}</td>
                    <td style="width:12.5%;text-align:center">${formatDates(item.es_firstdate)} TO ${formatDates(item.es_lastdate)}</td>
                    <td style="width:12.5%;  text-align:center">${item.es_workingdays}</td>
                    <td style="width:12.5%;  text-align:center">${item.es_holidays}</td>
                    <td style="width:12.5%;  text-align:center"><b style="margin-right:5px">₹</b> ${item.es_total_salry} /-</td>
                    <td style="width:12.5%;  text-align:center"><b style="margin-right:5px">₹</b> ${item.es_paySalary} /-</td>
                    <td style="width:12.5%;  text-align:center"> ${formatDates(item.es_Added)} </td>
                  </tr>
            `   }).join('');

            const options = {
                html: `
                <html>
                  <body style="width:100%;padding:0px">
                    <div style="width: 100%;">

                    <div style="width:100%;display:flex;background-color:#f2be25;height:60px;padding-top:30px;margin-top:-10px">
                       <div style="width:50%;padding-left:10px"><span style="font-weight:600;font-size:23px;line-height:22px">Akshay Urja Solar</span></div>
                    </div>

                    <div style="width:100%;text-align:center;height:60px;padding-top:40px">
                      <span  style="font-size:30px;line-height:22px;font-weight:500">Employee's ledger</span>
                    </div>
                    <div style="width:100%;height:40px;padding-top:25px">
                      <span  style="font-size:25px;line-height:22px;font-weight:500">No Of Entry : ${noofentry}</span>
                    </div>
                 
                   
                   
                    <table style="width:100%; margin-top:10px ;border-collapse: collapse;">
                      <tr style="width:100%; text-align:start; height:50px;padding-top:13px;border-bottom:1px solid #f2be25;border-top:1px solid #f2be25;background-color:#f2be25">
                        <th style="width:12.5%; text-align:center;  color:#000; font-size:14px; font-weight:600">Sr. No.</th>
                        <th style="width:12.5%; text-align:start;  color:#000; font-size:14px; padding-left:10px; font-weight:600"> Full Name</th>
                        <th style="width:12.5%; text-align:center; color:#000; font-size:14px; font-weight:600">Date.</th>
                        <th style="width:12.5%; text-align:center; color:#000; font-size:14px; font-weight:600">Working Days</th>
                        <th style="width:12.5%; text-align:center; color:#000; font-size:14px; font-weight:600">Absent Days</th>
                        <th style="width:12.5%; text-align:center; color:#000; font-size:14px; font-weight:600">Total Salary </th>
                        <th style="width:12.5%; text-align:center; color:#000; font-size:14px; font-weight:600">Pay Salary </th>
                        <th style="width:12.5%; text-align:center; color:#000; font-size:14px; font-weight:600">Pay Date </th>
                      </tr>
                      ${tableRows}
                    </table>
                    </div>
                  </body>
                </html>
            
              `,
                fileName: `Employees Pay Ledger`,
                directory: 'Documents',
            };

            const file = await RNHTMLtoPDF.convert(options);
            const filePath = Platform.OS === 'ios' ? file.filePath : `file://${file.filePath}`;

            console.log('Generated filePath:', filePath);


            // Call openPDF with the PDF name
            setNewPdfName(filePath);
            openNewPDF(filePath);
            setPrintPdf(filePath);


        } catch (error) {
            console.error('Error generating or sharing PDF:', error);
            Alert.alert('Error', 'Failed to create and send PDF via WhatsApp');
        }
    };


    // Open PDF inline in modal after downloading
    const openNewPDF = async (fileName) => {
        setLoading(true);
        console.log('fileName ' + fileName);

        try {
            // Check if the fileName is a local path or a remote URL
            if (fileName.startsWith('http') || fileName.startsWith('https')) {
                // Handle remote URL: download the PDF file
                const localPath = `${RNFS.DocumentDirectoryPath}/${fileName.split('/').pop()}`;
                const downloadResult = await RNFS.downloadFile({
                    fromUrl: fileName,
                    toFile: localPath,
                }).promise;

                if (downloadResult.statusCode === 200) {
                    setPdfModalVisible(true); // Show the modal
                    setNewPdfUri(localPath); // Set local path as PDF source
                } else {
                    Alert.alert('Error', 'Failed to download PDF file.');
                }
            } else if (fileName.startsWith('file:///')) {
                // Handle local file path
                setPdfModalVisible(true); // Show the modal
                setNewPdfUri(fileName); // Use the local file path
            } else {
                Alert.alert('Error', 'Invalid file path or URL.');
            }
        } catch (error) {
            Alert.alert('Error', `Unable to open PDF: ${error.message}`);
            console.error('PDF handling error:', error);
        } finally {
            setLoading(false); // Stop loading indicator
        }
    };


    const PDFClosed = () => {
        setPdfModalVisible(false);
    };
    const handlePrint = async () => {
        console.log('NewpdfUri ' + PrintPdf);

        try {
            if (PrintPdf.startsWith('http://') || PrintPdf.startsWith('https://')) {
                // Print from a remote URL
                await RNPrint.print({ filePath: PrintPdf });
                console.log('Printing from remote URL');
            } else if (PrintPdf.startsWith('file:///')) {
                // Print from a local file path
                const localFilePath = PrintPdf.replace('file://', '');
                await RNPrint.print({ filePath: localFilePath });
                console.log('Printing from local file');
            } else {
                Alert.alert('Error', 'Invalid file path or URL.');
            }
        } catch (error) {
            console.error("Error printing PDF:", error);
            Alert.alert('Error', 'There was an issue printing the PDF.');
        }
    };
    console.log('NewpdfName ' + NewpdfName);
    // const localFilePath = `${RNFS.DocumentDirectoryPath}/${NewpdfName.split('/').pop()}`;  // Local path to save the PDF
    const handleDownload = async () => {
        try {
            console.log('PrintPdf:', PrintPdf);
            console.log('NewpdfName:', NewpdfName);

            // Extract file name and extension
            const fileName = NewpdfName.split('/').pop();
            const fileBaseName = fileName.substring(0, fileName.lastIndexOf('.'));
            const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
            const downloadFolderPath = `${RNFS.DownloadDirectoryPath}`;

            // Generate a unique file name if it already exists
            let newFilePath = `${downloadFolderPath}/${fileName}`;
            let counter = 1;

            while (await RNFS.exists(newFilePath)) {
                newFilePath = `${downloadFolderPath}/${fileBaseName}_${counter}${fileExtension}`;
                counter++;
            }

            console.log('New download path:', newFilePath);

            if (PrintPdf.startsWith('http') || PrintPdf.startsWith('https')) {
                // Download from remote URL
                const downloadResult = await RNFS.downloadFile({
                    fromUrl: PrintPdf,
                    toFile: newFilePath,
                }).promise;

                if (downloadResult && downloadResult.statusCode === 200) {
                    Alert.alert('Download Successful', `File Downloaded to: ${newFilePath}`);
                    console.log('Download completed:', newFilePath);
                } else {
                    Alert.alert('Download Failed', 'There was an issue downloading the file.');
                }
            } else if (PrintPdf.startsWith('file:///')) {
                // Copy local file to Downloads folder with unique name
                await RNFS.copyFile(PrintPdf.replace('file://', ''), newFilePath);
                Alert.alert('File Copied', `File saved to: ${newFilePath}`);
                console.log('File copied to:', newFilePath);
            } else {
                Alert.alert('Error', 'Invalid file URL or path.');
            }
        } catch (error) {
            console.error('Download error:', error);
            Alert.alert('Error', `Failed to handle file: ${error.message}`);
        }
    };

    const handleShare = async () => {
        const localFilePath = 'file:///storage/emulated/0/Android/data/com.billbook/files/Documents/Abdul rehman.pdf'; // Path to your file

        try {
            // Check if the file exists at the specified path
            const fileExists = await RNFS.exists(NewpdfName);

            if (!fileExists) {
                Alert.alert('Error', 'File does not exist at the specified path.');
                return;
            }

            // Share the file
            const shareOptions = {
                title: 'Share PDF',
                url: NewpdfName,  // Sharing the local file path
                type: 'application/pdf',  // MIME type
            };

            // Open the sharing dialog
            await Share.open(shareOptions);
            Alert.alert('Share', 'PDF shared successfully!');
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', `Failed to share the file. Error: ${error.message}`);
        }
    };



    return (
        <SafeAreaView style={styles.PageContainer}>
            <ScrollView>
                <Pressable style={{ width: "90%", alignSelf: "center", height: 50, display: "flex", flexDirection: "row", marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "15%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Text><MaterialIcons name='arrow-back-ios' size={30} color='black' /></Text>
                    </TouchableOpacity>
                    <View style={{ width: "85%", height: "100%", justifyContent: "center", }}>
                        <Text style={{ color: "#000", fontWeight: "800", fontSize: 18 }}>Employee's Ledger</Text>
                    </View>
                </Pressable>

                {/* Search baar  */}
                <Pressable style={{ width: "90%", alignSelf: "center", display: "flex", flexDirection: "row", marginTop: 30, height: 50, justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ width: "40%", height: "100%", }}>
                        <TextInput placeholder="Search" onChangeText={setSearchQuery} value={searchQuery} placeholderTextColor='#000' style={styles.customerInput} />
                    </View>
                    <View style={{ width: "25%", height: "80%", }}>
                    {/*  */}
                        <TouchableOpacity onPress={() => createPDF()}  style={styles.btn}>
                            <Text>Export</Text>
                        </TouchableOpacity>
                    </View>

                </Pressable>

                {Array.isArray(filteredEmployeeLedger) && filteredEmployeeLedger.length === 0 && searchQuery.trim() !== "" && (
                    <Text style={{ width: "90%", alignSelf: "center", color: "#D9D9D9", fontWeight: "500", textTransform: "capitalize", fontSize: 14, marginTop: 10, marginBottom: 15 }}>
                        "<Text style={{ fontWeight: 'bold' }}>{searchQuery}</Text>" is not in the Employee list.
                    </Text>
                )}

                <Pressable style={{ width: "90%", alignSelf: "center" }}>
                    {/* ledger records show */}
                    <ScrollView horizontal={true} style={{ width: "100%", alignSelf: "center", }}>

                        <Pressable style={styles.table}>


                            <Pressable style={styles.thead}>
                                <View style={styles.theadCol1}>
                                    <Text style={styles.theadText}>Full Name</Text>
                                </View>
                                <View style={styles.theadCol1}>
                                    <Text style={styles.theadText}>Date</Text>
                                </View>
                                <View style={styles.theadCol1}>
                                    <Text style={styles.theadText}>Working Days </Text>
                                </View>
                                <View style={styles.theadCol1}>
                                    <Text style={styles.theadText}>Absent Days </Text>
                                </View>
                                <View style={styles.theadCol1}>
                                    <Text style={styles.theadText}>Total Salary</Text>
                                </View>
                                <View style={styles.theadCol1}>
                                    <Text style={styles.theadText}>Pay Salary</Text>
                                </View>
                                <View style={styles.theadCol1}>
                                    <Text style={styles.theadText}>Pay Date </Text>
                                </View>
                            </Pressable>

                            {loading ? (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 800 }}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                    <Text>Loading...</Text>
                                </View>
                            ) : filteredEmployeeLedger.length > 0 ? (
                                filteredEmployeeLedger.map((item, index) => {
                                    return (
                                        <Pressable key={index} style={styles.tbody}>
                                            <View style={styles.tbodyCol1}>
                                                <Text style={styles.tbodyText}>{item.emp_name}</Text>
                                            </View>
                                            <View style={styles.tbodyCol1}>
                                                <Text style={styles.tbodyText}>{formatDates(item.es_firstdate)}</Text>
                                                <Text style={{ height: 2, backgroundColor: "#D9D9D9", width: 20 }}></Text>
                                                <Text style={styles.tbodyText}>{formatDates(item.es_lastdate)}</Text>
                                            </View>
                                            <View style={styles.tbodyCol1}>
                                                <Text style={styles.tbodyText}>{item.es_workingdays}</Text>
                                            </View>
                                            <View style={styles.tbodyCol1}>
                                                <Text style={styles.tbodyText}>{item.es_holidays}</Text>
                                            </View>
                                            <View style={styles.tbodyCol1}>
                                                <Text style={styles.tbodyText}>{item.es_total_salry}</Text>
                                            </View>
                                            <View style={styles.tbodyCol1}>
                                                <Text style={styles.tbodyText}>{item.es_paySalary}</Text>
                                            </View>
                                            <View style={styles.tbodyCol1}>
                                                <Text style={styles.tbodyText}>{formatDates(item.es_Added)}</Text>
                                            </View>
                                        </Pressable>
                                    )
                                })
                            ) : (
                                <View style={{ width: "100%", height: 300, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 17, fontWeight: "800", color: "#000", textAlign: "center" }}>There's No Borrow Request Here       </Text>
                                </View>
                            )}



                        </Pressable>
                    </ScrollView>

                </Pressable>

                
             {loading &&
                    <View style={{ width: "100%", height: "100%", backgroundColor: "#fff", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" color="blue" />
                    </View>
                }
                <Modal
                    visible={isPdfModalVisible}
                    onRequestClose={() => setPdfModalVisible(false)}
                    animationType="slide"
                    style={{ backgroundColor: "#fff" }}
                >
                    <View style={{ flex: 1 }}>
                        <Pressable style={{ width: "90%", height: 70, alignSelf: "center", justifyContent: "center" }}>
                            <TouchableOpacity style={styles.TopHeaderBack} onPress={() => PDFClosed()}>
                                <Text style={styles.customerListTimeText}><MaterialIcons name="arrow-back-ios" size={30} color="#000" /></Text>
                            </TouchableOpacity>

                        </Pressable>

                        {NewpdfUri ? (
                            <Pdf
                                source={{ uri: NewpdfUri }}
                                onLoadComplete={(numberOfPages) => {
                                    console.log(`Number of pages: ${numberOfPages}`);
                                }}
                                onError={(error) => {
                                    console.error('PDF load error:', error);
                                }}
                                style={{ flex: 1, width: width, height: "80%", backgroundColor: "#FFF" }}
                            />
                        ) : (
                            <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading PDF...</Text>
                        )}
                        <Pressable style={{ marginBottom: 20, width: "90%", display: "flex", flexDirection: "row", justifyContent: "space-between", height: 50, alignSelf: "center"}}>
                          <View style={{width:"30%",height:"100%"}}>
                          <TouchableOpacity onPress={handleDownload} style={styles.btn}>
                                <Text style={{ fontSize: 12, color: "#fff", fontWeight: "500", marginRight: 5 }}>Download</Text>
                                <Text><MaterialIcons name="file-download" size={22} color="#fff" /></Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{width:"30%",height:"100%"}}>
                          <TouchableOpacity onPress={handlePrint} style={styles.btn}>
                                <Text style={{ fontSize: 12, color: "#fff", fontWeight: "500", marginRight: 5 }}>Print</Text>
                                <Text><AntDesign name="printer" size={22} color="#fff" /></Text>
                            </TouchableOpacity>
                            </View>
                            <View style={{width:"30%",height:"100%"}}>
                            <TouchableOpacity onPress={handleShare} style={styles.btn}>
                                <Text style={{ fontSize: 12, color: "#fff", fontWeight: "500", marginRight: 5 }} >Share</Text>
                                <Text><AntDesign name="sharealt" size={22} color="#fff" /></Text>
                            </TouchableOpacity>
                            </View>
                        </Pressable>
                    </View>
                </Modal> 

            </ScrollView>

        </SafeAreaView>
    )
}

export default EmployeesPayLedger

const styles = StyleSheet.create({
    PageContainer: { backgroundColor: "#fff", height: "100%" },
    table: { width: "100%", alignSelf: "center", marginTop: 10, marginBottom: 30 },
    thead: { width: "100%", height: 60, display: "flex", flexDirection: "row" },
    theadCol1: { width: 100, justifyContent: "center", alignItems: "center", backgroundColor: "#f2be25", borderRadius: 4 },
    theadText: { color: "#ffffff", fontSize: 16, fontWeight: "500" },
    theadCol2: { width: "37%", justifyContent: "center", alignItems: "center", backgroundColor: "#0078AD", borderRadius: 4 },
    theadCol3: { width: "33%", justifyContent: "center", alignItems: "center", backgroundColor: "#0078AD", borderRadius: 4 },
    tbody: { width: "100%", height: 60, display: "flex", flexDirection: "row", marginTop: 5 },
    tbodyCol1: { width: 100, justifyContent: "center", alignItems: "center", backgroundColor: "#F6F5F3", borderWidth: 1, borderStyle: "dotted", borderColor: "#D9D9D9" },
    tbodyText: { color: "#1E1E1E", fontSize: 14, fontWeight: "500" },
    tbodyText1: { color: "#1E1E1E", fontSize: 11, fontWeight: "500" },
    tbodyCol2: { width: "37%", justifyContent: "center", alignItems: "center", backgroundColor: "#F6F5F3", borderWidth: 1, borderStyle: "dotted", borderColor: "#D9D9D9" },
    tbodyCol3: { width: "33%", justifyContent: "center", alignItems: "center", backgroundColor: "#F6F5F3", borderWidth: 1, borderStyle: "dotted", borderColor: "#D9D9D9" },
    customerInput: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
    btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center", }

})