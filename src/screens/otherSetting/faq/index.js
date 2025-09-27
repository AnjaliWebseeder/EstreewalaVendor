import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import Header from "../../../components/header";
import appColors from '../../../theme/appColors';
import { SafeAreaView } from 'react-native-safe-area-context';

const FAQS = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "Browse products, add to cart, proceed to checkout, select payment method, and confirm your order."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept and cash on delivery."
    },
    {
      question: "How can I track my order?",
      answer: "You'll receive tracking updates via SMS/email. You can also check in 'My Orders' section."
    },
    {
      question: "What is your return policy?",
      answer: "Most items can be returned within 30 days if unused with original packaging."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 3-7 business days. Express delivery available in select cities."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently we only ship within India. International shipping coming soon."
    },
  ];
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // ✅ Filter FAQs based on search input
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
   <SafeAreaView style={styles.container}>
     <View style={styles.container}>
       <Header
        title="FAQ"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.faqContainer}>
          {filteredFaqs.length === 0 ? (
            <Text style={{ color: appColors.font, marginTop: 10 }}>No FAQs found.</Text>
          ) : (
            filteredFaqs.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() => toggleFAQ(index)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <Icon
                    name={activeIndex === index ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    size={22}
                    color={appColors.font}
                  />
                </TouchableOpacity>

                {activeIndex === index && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))
          )}
        </View>

        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Still need help?</Text>
          <Text style={styles.helpText}>Contact our 24/7 customer support</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ContactSupport')}
            style={styles.helpButton}
          >
            <Text style={styles.helpButtonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
   </SafeAreaView>
  );
};

export default FAQS;
