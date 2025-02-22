import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Text, FlatList, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const Aboutus = () => {
  const navigation = useNavigation();

  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    { 
      id: 1, 
      question: "1. Who We Are", 
      answer: "AkshayUrjaSolar is a leading provider of solar energy solutions. We offer a variety of services including the installation, maintenance, and monitoring of photovoltaic (PV) systems. Our goal is to deliver sustainable energy solutions to meet the needs of individuals, businesses, and industries, contributing to a cleaner, greener future." 
    },
    { 
      id: 2, 
      question: "2. Our Vision", 
      answer: "At AkshayUrjaSolar, our vision is to be a global leader in renewable energy, providing efficient and cost-effective solar solutions. We aim to inspire communities and organizations worldwide to adopt solar energy, helping them achieve sustainability while reducing their environmental impact." 
    },
    { 
      id: 3, 
      question: "3. Why Choose Us", 
      answer: "We prioritize quality and customer satisfaction. With our years of experience in the industry, we provide tailored solutions that meet the unique needs of each client. Our services are reliable, cost-effective, and environmentally friendly." 
    },
    { 
      id: 4, 
      question: "4. Our Services", 
      answer: "Our services include: \n 1. Solar Panel Installation \n 2. Solar System Maintenance \n 3. Energy Monitoring \n 4. Consultation and Design \n 5. Solar System Upgrades and Repairs" 
    },
    { 
      id: 5, 
      question: "5. Our Commitment to Sustainability", 
      answer: "We are committed to making a positive impact on the environment. By promoting the use of renewable energy and reducing dependency on fossil fuels, we aim to contribute to global efforts in combating climate change." 
    },
    { 
      id: 6, 
      question: "6. Contact Us", 
      answer: "For any inquiries, please reach out to us at: \nEmail: yes@akshayurja63.com \nPhone: +91 98908 28999 \nAddress: Trimurti Mall, Akole bypass road, Sangamner, Tal- Sangamner, Dist - A.Nagar. Pin Code - 422605, Maharashtra, India."
    },
    {
      id: 7,
      question: "7. Customer Testimonials",
      answer: "We have helped numerous clients achieve their energy goals. Here are a few testimonials from our satisfied customers: \n1. 'Excellent service and quality installation. Highly recommend AkshayUrjaSolar!' – Rajesh K. \n2. 'Their team is professional, and the solar system they installed has been working perfectly.' – Meena R."
    },
    {
      id: 8,
      question: "8. Service Areas",
      answer: "We provide services across Maharashtra and select regions in India. Whether you’re in urban or rural areas, we are ready to assist with solar energy solutions."
    },
    {
      id: 9,
      question: "9. Warranty and Support",
      answer: "We offer comprehensive warranty on all our solar panels and systems. In addition, we provide continuous support for system maintenance, troubleshooting, and repairs to ensure optimal performance."
    },
    {
      id: 10,
      question: "10. Safety Measures",
      answer: "Our team follows the highest safety standards during installation and maintenance of solar systems. We ensure compliance with local and international safety regulations to protect our clients and staff."
    },
    {
      id: 11,
      question: "11. Cost and Financing Options",
      answer: "We offer affordable pricing for our services and also provide financing options, including EMI schemes and solar loans, to make it easier for you to switch to solar energy. Please contact us for more details."
    },
    {
      id: 12,
      question: "12. Certifications and Partnerships",
      answer: "AkshayUrjaSolar is certified by recognized industry standards such as the Bureau of Indian Standards (BIS), and we are proud to partner with top-tier solar manufacturers and service providers to bring you the best solutions."
    }
  ];
  

  const toggleExpanded = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); 
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.PageContainer}>
      <ScrollView>
        <View style={{ paddingHorizontal: 20, paddingTop: 30, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#f2be25" }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: "center", alignItems: "center", alignSelf: 'center' }}>
              <AntDesign name="left" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'black', alignSelf: 'center' }}>About Us</Text>
          <View></View>
        </View>

        {/* About Section */}
        <View style={styles.introductionContainer}>
          <Text style={styles.introductionText}>
            Welcome to AkshayUrjaSolar! We are passionate about providing sustainable solar energy solutions that help reduce your carbon footprint and save on energy costs. With years of experience in the solar industry, we specialize in offering top-tier installation, maintenance, and monitoring services for photovoltaic systems.
          </Text>
        </View>

        {/* FAQs Section */}
        <View style={styles.faqsContainer}>
          {/* Render FAQ items */}
          <FlatList
            data={faqs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.faqItem}>
                <TouchableOpacity onPress={() => toggleExpanded(index)} style={styles.faqTouchable}>
                  <Text style={styles.faqText}>{item.question}</Text>
                  <Feather name={expandedIndex === index ? "chevron-down" : "chevron-right"} 
                    size={20} color="black" style={styles.icon} />
                </TouchableOpacity>
                {expandedIndex === index && (
                  <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Aboutus;

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  faqsContainer: {marginTop: 10,marginBottom:20},
  faqItem: {padding: 20,borderBottomWidth: 0.3,borderColor: "#000",paddingVertical: 20,paddingHorizontal: 30,},
  faqTouchable: {flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width: '100%',},
  faqText: {fontSize: 16,color: 'black',flex: 1,fontWeight:'bold'},
  icon: {marginLeft: 10,},
  answerContainer: {marginTop: 10,},
  answerText: {fontSize: 14,color: '#555'},
  dateContainer: { paddingHorizontal: 20,paddingVertical:10, marginTop:20 },
  dateText: { fontSize: 14, color: 'black', fontWeight: 'bold' },
  introductionContainer: { paddingHorizontal: 20, marginTop:20},
  introductionText: { fontSize: 14, color: '#555' },
});
