import { StyleSheet, View, TextInput, ScrollView, Pressable, TouchableOpacity, Image, Alert, ActivityIndicator, Modal, Animated, Easing } from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, Button } from 'react-native-paper'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Pdf from 'react-native-pdf';
import { Dimensions } from 'react-native'; // Import Dimensions
import Share from 'react-native-share'; // To share the PDF
import RNFS from 'react-native-fs';

import { useRoute } from '@react-navigation/native';

const EmployeeLedger = ({ navigation }) => {


    const { width, height } = Dimensions.get('window'); // Get device width and height
  // Fetch empID from route params
  const route = useRoute();
  const { empID } = route.params;

  // Fetch login Store Id   LoginStore
  const [LoginRole, setLoginRole] = useState(null);
  const [LoginId, setLoginId] = useState(null);
  useEffect(() => {
    // Retrieve the saved username from AsyncStorage
    AsyncStorage.getItem('LoginRole')
      .then((LoginRole) => {
        if (LoginRole) {
          //   console.log(userId)
          setLoginRole(LoginRole);
        }
      })
    AsyncStorage.getItem('LoginId')
      .then((LoginId) => {
        if (LoginId) {
          //   console.log(userId)
          setLoginId(LoginId);
        }
      })
      .catch((error) => {
        console.error('Error retrieving Login Role:', error);
      });
  });



  const [Menuvisible, setMenuVisible] = useState(false);
  const [Borrowvisible, setBorrowVisible] = useState(false);
  const [Salaryisible, setSalaryisible] = useState(false);

  const showBorrowModal = () => setBorrowVisible(true);
  const hideBorrowModal = () => setBorrowVisible(false);

  const showSalaryModal = () => setSalaryisible(true);
  const hideSalaryModal = () => setSalaryisible(false);


  const Scale = useRef(new Animated.Value(0)).current;
  const options = [
    // Add Employee option conditionally based on StoreRole
    ...(LoginId == empID
      ? [
        {
          Title: 'Ask For  Addvance',
          action: () => showBorrowModal(),
        },

      ]
      : []),
    ...(LoginRole == 'admin'
      ? [
        {
          Title: 'Borrow List',
          action: () => navigation.navigate('EmployeeBorrowList'),
        },
        {
          Title: 'Salary Pay',
          action: () => showSalaryModal(),
        },

      ]
      : []),




  ]

  function resizeBox(to) {
    to === 1 && setMenuVisible(true);
    Animated.timing(Scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setMenuVisible(false));
  }



  // State management
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1)); // First day of the current month
  const [endDate, setEndDate] = useState(new Date()); // Current date
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [activeInput, setActiveInput] = useState(null);

  const formatDates = (dateString) => {
    const date = new Date(dateString);
    const day = (`0${date.getDate()}`).slice(-2); // Ensure two digits
    const month = (`0${date.getMonth() + 1}`).slice(-2); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formatDatesMonth = (dateString) => {
    const date = new Date(dateString);

    const day = (`0${date.getDate()}`).slice(-2); // Ensure two digits for the day
    const monthNames = [
      "Jan", "Feb", "March", "April", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getMonth()]; // Get month name
    const year = date.getFullYear();

    return `${day} ${month} ${year}`; // Format: DD Month YYYY
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert to 12-hour format
    return `${hour}:${minutes} ${ampm}`;
  };

  // Helper to format date to YYYY-MM-DD, with safety check
  const formatDateToYMD = (date) => {
    if (!date || !(date instanceof Date)) {
      console.error('Invalid date passed:', date); // Log invalid date
      return ''; // Return an empty string to prevent errors
    }
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };
  // Start and end dates in YYYY-MM-DD format
  const FirstDate = formatDateToYMD(startDate);
  const LastDate = formatDateToYMD(endDate);
  // Show the date picker
  const showDatePicker = (inputType) => {
    setActiveInput(inputType); // Set active input (start or end)
    setShow(true);
    //   setMode('date');
  };

  // Handle date picker change
  const onChange = (event, selectedDate) => {
    setShow(false); // Close date picker
    if (selectedDate) {
      if (activeInput === 'start') {
        setStartDate(selectedDate); // Update start date
      } else if (activeInput === 'end') {
        setEndDate(selectedDate); // Update end date
      }
    }
  };
  const [EmpFullName, setEmpFullName] = useState('');
  const [EmpPerDaySal, setEmpPerDaySal] = useState('');
  const [PaySalary, setPaySalary] = useState('');
  const [EmpHoliDay, setEmpHoliDay] = useState('');
  const [EmpWorkingDay, setEmpWorkingDay] = useState('');
  const [EmpLegderRecords, setEmpLegderRecords] = useState('');
  const [TotalSalary, setTotalSalary] = useState('');
  const [TotalPaidSalary, setTotalPaidSalary] = useState('');
  const [TotalPaidLoan, setTotalPaidLoan] = useState('');
  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch employee ledger records
  const fetchEmployeesLedger = async (EmpID) => {
    try {
      setLoading(true); // Set loading state
      const response = await axios.get(`https://realrate.store/AkshayUrjaSolar/Employee_Ledger_Records_Fetch_Api.php?empId=${empID}&startDate=${FirstDate}&endDate=${LastDate}`);
      const fetchedEmployees = response.data;

      // Set response data into state
      console.log('emp ' + fetchedEmployees);
      console.log(fetchedEmployees['employeesInfo']['emp_name']);
      setEmpFullName(fetchedEmployees['employeesInfo']['emp_name']);
      setEmpPerDaySal(fetchedEmployees['empPerDaySal']);
      //   setEmpID(fetchedEmployees['employeesInfo']['employeeID']);
      setEmpLegderRecords(fetchedEmployees['AttendanceRecords']);
      setEmpWorkingDay(fetchedEmployees['AttendanceRows']);
      setEmpHoliDay(fetchedEmployees['AbsentRows']);

      //   setTotalPaidSalary(fetchedEmployees['salaryPaid']);
      //   setTotalPaidLoan(fetchedEmployees['LoanPaid']);
    } catch (error) {
      console.error('Error fetching Employees:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };


  useEffect(() => {
    // Automatically fetch when empID, FirstDate, or LastDate changes
    if (empID && FirstDate && LastDate) {
      fetchEmployeesLedger();
    }
  }, [empID, FirstDate, LastDate]);


  console.log('EmpHoliDay ' + EmpHoliDay)
  console.log('TotalSalary ' + TotalSalary)
  let empSal = 0;


  const [BorrowReqDesc, setBorrowReqDesc] = useState('');


  const handleToSubmitBorrowReq = async () => {
    try {
      setLoading(true); // Uncomment this to show loading indicator
      const formData = new FormData();

      formData.append('BorrowReqDesc', BorrowReqDesc);
      formData.append('LoginId', LoginId);
      formData.append('LoginRole', LoginRole);

      const response = await axios.post('https://realrate.store/AkshayUrjaSolar/Employee_Borrow_request_Add_Api.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data)
      if (response.data.errmessage) {
        Alert.alert("Warning ", response.data.errmessage)
      } else {
        console.log('Borrow request ' + response.data);
        setBorrowReqDesc('');
        BorrowRequestListFetch();
        Alert.alert("Message", `Your Borrow Request Sended Successfully`);
      }
      // Handle the response
    } catch (error) {
      console.error('Signup failed:', error.message);
      Alert.alert('Error Message', error.message);
    } finally {
      setLoading(false); // Uncomment this to hide loading indicator
    }
  };


  const [BorrowRequestList, setBorrowRequestList] = useState([]);
  const BorrowRequestListFetch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://realrate.store/AkshayUrjaSolar/Employee_Borrow_Request_Fetch_Api.php?loginID=${LoginId}&loginRole=${LoginRole}`);
      // Ensure response data is an array
      const fetchedDailyTask = Array.isArray(response.data) ? response.data : [];
      console.log(fetchedDailyTask);
      setBorrowRequestList(fetchedDailyTask);

    } catch (error) {
      console.error('Error fetching Daily Working List :', error);
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    BorrowRequestListFetch(); // Assuming fetchProducts is defined and accepts city as a parameter
  }, [LoginId, LoginRole]);

  // mujib dr : 9595102400
  const handleToSubmitPaySalary = async () => {
    try {
      setLoading(true); // Uncomment this to show loading indicator
      const formData = new FormData();

      formData.append('empID', empID);
      formData.append('FirstDate', FirstDate);
      formData.append('LastDate', LastDate);
      formData.append('EmpHoliDay', EmpHoliDay);
      formData.append('EmpWorkingDay', EmpWorkingDay);
      formData.append('TotalSalary', EmpWorkingDay * EmpPerDaySal);
      formData.append('PaySalary', PaySalary);

      const response = await axios.post('https://realrate.store/AkshayUrjaSolar/Employee_Salary_Pay_Api.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data)
      if (response.data.errmessage) {
        Alert.alert("Warning ", response.data.errmessage)
      } else {
        console.log('Daily Working Task ' + response.data);
        // setDailyWorkingTask('');
        // DailyTaskListFetch();
        Alert.alert("Message", `Salary Sended Successfully`);

      }
      // Handle the response
    } catch (error) {
      console.error('Signup failed:', error.message);
      Alert.alert('Error Message', error.message);
    } finally {
      setLoading(false); // Uncomment this to hide loading indicator
    }
  };


  useFocusEffect(
    useCallback(() => {
      // Call functions or refresh data when this screen is focused
      BorrowRequestListFetch();
      fetchEmployeesLedger();
    }, [LoginId, LoginRole])
  );



  const [isPdfModalVisible, setPdfModalVisible] = useState(false);
  const [NewpdfName, setNewPdfName] = useState('');
  const [NewpdfUri, setNewPdfUri] = useState('');
  const [PrintPdf, setPrintPdf] = useState('');


  const createPDF = async () => {
      try {
          let empSal1 = 0;
          const tableRows = EmpLegderRecords.map((item, index) => {
            empSal1 += parseInt(EmpPerDaySal); // Accumulate salary
                 return  `
                 <tr style="width:100%; padding: 10px;height:50px;border:1px solid f2be25">
                  <td style="width:15%; text-align:center">${index + 1}</td>
                  <td style="width:25%; text-align:center">${formatDates(item.att_date)}</td>
                  <td style="width:22.5%; text-align:center">${formatTime(item.att_time_start)}</td>
                  <td style="width:22.5%;  text-align:center">${formatTime(item.att_time_end)}</td>
                  <td style="width:15%;  text-align:center">Rs. ${empSal1} /-</td>
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
                    <span  style="font-size:30px;line-height:22px;font-weight:500">Employee ledger</span>
                  </div>
               
                  <div style="width:100%;height:60px;padding-top:20px;display:flex;margin-bottom:20px">
                  <div style="width:50%;padding-left:20px">
                    <span  style="font-size:20px;line-height:30px;font-weight:500;display:block"> Name  : ${EmpFullName}</span>
                    <span  style="font-size:20px;line-height:30px;font-weight:500;display:block">Date : ${formatDatesMonth(startDate)} &nbsp;  To &nbsp;  ${formatDatesMonth(endDate)}</span>
                    </div>
                  <div style="width:50%">
                  
                  </div>
                  </div>
                  <hr/>
                  <div style="width:100%;height:60px;padding-top:20px;display:flex;">
                    <div style="width:50%;padding-left:20px">
                      <span  style="font-size:20px;line-height:30px;font-weight:500;display:block"> Working Day's  : ${EmpWorkingDay}</span>
                      <span  style="font-size:20px;line-height:30px;font-weight:500;display:block"> Absent Day's  : ${EmpHoliDay}</span>
                    </div>
                    <div style="width:50%;text-align:right;padding-right:25px">
                      <span  style="font-size:20px;line-height:30px;font-weight:500;display:block">Total Salary : ${empSal1} </span>
                    </div>
                  </div>
               
                 
                 
                  <table style="width:100%; margin-top:10px ;border-collapse: collapse;">
                    <tr style="width:100%; text-align:start; height:50px;padding-top:13px;border-bottom:1px solid #f2be25;border-top:1px solid #f2be25;background-color:#f2be25">
                      <th style="width:15%; text-align:center;  color:#000; font-size:14px; font-weight:600">Sr. No.</th>
                      <th style="width:25%; text-align:center; color:#000; font-size:14px; font-weight:600">Date.</th>
                      <th style="width:22.5%; text-align:center; color:#000; font-size:14px; font-weight:600">Start Time </th>
                      <th style="width:22.5%; text-align:center; color:#000; font-size:14px; font-weight:600">End Time</th>
                      <th style="width:15%; text-align:center; color:#000; font-size:14px; font-weight:600">Salary  </th>
                    </tr>
                    ${tableRows}
                  </table>
                  </div>
                </body>
              </html>
          
            `,
              fileName: `${EmpFullName} Ledger`,
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
      <Pressable style={{ width: "90%", alignSelf: "center", height: 70, display: "flex", flexDirection: "row", marginBottom: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "15%", height: "100%", justifyContent: "center", alignItems: "center" }}>
          <Text><MaterialIcons name='arrow-back-ios' size={30} color='black' /></Text>
        </TouchableOpacity>
        <View style={{ width: "70%", height: "100%", justifyContent: "center", }}>
          <Text style={{ color: "#000", fontWeight: "800", fontSize: 18 }}>{EmpFullName}</Text>
        </View>
        <TouchableOpacity onPress={() => resizeBox(1)} style={{ width: "15%", height: "100%", justifyContent: "center", alignItems: "flex-end" }}>
          <Text><SimpleLineIcons name='options-vertical' size={22} color='black' /></Text>
        </TouchableOpacity>
      </Pressable>

      {/* Option menu show  */}
      <Modal transparent visible={Menuvisible} animationType="fade">
        <SafeAreaView style={{ flex: 1 }} onTouchStart={() => resizeBox(0)}>
          <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPressOut={() => resizeBox(0)}>
            <Animated.View style={styles.popup}>
              {options.map((op, i) => (
                <TouchableOpacity key={i} onPress={op.action} style={styles.popList}>
                  <Text>{op.Title}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* date select */}
      <Pressable style={{ width: "90%", alignSelf: "center", display: "flex", flexDirection: "row", flexWrap: "wrap", borderBottomWidth: 1, height: 100, borderBottomColor: "#D9D9D9", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 14, color: "#000000", fontWeight: "400", width: "100%" }}>Date :</Text>

        {/* First Input: Shows the first date of the month */}
        <TextInput
          placeholder='mm/dd/yy'
          onPressIn={() => showDatePicker('start')} // Open date picker for start date
          value={formatDates(startDate)} // Show formatted start date
          style={{ backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#9A9A9A", width: "40%", borderRadius: 6, elevation: 3, fontSize: 16, fontWeight: "500", textAlign: "center" }}
        />

        <Text style={{ width: "15%", textAlign: "center", textAlignVertical: "center", fontSize: 16, fontWeight: "500", color: "#000000" }}>To</Text>

        {/* Second Input: Shows the current date */}
        <TextInput
          placeholder='mm/dd/yy'
          onPressIn={() => showDatePicker('end')} // Open date picker for end date
          value={formatDates(endDate)} // Show formatted current date
          style={{ backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#9A9A9A", width: "40%", borderRadius: 6, elevation: 3, fontSize: 16, fontWeight: "500", textAlign: "center" }}
        />

        {/* <TouchableOpacity onPress={SearchEmployeeLedger} style={{ backgroundColor: "#0078AD", borderRadius: 6, justifyContent: "center", alignItems: "center", width: "15%" }}>
            <Text><AntDesign name="search1" size={22} color="#fff" /></Text>
          </TouchableOpacity> */}

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={activeInput === 'start' ? startDate || new Date() : endDate || new Date()} // Ensure valid date is passed
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange} // Handle the change
          />
        )}
      </Pressable>

      {/* date show start to from */}
      <Pressable style={{ width: "90%", alignSelf: "center", display: "flex", flexDirection: "row", height: 45, marginTop: 20 }}>
        <View style={{ width: "75%", alignItems: "center", marginTop: 10 }}>
          <Text style={{ color: "#000000", fontSize: 15, fontWeight: "400" }}>{formatDatesMonth(startDate)}   to   {formatDatesMonth(endDate)}</Text>
        </View>
        <View style={{ width: "25%" }}>
          <TouchableOpacity style={styles.btn} onPress={() => createPDF()}>
            <Text style={{ fontSize: 13, color: "black", fontWeight: "600" }}>Export</Text>
          </TouchableOpacity>
        </View>
      </Pressable>

      {/* ledger records show */}
      <ScrollView style={{ width: "100%", alignSelf: "center", paddingLeft: "5%", paddingRight: "5%" }}>
        <Pressable style={styles.table}>

          <Pressable style={styles.thead}>
            <View style={styles.theadCol1}>
              <Text style={styles.theadText}>Date</Text>
            </View>
            <View style={styles.theadCol2}>
              <Text style={styles.theadText}>Attendance </Text>
            </View>
            <View style={styles.theadCol3}>
              <Text style={styles.theadText}>Salary Paid</Text>
            </View>
          </Pressable>
          {

            // Initialize salary accumulator

            loading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 800 }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
              </View>
            ) : EmpLegderRecords.length > 0 ? (
              <View>
                {EmpLegderRecords.map((item, index) => {
                  empSal += parseInt(EmpPerDaySal); // Accumulate salary
                  return (
                    <Pressable key={index} style={styles.tbody}>
                      <View style={styles.tbodyCol1}>
                        <Text style={styles.tbodyText}>{formatDates(item.att_date)}</Text>
                      </View>
                      <View style={styles.tbodyCol2}>
                        <Text style={styles.tbodyText}>{formatTime(item.att_time_start)}</Text>
                        <Text style={{ height: 2, backgroundColor: "#D9D9D9", width: 20 }}></Text>
                        <Text style={styles.tbodyText}>{formatTime(item.att_time_end)}</Text>
                      </View>
                      <View style={styles.tbodyCol3}>
                        <Text style={styles.tbodyText}>Rs. {empSal} /-</Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            ) : (
              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ fontSize: 16, color: '#555' }}>There's No Record Found</Text>
              </View>
            )
          }


        </Pressable>
      </ScrollView>



      <Modal visible={Borrowvisible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
        <Pressable style={{ width: "90%", alignSelf: "center", height: 40, display: "flex", flexDirection: "row", marginTop: 20, marginBottom: 40 }}>
          <TouchableOpacity onPress={hideBorrowModal} style={{ width: "15%", height: "100%", justifyContent: "center", }}>
            <Text><MaterialIcons name='arrow-back-ios' size={30} color='black' /></Text>
          </TouchableOpacity>
          <View style={{ width: "80%", height: "100%", justifyContent: "center" }}>
            <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "700" }}>Borrow Statement</Text>
          </View>

        </Pressable>
        <ScrollView style={{ width: "100%", alignSelf: "center", paddingLeft: "5%", paddingRight: "5%" }}>
          <TextInput placeholder='Enter Borrow Request  ' placeholderTextColor='#000' multiline={true} onChangeText={(text) => setBorrowReqDesc(text)} value={BorrowReqDesc} style={styles.customerInput} />
          <View style={{ width: "40%", alignSelf: "flex-end", height: 45, marginTop: 10 }}>
            <TouchableOpacity onPress={() => handleToSubmitBorrowReq()} style={styles.btn}>
              <Text style={{ fontSize: 15, color: "#000", fontWeight: "600" }}>Submit</Text>
            </TouchableOpacity>
          </View>

          <Pressable style={{ width: "90%", alignSelf: "center", marginTop: 20, marginBottom: 50 }}>
            <Text style={{ fontSize: 16, color: "#f2be25", fontWeight: "900", marginBottom: 20, borderBottomWidth: 1, }}>Ask For Advance </Text>
            {loading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 800 }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
              </View>
            ) : BorrowRequestList.length > 0 ? (
              BorrowRequestList.map((item, index) => (
                <View key={index} style={{ width: "100%", padding: 10, marginBottom: 10, borderBottomWidth: 0.9, borderBottomColor: "#f2be25" }}>
                  <Text style={{ fontSize: 11, fontWeight: "500", color: "#000", marginBottom: 5, textAlign: "right" }}> {formatDates(item.br_added)} </Text>
                  <Text style={{ fontSize: 14, fontWeight: "400", color: "#000" }}> {item.borrowDes} </Text>
                  <Text style={{ fontSize: 11, fontWeight: "500", color: "#000", textAlign: "right" }}> {item.br_status} </Text>
                </View>
              )
              )
            ) : (
              <View style={{ width: "100%", height: 300, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 17, fontWeight: "800", color: "#000", textAlign: "center" }}>There's No Borrow Request Here       </Text>
              </View>
            )}
          </Pressable>



        </ScrollView>
      </Modal>


      <Modal visible={Salaryisible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
        <ScrollView>
          <Pressable style={{ width: "90%", alignSelf: "center", height: 40, display: "flex", flexDirection: "row", marginTop: 20, marginBottom: 40 }}>
            <TouchableOpacity onPress={hideSalaryModal} style={{ width: "15%", height: "100%", justifyContent: "center", }}>
              <Text><SimpleLineIcons name='arrow-left' size={30} color='black' /></Text>
            </TouchableOpacity>
            <View style={{ width: "80%", height: "100%", justifyContent: "center" }}>
              <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "700" }}>Salary Pay</Text>
            </View>
          </Pressable>

          <Text style={{ paddingLeft: 20, fontSize: 17, fontWeight: "600", }}>{EmpFullName}</Text>
          <Text style={{ paddingLeft: 20, fontSize: 17, fontWeight: "600", }}> {formatDates(FirstDate)}   To  {formatDates(LastDate)} </Text>
          <Pressable style={{ width: "90%", alignSelf: "center", marginTop: 20, }}>

            <View style={{ width: "100%", height: 60, justifyContent: "space-between", alignItems: "center", display: "flex", flexDirection: "row", marginBottom: 10, borderWidth: 0.5 }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#000", paddingLeft: 10 }}>Absent Day's</Text>
              <TextInput placeholder={EmpHoliDay ? `${EmpHoliDay}` : ""} onChangeText={(text) => setEmpHoliDay(text)} value={EmpHoliDay} style={{ width: "40%", textAlign: "right" }} />
            </View>
            <View style={{ width: "100%", height: 60, justifyContent: "space-between", alignItems: "center", display: "flex", flexDirection: "row", marginBottom: 10, borderWidth: 0.5 }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#000", paddingLeft: 10 }}>Working Day's</Text>
              <TextInput placeholder={`${EmpWorkingDay}`} onChangeText={(text) => setEmpWorkingDay(text)} value={EmpWorkingDay} style={{ width: "40%", textAlign: "right" }} />
            </View>
            <View style={{ width: "100%", height: 60, justifyContent: "space-between", alignItems: "center", display: "flex", flexDirection: "row", marginBottom: 10, borderWidth: 0.5 }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#000", paddingLeft: 10 }}>Salary</Text>
              <TextInput placeholder={`${EmpWorkingDay * EmpPerDaySal}`} onChangeText={(text) => setTotalSalary(text)} value={TotalSalary} style={{ width: "40%", textAlign: "right" }} />
            </View>
            <View style={{ width: "100%", height: 60, justifyContent: "space-between", alignItems: "center", display: "flex", flexDirection: "row", marginBottom: 10, borderWidth: 0.5 }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#000", paddingLeft: 10 }}>Loan</Text>
              <TextInput placeholder='' style={{ width: "40%", textAlign: "right" }} />
            </View>
            <View style={{ width: "100%", height: 60, justifyContent: "space-between", alignItems: "center", display: "flex", flexDirection: "row", marginBottom: 10, borderWidth: 0.5 }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#000", paddingLeft: 10 }}>Salary Pay</Text>
              <TextInput placeholder='Salary Pay' onChangeText={(text) => setPaySalary(text)} value={PaySalary} style={{ width: "40%", textAlign: "right" }} />
            </View>
            <Button onPress={() => handleToSubmitPaySalary()} mode="contained" style={{ width: "50%", alignSelf: "center", height: 50, borderWidth: 1, justifyContent: "center", marginTop: 30 }}>
              <Text style={{ fontSize: 14, color: "#FFF", fontWeight: "600" }}>Submit</Text>
            </Button>
          </Pressable>
        </ScrollView>


      </Modal>


      

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


    </SafeAreaView>
  )
}

export default EmployeeLedger

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  table: { width: "100%", alignSelf: "center", marginTop: 30, marginBottom: 30 },
  thead: { width: "100%", height: 60, display: "flex", flexDirection: "row" },
  theadCol1: { width: "30%", justifyContent: "center", alignItems: "center", backgroundColor: "#f2be25", borderRadius: 4 },
  theadText: { color: "#ffffff", fontSize: 16, fontWeight: "500" },
  theadCol2: { width: "37%", justifyContent: "center", alignItems: "center", backgroundColor: "#f2be25", borderRadius: 4 },
  theadCol3: { width: "33%", justifyContent: "center", alignItems: "center", backgroundColor: "#f2be25", borderRadius: 4 },
  tbody: { width: "100%", height: 60, display: "flex", flexDirection: "row", marginTop: 5 },
  tbodyCol1: { width: "30%", justifyContent: "center", alignItems: "center", backgroundColor: "#F6F5F3", borderWidth: 1, borderStyle: "dotted", borderColor: "#D9D9D9" },
  tbodyText: { color: "#1E1E1E", fontSize: 14, fontWeight: "500" },
  tbodyText1: { color: "#1E1E1E", fontSize: 11, fontWeight: "500" },
  tbodyCol2: { width: "37%", justifyContent: "center", alignItems: "center", backgroundColor: "#F6F5F3", borderWidth: 1, borderStyle: "dotted", borderColor: "#D9D9D9" },
  tbodyCol3: { width: "33%", justifyContent: "center", alignItems: "center", backgroundColor: "#F6F5F3", borderWidth: 1, borderStyle: "dotted", borderColor: "#D9D9D9" },
  customerInput: { width: "100%", marginTop: 5, marginBottom: 5, paddingLeft: 15, height: 100 },
  btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
  customerInput: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },

  popup: {
    width: "50%",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    position: "absolute",
    top: 50,
    right: 10,
    elevation: 4
  },
  popList: {
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: "#D9D9D9",
    justifyContent: "center"
  }

})