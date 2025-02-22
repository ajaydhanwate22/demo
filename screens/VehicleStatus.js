import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image, Modal, TextInput, Alert, ActivityIndicator, Animated, Easing, PermissionsAndroid, Platform, } from 'react-native'
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { Searchbar, Text, Button, } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import HomeHeader from '../components/HomeHeader';



const VehicleStatus = ({ navigation }) => {




    // Dealer route
    const route = useRoute();
    const { LoginRole } = route.params;
    const { LoginId } = route.params;
    const { vehicle } = route.params;
    const { vehicleID } = route.params;
    const { avg } = route.params;


    const [activeTab, setActiveTab] = useState('DAY'); // State to track the active tab

    const handleTabPress = (tab) => {
        setActiveTab(tab);
    };

    const [StartVisible, setStartVisible] = useState(false);

    const showStartModal = () => setStartVisible(true);
    const hideStartModal = () => setStartVisible(false);

    const [EndVisible, setEndVisible] = useState(false);

    const showEndModal = () => setEndVisible(true);
    const hideEndModal = () => setEndVisible(false);

    const [DieselVisible, setDieselVisible] = useState(false);

    const showDieselModal = () => setDieselVisible(true);
    const hideDieselModal = () => setDieselVisible(false);

    const [vehicleStatusDesc, setvehicleStatusDesc] = useState('');
    const [vehicleKM, setvehicleKM] = useState('');
    const [DizelAmount, setDizelAmount] = useState('');
    const [Vehiclename, setVehicleName] = useState('');
    const [loading, setLoading] = useState(false);


    const [imageUri, setImageUri] = React.useState(null);

    const selectImage = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorCode) {
                console.error('Camera Error: ', response.errorMessage);
            } else {
                console.log('Image URI:', response.assets[0].uri);
                setImageUri(response.assets[0].uri); // Set the image URI to state
            }
        });
    };




    const handleToStartVegicleStatus = async () => {
        try {
            setLoading(true); // Uncomment this to show loading indicator
            const formData = new FormData();

            formData.append('SubmitId', LoginId);
            formData.append('SubmitRole', LoginRole);
            formData.append('vehicleID', vehicleID);
            formData.append('StartTime', formattedTime);
            formData.append('vehicleKM', vehicleKM);
            formData.append('Vehiclename', Vehiclename);
            // formData.append('DizelLiter', DizelLiter);
            // formData.append('DizelAmount', DizelAmount);
            // Check if an image is selected
            if (imageUri) {
                formData.append('image', {
                    uri: imageUri,
                    type: 'image/jpeg', // Adjust the type according to the image format
                    name: 'product_image.jpg', // You can specify any file name
                });
            }
            console.log('formData ' + formData);
            const response = await axios.post('https://realrate.store/AkshayUrjaSolar/Vehicle_Status_start_Api.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log(response.data)
            if (response.data.errmessage) {
                Alert.alert('Alert', response.data.errmessage)
            } else {
                Alert.alert('Message', 'Vehicle Status Start Now ');
                setvehicleStatusDesc('');
                setvehicleKM('');
                setDizelLiter('');
                setDizelAmount('');
                setImageUri(null);
                hideStartModal();
                CurrentDayVehicleStatusListFetch();
                WeeklyVehicelStatusFetch();
                MothlyVehicelStatusFetch();
                YearlyVehicelStatusFetch();
                
            }
            // console.log('Response:', response.data);
            // Handle the response
        } catch (error) {
            console.error('Signup failed:', error.message);
            Alert.alert('Error Message', error.message);
        } finally {
            setLoading(false); // Uncomment this to hide loading indicator
        }
    };

    const handleToEndVegicleStatus = async () => {
        try {
            setLoading(true); // Uncomment this to show loading indicator
            const formData = new FormData();

            formData.append('statusID', statusID);
            formData.append('SubmitId', LoginId);
            formData.append('SubmitRole', LoginRole);
            formData.append('StartTime', formattedTime);
            formData.append('vehicleKM', vehicleKM);

            // Check if an image is selected
            if (imageUri) {
                formData.append('image', {
                    uri: imageUri,
                    type: 'image/jpeg', // Adjust the type according to the image format
                    name: 'product_image.jpg', // You can specify any file name
                });
            }
            console.log('formData ' + formData);
            const response = await axios.post('https://realrate.store/AkshayUrjaSolar/Vehicle_Status_End_Api.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log(response.data)
            if (response.data.errmessage) {
                Alert.alert('Alert', response.data.errmessage)
            } else {
                Alert.alert('Message', 'Vehicle Status End Now ');
                setvehicleStatusDesc('');
                setvehicleKM('');
                setstatusID('');
                setImageUri(null);
                hideEndModal();
                CurrentDayVehicleStatusListFetch();
                WeeklyVehicelStatusFetch();
                MothlyVehicelStatusFetch();
                YearlyVehicelStatusFetch();
            }
            // console.log('Response:', response.data);
            // Handle the response
        } catch (error) {
            console.error('Signup failed:', error.message);
            Alert.alert('Error Message', error.message);
        } finally {
            setLoading(false); // Uncomment this to hide loading indicator
        }
    };




    // const OpenEndVehicleStatusModal = (statusID) => {
    //     console.log('statusID ' + statusID);
    //     setstatusID(statusID);
    //     showEndModal();
    // }
    const formatDates = (dateString) => {
        const date = new Date(dateString);
        const day = (`0${date.getDate()}`).slice(-2); // Ensure two digits
        const month = (`0${date.getMonth() + 1}`).slice(-2); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const [time, setTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onTimeChange = (event, selectedTime) => {
        setShowPicker(false);
        if (selectedTime) {
            setTime(selectedTime);
        }
    };

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    console.log('time ' + formattedTime);

    // useFocusEffect(
    //     useCallback(() => {
    //         // Call functions or refresh data when this screen is focused
    //         CurrentDayVehicleStatusListFetch();
    //     }, [LoginId, LoginRole,currentDate])
    // );

    let ActualKM = 0;

    // Day Start

    // Get the current date
    const [currentDate, setCurrentDate] = useState(new Date());

    // Format the date as "Month Day, Year"
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(currentDate);

    const formatForApi = (date) => {
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };


    // Array of day names
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // Get the day of the week
    const dayOfWeek = dayName[currentDate.getDay()];
    const today = new Date(); // Get today's date without time
    today.setHours(0, 0, 0, 0); // Normalize the time to compare dates

    const [CurrentDayVehicleStatusList, setCurrentDayVehicleStatusList] = useState([]);
    const [CurrentDayStartKM, setCurrentDayStartKM] = useState(0);
    const [CurrentDayEndKM, setCurrentDayEndKM] = useState(0);
    const [CurrentDayDiesel, setCurrentDayDiesel] = useState('');
    const [CurrentDayDieselAmount, setCurrentDayDieselAmount] = useState('');
    const [CurrentDayStartTime, setCurrentDayStartTime] = useState('');
    const [CurrentDayEndTime, setCurrentDayEndTime] = useState('');
    const [CurrentDayStartImage, setCurrentDayStartImage] = useState('');
    const [CurrentDayEndImage, setCurrentDayEndImage] = useState('');
    const [CurrentDieselRate, setCurrentDieselRate] = useState('');
    const [CurrentfuelType, setCurrentfuelType] = useState('');
    const [statusID, setstatusID] = useState('');



    let DailyRun = 0;
    let DailyAmount = 0;
    // Fetch vehicle status list based on currentDate
    const CurrentDayVehicleStatusListFetch = async () => {
        try {
            setLoading(true);
            const formattedDate = formatForApi(currentDate);
            const response = await axios.get(
                `https://realrate.store/AkshayUrjaSolar/Current_Day_Vehicle_Status_Fetch_Api.php?loginID=${LoginId}&loginRole=${LoginRole}&vehicle=${vehicleID}&date=${formattedDate}`
            );
            const fetchedCUrrentVehicleStatus = response.data;
            console.log('vs_id :  ', fetchedCUrrentVehicleStatus.currentDayVehicleStatus);
             if(fetchedCUrrentVehicleStatus.currentDayVehicleStatus != 'Blank'){
                console.log('vs_id :  ', fetchedCUrrentVehicleStatus.currentDayVehicleStatus.vs_id);
                setstatusID(fetchedCUrrentVehicleStatus.currentDayVehicleStatus.vs_id);
                setCurrentDayStartTime(fetchedCUrrentVehicleStatus.currentDayVehicleStatus.vs_startTime);
                setCurrentDayEndTime(fetchedCUrrentVehicleStatus.currentDayVehicleStatus.vs_endTime);
                setCurrentDayStartKM(fetchedCUrrentVehicleStatus.currentDayVehicleStatus.vs_start_km);
                setCurrentDayEndKM(fetchedCUrrentVehicleStatus.currentDayVehicleStatus.vs_end_km);
                setCurrentDayDiesel(fetchedCUrrentVehicleStatus.currentDayVehicleStatus.vs_DizelLiter);
                setCurrentDayDieselAmount(fetchedCUrrentVehicleStatus.currentDayVehicleStatus.vs_DizelAmount);
                setCurrentDayStartImage(fetchedCUrrentVehicleStatus.currentDayVehicleStatus.vs_start_img);
                setCurrentDayEndImage(fetchedCUrrentVehicleStatus.currentDayVehicleStatus.vs_end_img);
             }else{
                setstatusID('');
                setCurrentDayStartTime('');
                setCurrentDayEndTime('');
                setCurrentDayStartKM('');
                setCurrentDayEndKM('');
                setCurrentDayDiesel('');
                setCurrentDayDieselAmount('');
                setCurrentDayStartImage('');
                setCurrentDayEndImage('');
             }
           
            setCurrentDieselRate(fetchedCUrrentVehicleStatus.dieselrate);
            setCurrentfuelType(fetchedCUrrentVehicleStatus.fuelType);
            // DailyRun = fetchedCUrrentVehicleStatus.currentDayVehicleStatus.vs_end_km - fetchedCUrrentVehicleStatus.currentDayVehicleStatus.vs_start_km;

            console.log('daily run ' + fetchedCUrrentVehicleStatus.currentDayVehicleStatus.vs_end_km - fetchedCUrrentVehicleStatus.currentDayVehicleStatus.vs_start_km)

        } catch (error) {
            console.error('Error fetching Daily Vehicle List:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle previous date
    const handlePreviousDate = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        });
    };

    // Handle next date
    const handleNextDate = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        });
    };

    // Fetch data whenever LoginId, LoginRole, or currentDate changes
    useEffect(() => {
        CurrentDayVehicleStatusListFetch();
    }, [LoginId, LoginRole, vehicleID, currentDate]);



    console.log('DailyAmount ' + (CurrentDayEndKM - CurrentDayStartKM) / avg * CurrentDieselRate)
    const calculateDieselCost = (endKM, startKM, average, dieselRate) => {
        if (average === 0) return 'Invalid Average'; // Avoid division by zero
        const result = ((endKM - startKM) / average) * dieselRate;
        return parseFloat(result.toFixed(2)); // Ensure the value has exactly 2 decimal places
    };

    const dieselCost = calculateDieselCost(CurrentDayEndKM, CurrentDayStartKM, avg, CurrentDieselRate);

    const calculateDiesel = (endKM, startKM, average) => {
        if (average === 0) return 'Invalid Average'; // Avoid division by zero
        const result = ((endKM - startKM) / average);
        return parseFloat(result.toFixed(2)); // Ensure the value has exactly 2 decimal places
    };

    const diesel = calculateDiesel(CurrentDayEndKM, CurrentDayStartKM, avg);

    // Day End

    // Week Start

    const [currentWeekDate, setCurrentWeekDate] = useState(new Date());
    const [WheeklyVehicleStatusList, setWheeklyVehicleStatusList] = useState([]);

    // Helper function to format a date
    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            day: 'numeric', // Numeric day, e.g., "21"
            month: 'short', // Short month format, e.g., "Dec"
        }).format(date);
    };


    // Helper Functions
    const getStartOfWeek = (date) => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        return new Date(date.setDate(diff));
    };

    const getEndOfWeek = (date) => {
        const start = getStartOfWeek(date);
        return new Date(start.setDate(start.getDate() + 6));
    };

    // Calculate start and end dates of the current week
    const { startOfWeek, endOfWeek } = useMemo(() => {
        const startOfWeek = new Date(currentWeekDate);
        startOfWeek.setDate(currentWeekDate.getDate() - currentWeekDate.getDay()); // Start of the week (Sunday)

        const endOfWeek = new Date(currentWeekDate);
        endOfWeek.setDate(currentWeekDate.getDate() - currentWeekDate.getDay() + 6); // End of the week (Saturday)

        return { startOfWeek, endOfWeek };
    }, [currentWeekDate]); // Recalculate only when `currentWeekDate` changes

    const [currentWeek, setCurrentWeek] = useState({
        startOfWeek: getStartOfWeek(new Date()),
        endOfWeek: getEndOfWeek(new Date()),
    });

    // console.log('startOfWeek Ejaz ' + startOfWeek)
    console.log('currentWeek.startOfWeek Ejaz ' + currentWeek.startOfWeek)

    const [WeeklyVehicelStatusStartKM, setWeeklyVehicelStatusStartKM] = useState([]);
    const [WeeklyVehicelStatusEndKM, setWeeklyVehicelStatusEndKM] = useState([]);
    const [WeeklyVehicelStatusTotalKM, setWeeklyVehicelStatusTotalKM] = useState([]);
    const [WeeklyVehicelStatusTotalDiesel, setWeeklyVehicelStatusTotalDiesel] = useState([]);
    const [WeeklyVehicelStatusTotalPrice, setWeeklyVehicelStatusTotalPrice] = useState([]);
    const WeeklyVehicelStatusFetch = async () => {
        try {
            setLoading(true);
            const formattedYearStartDate = formatForApi(currentWeek.startOfWeek);
            const formattedYearEndDate = formatForApi(currentWeek.endOfWeek);
            const response = await axios.get(
                `https://realrate.store/AkshayUrjaSolar/weekly_Vehicle_status_Fetch_Api.php?loginID=${LoginId}&loginRole=${LoginRole}&vehicle=${vehicleID}&startdate=${formattedYearStartDate}&enddate=${formattedYearEndDate}`
            );
            const fetchedDailyTask = Array.isArray(response.data) ? response.data : [];

            // Calculate the total of vs_start_km
            const totalStartKm = fetchedDailyTask.reduce((acc, item) => {
                return acc + (parseFloat(item.vs_start_km) || 0); // Parse vs_start_km to float and handle null/undefined
            }, 0);
            const totalEndKm = fetchedDailyTask.reduce((acc, item) => {
                return acc + (parseFloat(item.vs_end_km) || 0); // Parse vs_start_km to float and handle null/undefined
            }, 0);

            const TotalDiff = totalEndKm - totalStartKm;
            const WeeklyDiesel = TotalDiff / avg;
            const TotalPrice =  WeeklyDiesel * CurrentDieselRate;
            console.log('TotalPrice ', TotalPrice);
            console.log('Total WeeklyDiesel:', WeeklyDiesel);
            setWeeklyVehicelStatusStartKM(totalStartKm);
            setWeeklyVehicelStatusEndKM(totalEndKm);
            setWeeklyVehicelStatusTotalKM(TotalDiff);
            setWeeklyVehicelStatusTotalDiesel(parseFloat(WeeklyDiesel.toFixed(2)));
            setWeeklyVehicelStatusTotalPrice(parseFloat(TotalPrice.toFixed(2)));
            // console.log('Total vs_end_km:', totalEndKm);
            // console.log('Total TotalDiff:', TotalDiff);
        } catch (error) {
            console.error('Error fetching Diesel List:', error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     WeeklyVehicelStatusFetch(); // Assuming fetchProducts is defined and accepts city as a parameter
    // }, [vehicleID, LoginId, LoginRole, currentWeek.startOfWeek, currentWeek.endOfWeek]);



    const handlePreviousWeek = () => {
        setCurrentWeek((prev) => {
            const newStartOfWeek = new Date(prev.startOfWeek);
            newStartOfWeek.setDate(newStartOfWeek.getDate() - 7);

            const newEndOfWeek = new Date(prev.endOfWeek);
            newEndOfWeek.setDate(newEndOfWeek.getDate() - 7);

            return { startOfWeek: newStartOfWeek, endOfWeek: newEndOfWeek };
        });
    };

    const handleNextWeek = () => {
        setCurrentWeek((prev) => {
            const newStartOfWeek = new Date(prev.startOfWeek);
            newStartOfWeek.setDate(newStartOfWeek.getDate() + 7);

            const newEndOfWeek = new Date(prev.endOfWeek);
            newEndOfWeek.setDate(newEndOfWeek.getDate() + 7);

            return { startOfWeek: newStartOfWeek, endOfWeek: newEndOfWeek };
        });
    };

    // Check if the next week is in the future
    const isNextWeekDisabled = () => {
        const nextWeekStart = new Date(currentWeek.startOfWeek);
        nextWeekStart.setDate(nextWeekStart.getDate() + 7);
        return nextWeekStart > today;
    };

    // Fetch data whenever LoginId, LoginRole, or currentDate changes
    // useEffect(() => {
    //     WheeklyVehicleStatusListFetch();
    // }, [LoginId, LoginRole, startOfWeek, endOfWeek]);

    // Week End


    // Month Start

    const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
    const [MonthlyVehicleStatusList, setMonthlyVehicleStatusList] = useState([]);

    // Memoize first and last dates of the current month
    const { firstDateOfMonth, lastDateOfMonth } = useMemo(() => {
        const firstDateOfMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1,1);
        const lastDateOfMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 0);
        return { firstDateOfMonth, lastDateOfMonth };
    }, [currentMonthDate]);

    // Check if the current month is the current system month
    const isCurrentMonth = useMemo(() => {
        const today = new Date();
        return (
            currentMonthDate.getFullYear() === today.getFullYear() &&
            currentMonthDate.getMonth() === today.getMonth()
        );
    }, [currentMonthDate]);




    const [MothlyVehicelStatusStartKM, setMothlyVehicelStatusStartKM] = useState([]);
    const [MothlyVehicelStatusEndKM, setMothlyVehicelStatusEndKM] = useState([]);
    const [MothlyVehicelStatusTotalKM, setMothlyVehicelStatusTotalKM] = useState([]);
    const [MothlyVehicelStatusTotalDiesel, setMothlyVehicelStatusTotalDiesel] = useState([]);
    const [MothlyVehicelStatusTotalPrice, setMothlyVehicelStatusTotalPrice] = useState([]);
    const MothlyVehicelStatusFetch = async () => {
        try {
            setLoading(true);
            const formattedMonthStartDate = formatForApi(firstDateOfMonth);
            const formattedMonthEndDate = formatForApi(lastDateOfMonth);
            const response = await axios.get(
                `https://realrate.store/AkshayUrjaSolar/weekly_Vehicle_status_Fetch_Api.php?loginID=${LoginId}&loginRole=${LoginRole}&vehicle=${vehicleID}&startdate=${formattedMonthStartDate}&enddate=${formattedMonthEndDate}`
            );
            const fetchedDailyTask = Array.isArray(response.data) ? response.data : [];

            // Calculate the total of vs_start_km
            const totalStartKm1 = fetchedDailyTask.reduce((acc, item) => {
                return acc + (parseFloat(item.vs_start_km) || 0); // Parse vs_start_km to float and handle null/undefined
            }, 0);
            const totalEndKm1 = fetchedDailyTask.reduce((acc, item) => {
                return acc + (parseFloat(item.vs_end_km) || 0); // Parse vs_start_km to float and handle null/undefined
            }, 0);

            const TotalDiff1 = totalEndKm1 - totalStartKm1;
            const WeeklyDiesel1 = TotalDiff1 / avg
            const TotalPrice1 =  WeeklyDiesel1 * CurrentDieselRate;
            // console.log('Fetched Daily Task:', fetchedDailyTask);
            console.log('Total WeeklyDiesel:', WeeklyDiesel1);
            setMothlyVehicelStatusStartKM(totalStartKm1);
            setMothlyVehicelStatusEndKM(totalEndKm1);
            setMothlyVehicelStatusTotalKM(TotalDiff1);
            setMothlyVehicelStatusTotalDiesel(parseFloat(WeeklyDiesel1.toFixed(2)));
            setMothlyVehicelStatusTotalPrice(parseFloat(TotalPrice1.toFixed(2)));
        } catch (error) {
            console.error('Error fetching Diesel List:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        MothlyVehicelStatusFetch(); // Assuming fetchProducts is defined and accepts city as a parameter
    }, [vehicleID, LoginId, LoginRole, firstDateOfMonth, lastDateOfMonth]);

    // Function to navigate to the previous month
    const handlePreviousMonth = () => {
        setCurrentMonthDate((prevDate) => {
            const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
            return newDate;
        });
    };

    // Function to navigate to the next month
    const handleNextMonth = () => {
        if (!isCurrentMonth) {
            setCurrentMonthDate((prevDate) => {
                const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
                return newDate;
            });
        }
    };

    // Helper function to format only the month and year
    const formatMonthYear = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    console.log('firstDateOfMonth ' + firstDateOfMonth);
    console.log('lastDateOfMonth ' + lastDateOfMonth);



    // Month End


    // Year Start

    const [currentYearDate, setCurrentYearDate] = useState(new Date());
    const [YearlyVehicleStatusList, setYearlyVehicleStatusList] = useState([]);

    // Helper function to return the current year
    const getYear = (date) => {
        return date.getFullYear();
    };

    // Get the first and last date of the year
    const getYearFirstAndLastMonthDates = (date) => {
        const firstMonth = new Date(date.getFullYear(), 0, 2); // January 1st
        const lastMonth = new Date(date.getFullYear(), 11, 32); // December 31st

        return {
            YearfirstMonthDate: firstMonth,
            YearlastMonthDate: lastMonth,
        };
    };

    // Memoize first and last dates of the current year
    const { YearfirstMonthDate, YearlastMonthDate } = useMemo(() => {
        const { YearfirstMonthDate, YearlastMonthDate } = getYearFirstAndLastMonthDates(currentYearDate);
        return { YearfirstMonthDate, YearlastMonthDate };
    }, [currentYearDate]);

    // Check if the current year is the system's current year
    const isCurrentYear = useMemo(() => {
        const today = new Date();
        return currentYearDate.getFullYear() === today.getFullYear();
    }, [currentYearDate]);

    // Function to navigate to the previous year
    const handlePreviousYear = () => {
        setCurrentYearDate((prevDate) => {
            const newDate = new Date(prevDate.getFullYear() - 1, prevDate.getMonth(), 1);
            return newDate;
        });
    };

    // Function to navigate to the next year
    const handleNextYear = () => {
        if (!isCurrentYear) {
            setCurrentYearDate((prevDate) => {
                const newDate = new Date(prevDate.getFullYear() + 1, prevDate.getMonth(), 1);
                return newDate;
            });
        }
    };

    const [YearlyVehicelStatusStartKM, setYearlyVehicelStatusStartKM] = useState([]);
    const [YearlyVehicelStatusEndKM, setYearlyVehicelStatusEndKM] = useState([]);
    const [YearlyVehicelStatusTotalKM, setYearlyVehicelStatusTotalKM] = useState([]);
    const [YearlyVehicelStatusTotalDiesel, setYearlyVehicelStatusTotalDiesel] = useState([]);
    const [YearlyVehicelStatusTotalPrice, setYearlyVehicelStatusTotalPrice] = useState([]);
    const YearlyVehicelStatusFetch = async () => {
        try {
            setLoading(true);
            const formattedYearStartDate = formatForApi(YearfirstMonthDate);
            const formattedYearEndDate = formatForApi(YearlastMonthDate);
            const response = await axios.get(
                `https://realrate.store/AkshayUrjaSolar/weekly_Vehicle_status_Fetch_Api.php?loginID=${LoginId}&loginRole=${LoginRole}&vehicle=${vehicleID}&startdate=${formattedYearStartDate}&enddate=${formattedYearEndDate}`
            );
            const fetchedDailyTask = Array.isArray(response.data) ? response.data : [];

            // Calculate the total of vs_start_km
            const totalStartKm2 = fetchedDailyTask.reduce((acc, item) => {
                return acc + (parseFloat(item.vs_start_km) || 0); // Parse vs_start_km to float and handle null/undefined
            }, 0);
            const totalEndKm2 = fetchedDailyTask.reduce((acc, item) => {
                return acc + (parseFloat(item.vs_end_km) || 0); // Parse vs_start_km to float and handle null/undefined
            }, 0);

            const TotalDiff2 = totalEndKm2 - totalStartKm2;
            const WeeklyDiesel2 = TotalDiff2 / avg
            const TotalPrice2 =  WeeklyDiesel2 * CurrentDieselRate;
            // console.log('Fetched Daily Task:', fetchedDailyTask);
            console.log('Total WeeklyDiesel:', WeeklyDiesel2);
            setYearlyVehicelStatusStartKM(totalStartKm2);
            setYearlyVehicelStatusEndKM(totalEndKm2);
            setYearlyVehicelStatusTotalKM(TotalDiff2);
            setYearlyVehicelStatusTotalDiesel(parseFloat(WeeklyDiesel2.toFixed(2)));
            setYearlyVehicelStatusTotalPrice(parseFloat(TotalPrice2.toFixed(2)));
        } catch (error) {
            console.error('Error fetching Diesel List:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        YearlyVehicelStatusFetch(); // Assuming fetchProducts is defined and accepts city as a parameter
    }, [vehicleID, LoginId, LoginRole, YearfirstMonthDate, YearlastMonthDate]);


    // console.log('year ' + getYear(currentYearDate)); // Logs current year
    console.log('YearfirstMonthDate ' + formatForApi(YearfirstMonthDate)); // Logs first day of the year
    console.log('YearlastMonthDate ' + formatForApi(YearlastMonthDate)); // Logs last day of the year

    useEffect(() => {
        WeeklyVehicelStatusFetch(); // Assuming fetchProducts is defined and accepts city as a parameter
    }, [vehicleID, LoginId, LoginRole, currentWeek.startOfWeek, currentWeek.endOfWeek]);

    // Year End



    //  Diesel Start 

    const [DizelLiter, setDizelLiter] = useState('');
    const [DieselAmount, setDieselAmount] = useState('');
    const [DieselRate, setDieselRate] = useState('');
    const [VehicleCurrentKM, setVehicleCurrentKM] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);

    const [selectedFuel, setSelectedFuel] = useState('Petrol');

    const handleToAddDiesel = async () => {
        try {
            setLoading(true); // Uncomment this to show loading indicator
            const formData = new FormData();

            formData.append('SubmitId', LoginId);
            formData.append('SubmitRole', LoginRole);
            formData.append('vehicleID', vehicleID);
            formData.append('fuelType', selectedFuel);
            formData.append('DizelLiter', DizelLiter);
            formData.append('DizelAmount', DieselAmount);
            formData.append('DieselRate', DieselRate);
            formData.append('VehicleCurrentKM', VehicleCurrentKM);

            // Check if an image is selected
            if (imageUri) {
                formData.append('image', {
                    uri: imageUri,
                    type: 'image/jpeg', // Adjust the type according to the image format
                    name: 'product_image.jpg', // You can specify any file name
                });
            }
            console.log('formData ' + formData);
            const response = await axios.post('https://realrate.store/AkshayUrjaSolar/Diesel_Add_Api.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log(response.data)
            if (response.data.errmessage) {
                Alert.alert('Alert', response.data.errmessage)
            } else {
                Alert.alert('Message', 'Fuel Added Now ');
                setDizelLiter('');
                setDieselAmount('');
                setDieselRate('');
                setVehicleCurrentKM('');
                setImageUri(null);
                hideDieselModal();
                DieselListFetch();

            }
            // console.log('Response:', response.data);
            // Handle the response
        } catch (error) {
            console.error('Signup failed:', error.message);
            Alert.alert('Error Message', error.message);
        } finally {
            setLoading(false); // Uncomment this to hide loading indicator
        }
    };


    const [DieselList, setDieselList] = useState([]);
    const DieselListFetch = async () => {
        try {
            setLoading(true);
            const formattedYearStartDate = formatForApi(currentWeek.startOfWeek);
            const formattedYearEndDate = formatForApi(currentWeek.endOfWeek);
            const response = await axios.get(`https://realrate.store/AkshayUrjaSolar/Diesel_Status_Fetch_Api.php?loginID=${LoginId}&loginRole=${LoginRole}&vehicle=${vehicleID}&startdate=${formattedYearStartDate}&enddate=${formattedYearEndDate}`);
            // Ensure response data is an array
            const fetchedDailyTask = Array.isArray(response.data) ? response.data : [];
            console.log('Diesel fetch lsit ' + fetchedDailyTask);
            setDieselList(fetchedDailyTask);
        } catch (error) {
            console.error('Error fetching Diesel List :', error);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        DieselListFetch(); // Assuming fetchProducts is defined and accepts city as a parameter
    }, [vehicleID, LoginId, LoginRole, currentWeek.startOfWeek, currentWeek.endOfWeek]);


    // console.log('currentWeek.startOfWeek ' + currentWeek.startOfWeek);
    // console.log('currentWeek.endOfWeek ' + currentWeek.endOfWeek);


    const [showDetails, setShowDetails] = useState(false); // State to toggle visibility

    // console.log("Selected Row:", JSON.stringify(selectedRow, null, 2));

    const handleRowClick = (item, index) => {
        const previousMeter = index > 0 ? DieselList[index - 1].current_meter : 0;
        setSelectedRow({ ...item, previousMeter }); // Set selected row data with previousMeter
        setShowDetails(true);
    };


    return (
        <SafeAreaView style={styles.PageContainer}>
            {/* <ScrollView> */}
            {/* <Pressable style={{ width: "90%", alignSelf: "center", height: 70, display: "flex", flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "15%", height: "100%", justifyContent: "center", }}>
                        <Text><MaterialIcons name='arrow-back-ios' size={30} color='black' /></Text>
                    </TouchableOpacity>
                    <View style={{ width: "85%", height: "100%", justifyContent: "center" }}>
                        <Text style={{ fontSize: 18, color: "#000", fontWeight: "700" }}>Vehicle Status  </Text>
                    </View>
                </Pressable> */}
            <Pressable style={{ width: "100%", height: "18%", }}>
                <View style={{ width: "100%", height: "57%", }}>

                    <HomeHeader />
                </View>
                {/* options  */}
                <ScrollView horizontal={true} style={styles.tabRow} >
                    <TouchableOpacity style={[styles.tabRowButton, activeTab === 'DAY' && styles.activeTabButton]} onPress={() => handleTabPress('DAY')}>
                        <Text style={[styles.TabButtonText, activeTab === 'DAY' && styles.activeTabButtonText]}>DAY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabRowButton, activeTab === 'WEEK' && styles.activeTabButton]} onPress={() => handleTabPress('WEEK')}>
                        <Text style={[styles.TabButtonText, activeTab === 'WEEK' && styles.activeTabButtonText]}>WEEK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabRowButton, activeTab === 'MONTH' && styles.activeTabButton]} onPress={() => handleTabPress('MONTH')}>
                        <Text style={[styles.TabButtonText, activeTab === 'MONTH' && styles.activeTabButtonText]}>MONTH</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabRowButton, activeTab === 'YEAR' && styles.activeTabButton]} onPress={() => handleTabPress('YEAR')}>
                        <Text style={[styles.TabButtonText, activeTab === 'YEAR' && styles.activeTabButtonText]}>YEAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabRowButton, activeTab === 'Diesel' && styles.activeTabButton]} onPress={() => handleTabPress('Diesel')}>
                        <Text style={[styles.TabButtonText, activeTab === 'Diesel' && styles.activeTabButtonText]}>FUEL</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={[styles.tabRowButton, activeTab === 'CUSTOM' && styles.activeTabButton]} onPress={() => handleTabPress('CUSTOM')}>
                            <Text style={[styles.TabButtonText, activeTab === 'CUSTOM' && styles.activeTabButtonText]}>CUSTOM</Text>
                        </TouchableOpacity> */}
                </ScrollView>
            </Pressable>


            <Pressable style={{ width: "100%", height: "82%", }}>


                {activeTab === 'DAY' &&
                    <Pressable style={{ width: "100%", alignSelf: "center" }}>
                        <View style={{ backgroundColor: "#e7e7e7", display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', height: 40, width: "100%", paddingLeft: "5%", paddingRight: "5%", borderTopWidth: 0.5, borderColor: "#c1c1c1" }}>
                            <TouchableOpacity onPress={handlePreviousDate} style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                <Text><MaterialIcons name='keyboard-arrow-left' size={30} color='#000000' /></Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 15, fontWeight: '600', color: "#000000" }}>
                                <Feather name='calendar' size={20} color='#000000' /> {formattedDate}
                            </Text>
                            <TouchableOpacity onPress={handleNextDate} style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "center" }}
                                disabled={new Date(currentDate).toDateString() === today.toDateString()} // Disable if current date is today
                            >
                                <Text style={{ color: new Date(currentDate).toDateString() === today.toDateString() ? '#a1a1a1' : '#000000' }}>
                                    <MaterialIcons name='keyboard-arrow-right' size={30} color={new Date(currentDate).toDateString() === today.toDateString() ? '#a1a1a1' : '#000000'} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {/* ledger records show */}

                        <Pressable style={{ width: "90%", height: 70, display: "flex", flexDirection: "row", alignSelf: "center", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: "60%", justifyContent: "center", }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#f01a05" }}>{vehicle} : </Text>
                            </View>
                            <Pressable style={{ width: "40%", height: 45, }}>
                                {CurrentDayStartKM != 0  ? (
                                     <TouchableOpacity onPress={() => showEndModal()} style={{ width: "90%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                     <Text style={{ backgroundColor: "#f2be25", width: 25, textAlign: "center", height: 25, verticalAlign: "middle", borderRadius: 50 }}>
                                         <Feather name='plus' size={22} color='red' />
                                     </Text>
                                     <Text style={{ color: "#000", fontWeight: "600", marginLeft: 15 }}>End KM</Text>
                                 </TouchableOpacity>
                                ) : (
                                    
                                 <TouchableOpacity onPress={() => showStartModal()} style={{ width: "90%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                 <Text style={{ backgroundColor: "#f2be25", width: 25, textAlign: "center", height: 25, verticalAlign: "middle", borderRadius: 50 }}>
                                     <Feather name='plus' size={22} color='red' />
                                 </Text>
                                 <Text style={{ color: "#000", fontWeight: "600", marginLeft: 15 }}>Add KM</Text>
                             </TouchableOpacity>
                                )}
                            </Pressable>
                        </Pressable>


                        <Pressable style={{ width: "90%", display: "flex", flexDirection: "row", flexWrap: "wrap", alignSelf: "center", borderWidth: 1.5 }}>


                            <View style={{ width: "25%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Daily Run</Text>
                            </View>
                            <View style={{ width: "25%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{
                                    CurrentDayEndKM != 0 ? (
                                        CurrentDayEndKM - CurrentDayStartKM
                                    ) : (
                                        <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>Wait..</Text>
                                    )
                                }</Text>
                            </View>
                            <View style={{ width: "25%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Rs.</Text>
                            </View>
                            <View style={{ width: "25%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{
                                    CurrentDayEndKM != 0 ? (
                                        dieselCost
                                    ) : (
                                        <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>Wait..</Text>
                                    )
                                }</Text>
                            </View>
                            <View style={{ width: "25%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Total KM</Text>
                            </View>
                            <View style={{ width: "25%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{
                                    CurrentDayEndKM != 0 ? (
                                        CurrentDayEndKM
                                    ) : (
                                        <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>Wait..</Text>
                                    )
                                }</Text>
                            </View>
                            <View style={{ width: "25%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>{CurrentfuelType}</Text>
                            </View>
                            <View style={{ width: "25%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{
                                    CurrentDayEndKM != 0 ? (
                                        diesel
                                    ) : (
                                        <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>Wait..</Text>
                                    )
                                }</Text>
                            </View>
                            <View style={{ width: "25%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Start Time </Text>
                            </View>
                            <View style={{ width: "25%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{CurrentDayStartTime}</Text>
                            </View>
                            <View style={{ width: "25%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>End Time </Text>
                            </View>
                            <View style={{ width: "25%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{
                                    CurrentDayEndKM != 0 ? (
                                        CurrentDayEndTime
                                    ) : (
                                        <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>Wait..</Text>
                                    )
                                }</Text>
                            </View>

                            <View style={{ width: "50%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Start Km</Text>
                            </View>
                            <View style={{ width: "50%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>End Km</Text>
                            </View>
                            <View style={{ width: "50%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{CurrentDayStartKM}</Text>
                            </View>
                            <View style={{ width: "50%", height: 45, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{
                                    CurrentDayEndKM != 0 ? (
                                        CurrentDayEndKM
                                    ) : (
                                        <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>Wait..</Text>
                                    )
                                }</Text>
                            </View>
                            <View style={{ width: "50%", height: 80, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Start KM Photo</Text>
                            </View>
                            <View style={{ width: "50%", height: 80, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                {CurrentDayStartImage != '' ? (
                                    <Image
                                        source={{ uri: `https://realrate.store/AkshayUrjaSolar/${CurrentDayStartImage}` }} style={{ width: "60%", height: "80%" }}
                                    />
                                ) : (
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>No Image</Text>
                                )}
                            </View>
                            <View style={{ width: "50%", height: 80, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>End KM Photo</Text>
                            </View>
                            <View style={{ width: "50%", height: 80, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                {CurrentDayEndImage != '' ? (
                                    <Image
                                        source={{ uri: `https://realrate.store/AkshayUrjaSolar/${CurrentDayEndImage}` }} style={{ width: "60%", height: "80%" }}
                                    />
                                ) : (
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>No Image</Text>
                                )}
                            </View>
                        </Pressable>

                    </Pressable>
                }

                {activeTab === 'WEEK' &&
                    <Pressable style={{ width: "100%", alignSelf: "center" }}>
                        <View style={{
                            display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center',
                            height: 50, backgroundColor: "#e7e7e7", paddingLeft: "5%", paddingRight: "5%", borderTopWidth: 0.5, borderColor: "#000"
                        }}>
                            {/* Previous Week Button */}
                            <TouchableOpacity onPress={handlePreviousWeek} style={{ width: "10%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                <Text><MaterialIcons name='keyboard-arrow-left' size={40} color='#000' /></Text>
                            </TouchableOpacity>

                            {/* Current Week Range Display */}
                            <Text style={{ fontSize: 14, fontWeight: '600', color: "#000", textAlign: 'center', width: "70%" }}>
                                <Feather name='calendar' size={13} color='#000' /> {formatDate(currentWeek.startOfWeek)} TO <Feather name='calendar' size={13} color='#000' /> {formatDate(currentWeek.endOfWeek)}
                            </Text>

                            {/* Next Week Button */}
                            <TouchableOpacity onPress={handleNextWeek} disabled={isNextWeekDisabled()} style={{ width: "10%", height: "100%", justifyContent: "center", alignItems: "center" }}   >
                                <Text style={{ color: isNextWeekDisabled() ? "#ccc" : "#000" }}>
                                    <MaterialIcons name='keyboard-arrow-right' size={40} />
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Pressable style={{ width: "90%", height: 70, alignSelf: "center", justifyContent: "center", display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                            <TouchableOpacity style={{ width: "100%", justifyContent: "center", height: "100%" }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#f01a05" }}>{vehicle} : </Text>
                            </TouchableOpacity>

                        </Pressable>


                        {/* ledger records show */}
                        <Pressable style={{ width: "90%", alignSelf: "center", }}>
                            <Pressable style={{ width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", alignSelf: "center", borderWidth: 1.5 }}>


                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}> Run Km</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{WeeklyVehicelStatusTotalKM}</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Rs.</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{Math.floor(WeeklyVehicelStatusTotalDiesel * CurrentDieselRate).toLocaleString()}</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Total KM</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{WeeklyVehicelStatusEndKM}</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>{CurrentfuelType} </Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{WeeklyVehicelStatusTotalDiesel}</Text>
                                </View>
                                <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Start KM </Text>
                                </View>
                                <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>End KM  </Text>
                                </View>
                                <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{WeeklyVehicelStatusStartKM}</Text>
                                </View>
                                <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{WeeklyVehicelStatusEndKM}</Text>
                                </View>
                            </Pressable>


                        </Pressable>

                    </Pressable>
                }
                {activeTab === 'MONTH' &&
                    <Pressable style={{ width: "100%", alignSelf: "center" }}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', height: 50, backgroundColor: "#e7e7e7", paddingLeft: "5%", paddingRight: "5%", borderTopWidth: 0.5, }}>
                            {/* Previous Month Button */}
                            <TouchableOpacity style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "center" }} onPress={handlePreviousMonth}>
                                <Text> <MaterialIcons name='keyboard-arrow-left' size={40} color='#000' /> </Text>
                            </TouchableOpacity>
                            {/* Current Month Text */}
                            <Text style={{ fontSize: 15, fontWeight: '600', color: "#000", textAlign: 'center' }}> <Feather name='calendar' size={20} color='#000' /> {formatMonthYear(firstDateOfMonth)}   </Text>
                            {/* Next Month Button */}
                            <TouchableOpacity style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "center" }} onPress={handleNextMonth} disabled={isCurrentMonth}>
                                <Text><MaterialIcons name='keyboard-arrow-right' size={40} color='#000' /></Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity  style={{ width: "90%", justifyContent: "center", height: 50, alignSelf: "center" }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#f01a05" }}>{vehicle} : </Text>
                        </TouchableOpacity>

                        {/* ledger records show */}
                        <Pressable style={{ width: "90%", alignSelf: "center", }}>
                            <Pressable style={{ width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", alignSelf: "center", borderWidth: 1.5 }}>


                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}> Run Km</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{MothlyVehicelStatusTotalKM}</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Rs.</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{Math.floor(MothlyVehicelStatusTotalDiesel * CurrentDieselRate).toLocaleString()}</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Total KM</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{MothlyVehicelStatusEndKM}</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>{CurrentfuelType} </Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{MothlyVehicelStatusTotalDiesel}</Text>
                                </View>
                                <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Start KM </Text>
                                </View>
                                <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>End KM  </Text>
                                </View>
                                <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{MothlyVehicelStatusStartKM}</Text>
                                </View>
                                <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{MothlyVehicelStatusEndKM}</Text>
                                </View>
                            </Pressable>


                        </Pressable>
                    </Pressable>
                }
                {activeTab === 'YEAR' &&
                    <Pressable style={{ width: "100%", alignSelf: "center" }}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', height: 50 ,backgroundColor: "#e7e7e7", paddingLeft: "5%", paddingRight: "5%", borderTopWidth: 0.5, }}>
                            {/* Previous Year Button */}
                            <TouchableOpacity style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "center" }} onPress={handlePreviousYear}>
                                <Text>   <MaterialIcons name='keyboard-arrow-left' size={40} color='black' />  </Text>
                            </TouchableOpacity>

                            {/* Current Year Text */}
                            <Text style={{ fontSize: 17, fontWeight: '600', color: "black", textAlign: 'center' }}>
                                <Feather name='calendar' size={15} color='black' /> {getYear(currentYearDate)}
                            </Text>
                            {/* Next Year Button */}
                            <TouchableOpacity style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "center", opacity: isCurrentYear ? 0.5 : 1 }} onPress={handleNextYear} disabled={isCurrentYear}>
                                <Text> <MaterialIcons name='keyboard-arrow-right' size={40} color='black' />  </Text>
                            </TouchableOpacity>
                        </View>


                        <TouchableOpacity style={{ width: "90%", justifyContent: "center", height: 50, alignSelf: "center" }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#f01a05" }}>{vehicle} : </Text>
                        </TouchableOpacity>

                        
                        {/* ledger records show */}
                        <Pressable style={{ width: "90%", alignSelf: "center", }}>
                            <Pressable style={{ width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", alignSelf: "center", borderWidth: 1.5 }}>


                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}> Run Km</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{YearlyVehicelStatusTotalKM}</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Rs.</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{Math.floor(YearlyVehicelStatusTotalDiesel * CurrentDieselRate).toLocaleString()}</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Total KM</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{YearlyVehicelStatusEndKM}</Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>{CurrentfuelType} </Text>
                                </View>
                                <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{YearlyVehicelStatusTotalDiesel}</Text>
                                </View>
                                <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Start KM </Text>
                                </View>
                                <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>End KM  </Text>
                                </View>
                                <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{YearlyVehicelStatusStartKM}</Text>
                                </View>
                                <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{YearlyVehicelStatusEndKM}</Text>
                                </View>
                            </Pressable>


                        </Pressable>

                    </Pressable>
                }

                {activeTab === 'Diesel' &&
                    <Pressable style={{ width: "100%", alignSelf: "center" }}>

                        <View style={{
                            display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center',
                            height: 50, backgroundColor: "#e7e7e7", paddingLeft: "5%", paddingRight: "5%", borderTopWidth: 0.5, borderColor: "#000"
                        }}>
                            {/* Previous Week Button */}
                            <TouchableOpacity onPress={handlePreviousWeek} style={{ width: "10%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                <Text><MaterialIcons name='keyboard-arrow-left' size={40} color='#000' /></Text>
                            </TouchableOpacity>

                            {/* Current Week Range Display */}
                            <Text style={{ fontSize: 14, fontWeight: '600', color: "#000", textAlign: 'center', width: "70%" }}>
                                <Feather name='calendar' size={13} color='#000' /> {formatDate(currentWeek.startOfWeek)} TO <Feather name='calendar' size={13} color='#000' /> {formatDate(currentWeek.endOfWeek)}
                            </Text>

                            {/* Next Week Button */}
                            <TouchableOpacity onPress={handleNextWeek} disabled={isNextWeekDisabled()} style={{ width: "10%", height: "100%", justifyContent: "center", alignItems: "center" }}   >
                                <Text style={{ color: isNextWeekDisabled() ? "#ccc" : "#000" }}>
                                    <MaterialIcons name='keyboard-arrow-right' size={40} />
                                </Text>
                            </TouchableOpacity>
                        </View>


                        <Pressable style={{ width: "90%", height: 70, alignSelf: "center", justifyContent: "center", display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                            <TouchableOpacity onPress={() => setShowDetails(false)} style={{ width: "60%", justifyContent: "center", }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#f01a05" }}>{vehicle} : </Text>
                            </TouchableOpacity>
                            <Pressable style={{ width: "40%", height: 45 }}>
                                <TouchableOpacity onPress={() => showDieselModal()} style={{ width: "90%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ backgroundColor: "#f2be25", width: 25, textAlign: "center", height: 25, verticalAlign: "middle", borderRadius: 50 }}>
                                        <Feather name='plus' size={22} color='red' />
                                    </Text>
                                    <Text style={{ color: "#000", fontWeight: "600", marginLeft: 15 }}>Add Fuel</Text>
                                </TouchableOpacity>
                            </Pressable>





                            <Pressable style={{ width: "100%", alignSelf: "center" }}>

                                {!showDetails ? (
                                    DieselList.length > 0 ? (
                                        DieselList.map((item, index) => {
                                            // Calculate the difference with the previous row's current_meter
                                            const previousMeter = index > 0 ? DieselList[index - 1].current_meter : 0;
                                            const meterDifference = item.current_meter - previousMeter;

                                            return (
                                                <TouchableOpacity key={index} style={{
                                                    width: "100%", borderBottomWidth: 0.4, borderColor: "#000000", padding: 5, flexDirection: "row", alignSelf: "center",flexWrap:"wrap"
                                                }} onPress={() => handleRowClick(item, index)} >
                                                    <View style={{ width: "50%" }}>
                                                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#000", lineHeight: 30 }}>
                                                            Run Km {previousMeter != 0 ? (
                                                                <Text style={{ fontSize: 12, fontWeight: "500", color: "#f01a05" }}> {meterDifference} </Text>
                                                            ) : (
                                                                <Text style={{ fontSize: 12, fontWeight: "500", color: "#f01a05" }}> 0 </Text>
                                                            )
                                                            }
                                                        </Text>
                                                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#000", lineHeight: 30 }}>
                                                            Total KM <Text style={{ fontSize: 12, fontWeight: "500", color: "#f01a05" }}>{item.current_meter}</Text>
                                                        </Text>
                                                    </View>
                                                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                                                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#000", lineHeight: 30 }}>
                                                            Rs. <Text style={{ fontSize: 12, fontWeight: "500", color: "#f01a05" }}>{item.Diesel_amount}</Text>
                                                        </Text>
                                                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#000", lineHeight: 30 }}>
                                                            Date : {formatDates(item.AddedOn)}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    ) : (
                                        <View style={{ width: "100%", height: 300, justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: 17, fontWeight: "800", color: "#000", textAlign: "center" }}>There's No Fuel Record's</Text>
                                        </View>
                                    )) : (
                                    <Pressable style={{ width: "90%", display: "flex", flexDirection: "row", flexWrap: "wrap", alignSelf: "center", borderWidth: 1.5 }}>

                                        <View style={{ width: "50%", height: 80, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                            <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>  Photo</Text>
                                        </View>
                                        <View style={{ width: "50%", height: 80, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                            <Image
                                                source={{ uri: `https://realrate.store/AkshayUrjaSolar/${selectedRow.Diesel_Image}` }} style={{ width: "60%", height: "80%" }}
                                            />
                                        </View>

                                        <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                            <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Diesel Rate .</Text>
                                        </View>
                                        <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                            <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{selectedRow.diesel_liter_rate}</Text>
                                        </View>
                                        <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                            <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Diesel qty</Text>
                                        </View>
                                        <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                            <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{selectedRow.Diesel_liter}</Text>
                                        </View>
                                        <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                            <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Total KM</Text>
                                        </View>
                                        <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                            <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{selectedRow.current_meter - selectedRow.previousMeter}</Text>
                                        </View>
                                        <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                            <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Rs. </Text>
                                        </View>
                                        <View style={{ width: "25%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                            <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{selectedRow.Diesel_amount}</Text>
                                        </View>
                                        <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                            <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Current Km </Text>
                                        </View>
                                        <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                            <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{selectedRow.current_meter}</Text>
                                        </View>

                                        <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                            <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21 }}>Prev KM</Text>
                                        </View>
                                        <View style={{ width: "50%", height: 60, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderColor: "#000" }}>
                                            <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 21, color: "#f01a05" }}>{selectedRow.previousMeter}</Text>
                                        </View>
                                    </Pressable>
                                )}

                            </Pressable>




                        </Pressable>
                    </Pressable>
                }

                {/* Vehicle Start Modal */}

                <Modal visible={StartVisible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
                    <ScrollView>
                        <Pressable style={{ width: "85%", alignSelf: "center", height: 100, display: "flex", flexDirection: "row", }}>
                            <View style={{ width: "85%", height: "100%", justifyContent: "center" }}>
                                <Text style={{ fontSize: 18, color: "#000", fontWeight: "700" }}>Add KM  </Text>
                            </View>
                            <TouchableOpacity onPress={() => hideStartModal()} style={{ width: "15%", height: "100%", justifyContent: "center", }}>
                                <Text><Entypo name='cross' size={50} color='black' /></Text>
                            </TouchableOpacity>
                        </Pressable>

                        <Pressable style={{ width: "90%", alignSelf: "center", padding: 5, }}>
                            <TextInput placeholder=' Start KM ' placeholderTextColor='#000' multiline={true} onChangeText={(text) => setvehicleKM(text)} value={vehicleKM} style={styles.customerInput} />
                            <TextInput placeholder='Start Time' placeholderTextColor='#000' multiline={true} value={formattedTime} onFocus={() => setShowPicker(true)} showSoftInputOnFocus={false} style={styles.customerInput} />
                            <TouchableOpacity onPress={selectImage} style={{ width: "100%", height: 130, justifyContent: "center", alignItems: "center", borderWidth: 1, borderRadius: 6, overflow: "hidden" }}>
                                {imageUri != null ? (
                                    <Image
                                        source={{ uri: imageUri }}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                ) : (
                                    <View>
                                        <EvilIcons name="image" size={100} color="#000" />
                                        <Text>Upload Start KM</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                            {loading ? (
                                <View style={{ width: "100%", height: 45, marginTop: 5, alignSelf: "center", marginTop: 20 }}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                            ) : (
                                <View style={{ width: "100%", height: 45, marginTop: 5, alignSelf: "center", marginTop: 20 }}>
                                    <TouchableOpacity onPress={() => handleToStartVegicleStatus()} style={styles.btn}>
                                        <Text style={{ color: "#000", fontWeight: "600", }}>Start Now</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {showPicker && (
                                <DateTimePicker value={time} mode="time" display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={onTimeChange} />
                            )}
                        </Pressable>
                    </ScrollView>
                </Modal>

                {/* Vehicle Start Modal */}
                {/* Diesel Start Modal */}

                <Modal visible={DieselVisible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
                    <ScrollView>
                        <Pressable style={{ width: "85%", alignSelf: "center", height: 100, display: "flex", flexDirection: "row", }}>
                            <View style={{ width: "85%", height: "100%", justifyContent: "center" }}>
                                <Text style={{ fontSize: 18, color: "#000", fontWeight: "700" }}>Add Diesel  </Text>
                            </View>
                            <TouchableOpacity onPress={() => hideDieselModal()} style={{ width: "15%", height: "100%", justifyContent: "center", }}>
                                <Text><Entypo name='cross' size={50} color='black' /></Text>
                            </TouchableOpacity>
                        </Pressable>

                        <Pressable style={{ width: "90%", alignSelf: "center", padding: 5, }}>
                        <View style={{width:"100%",height:60,display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
            <Text style={{width:"100%",fontSize:16,fontWeight:"600",color:"#000"}}>Select Fuel</Text>
            {/* Petrol Option */}
            <TouchableOpacity 
                style={styles.radioContainer} 
                onPress={() => setSelectedFuel('Petrol')}
            >
                <View style={[styles.radioButton, selectedFuel === 'Petrol' && styles.radioButtonSelected]} />
                <Text style={styles.radioText}>Petrol</Text>
            </TouchableOpacity>
            
            {/* Diesel Option */}
            <TouchableOpacity 
                style={styles.radioContainer} 
                onPress={() => setSelectedFuel('Diesel')}
            >
                <View style={[styles.radioButton, selectedFuel === 'Diesel' && styles.radioButtonSelected]} />
                <Text style={styles.radioText}>Diesel</Text>
            </TouchableOpacity>

            {/* <Text style={styles.selectionText}>
                Selected Fuel: {selectedFuel || 'None'}
            </Text> */}
        </View>

                            <TextInput placeholder='Fuel Liter ' placeholderTextColor='#000' multiline={true} onChangeText={(text) => setDizelLiter(text)} value={DizelLiter} keyboardType="numeric" style={styles.customerInput} />
                            <TextInput placeholder='Fuel Liter Rate ' placeholderTextColor='#000' multiline={true} onChangeText={(text) => setDieselRate(text)} keyboardType="numeric" value={DieselRate} style={styles.customerInput} />
                            <TextInput placeholder='Fuel Amount ' placeholderTextColor='#000' multiline={true} onChangeText={(text) => setDieselAmount(text)} keyboardType="numeric" value={DieselAmount} style={styles.customerInput} />
                            <TextInput placeholder='Vehicle Current KM ' placeholderTextColor='#000' multiline={true} onChangeText={(text) => setVehicleCurrentKM(text)} keyboardType="numeric" value={VehicleCurrentKM} style={styles.customerInput} />
                            <TouchableOpacity onPress={selectImage} style={{ width: "100%", height: 130, justifyContent: "center", alignItems: "center", borderWidth: 1, borderRadius: 6, overflow: "hidden" }}>
                                {imageUri != null ? (
                                    <Image
                                        source={{ uri: imageUri }}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                ) : (
                                    <View>
                                        <EvilIcons name="image" size={100} color="#000" />
                                        <Text>Upload  Diesel Meter </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                            {loading ? (
                                <View style={{ width: "100%", height: 45, marginTop: 5, alignSelf: "center", marginTop: 20 }}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                            ) : (
                                <View style={{ width: "100%", height: 45, marginTop: 5, alignSelf: "center", marginTop: 20 }}>
                                    <TouchableOpacity onPress={() => handleToAddDiesel()} style={styles.btn}>
                                        <Text style={{ color: "#000", fontWeight: "600", }}> Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {showPicker && (
                                <DateTimePicker value={time} mode="time" display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={onTimeChange} />
                            )}
                        </Pressable>
                    </ScrollView>
                </Modal>

                {/* Diesel End Modal */}

                {/* Vehicle End Modal */}

                <Modal visible={EndVisible} style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
                    <Pressable style={{ width: "90%", alignSelf: "center", height: 100, display: "flex", flexDirection: "row", marginBottom: 10 }}>
                        <View style={{ width: "85%", height: "100%", justifyContent: "center" }}>
                            <Text style={{ fontSize: 18, color: "#000", fontWeight: "700" }}>End KM</Text>
                        </View>
                        <TouchableOpacity onPress={() => hideEndModal()} style={{ width: "15%", height: "100%", justifyContent: "center", }}>
                            <Text><Entypo name='cross' size={50} color='black' /></Text>
                        </TouchableOpacity>
                    </Pressable>

                    <Pressable style={{ width: "90%", alignSelf: "center", padding: 5 }}>
                        <TextInput placeholder='Start Time' placeholderTextColor='#000' multiline={true} value={formattedTime} onFocus={() => setShowPicker(true)} showSoftInputOnFocus={false} style={styles.customerInput} />
                        <TextInput placeholder='Enter End KM ' placeholderTextColor='#000' multiline={true} onChangeText={(text) => setvehicleKM(text)} value={vehicleKM} style={styles.customerInput} />
                        <TextInput placeholder='Enter KM ' placeholderTextColor='#000' multiline={true} onChangeText={(text) => setstatusID(text)} value={statusID} style={{ display: "none" }} />
                        <TouchableOpacity onPress={selectImage} style={{ width: "100%", height: 130, justifyContent: "center", alignItems: "center", borderWidth: 1, borderRadius: 6, overflow: "hidden" }}>
                            {imageUri != null ? (
                                <Image
                                    source={{ uri: imageUri }}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            ) : (
                                <EvilIcons name="image" size={100} color="#000" />
                            )}
                        </TouchableOpacity>
                        <View style={{ width: "100%", height: 45, marginTop: 5, alignSelf: "center", marginTop: 20 }}>
                            <TouchableOpacity onPress={() => handleToEndVegicleStatus()} style={styles.btn}>
                                <Text style={{ color: "#000", fontWeight: "600", }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        {showPicker && (
                            <DateTimePicker value={time} mode="time" display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={onTimeChange} />
                        )}
                    </Pressable>
                </Modal>

                {/* Vehicle End Modal */}
            </Pressable>


            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

export default VehicleStatus

const styles = StyleSheet.create({
    PageContainer: { backgroundColor: "#fff", height: "100%" },
    customerInput: { backgroundColor: "#fff", borderWidth: 1, width: "100%", borderRadius: 5, marginTop: 5, marginBottom: 5, paddingLeft: 15 },
    btn: { width: "100%", height: "100%", backgroundColor: "#f2be25", borderWidth: 1, borderColor: "#000", borderRadius: 6, justifyContent: "center", alignItems: "center" },
    table: { width: "100%", alignSelf: "center", marginTop: 30, marginBottom: 30 },
    thead: { width: "100%", height: 60, display: "flex", flexDirection: "row" },
    theadCol1: { width: 100, justifyContent: "center", alignItems: "center", backgroundColor: "#f2be25", borderRadius: 4 },
    theadText: { color: "#000", fontSize: 16, fontWeight: "500" },
    theadColDesc: { width: 200, justifyContent: "center", alignItems: "center", backgroundColor: "#f2be25", borderRadius: 4 },
    theadColKM: { width: 100, justifyContent: "center", alignItems: "center", backgroundColor: "#f2be25", borderRadius: 4 },
    tbody: { width: "100%", display: "flex", flexDirection: "row", marginTop: 5 },
    tbodyCol1: { width: 100, justifyContent: "center", alignItems: "center", backgroundColor: "#F6F5F3", borderWidth: 1, borderStyle: "dotted", borderColor: "#D9D9D9" },
    tbodyText: { color: "#1E1E1E", fontSize: 14, fontWeight: "500", lineHeight: 18 },
    tbodyText1: { color: "#1E1E1E", fontSize: 11, fontWeight: "500" },
    tbodyColDesc: { width: 200, justifyContent: "center", backgroundColor: "#F6F5F3", borderWidth: 1, borderStyle: "dotted", borderColor: "#D9D9D9", padding: 5 },
    tbodyColKM: { width: 100, justifyContent: "center", alignItems: "center", backgroundColor: "#F6F5F3", borderWidth: 1, borderStyle: "dotted", borderColor: "#D9D9D9" },
    tabRow: {
        width: "100%",
        paddingLeft: "5%",
        height: 50,
        paddingTop: 10,
        backgroundColor: "#e7e7e7",

    },
    tabRowButton: {
        marginRight: 5,
        height: 30,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,

    },
    activeTabButton: { backgroundColor: "#f01a05" },
    TabButtonText: { color: "#000", fontWeight: "600" },
    activeTabButtonText: { color: "#fff", fontWeight: "600" },
 radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        width:"40%"
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#f2be25',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioText: {
        fontSize: 16,
        color: '#000000',
        fontWeight:"600"
    },
    radioButtonSelected: {
        backgroundColor: '#f2be25',
    },

})