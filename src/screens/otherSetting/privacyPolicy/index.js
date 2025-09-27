import { ScrollView, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from "../../../components/header";
import { styles } from './styles';
import appColors from '../../../theme/appColors';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrivacyPolicy = ({ navigation }) => {
  return (
   <SafeAreaView style={styles.container}>
     <View style={styles.container}>
       <Header
        title="Privacy Policy"
        onBack={() => navigation.goBack()}
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Commitment to Your Privacy</Text>
          <Text style={styles.sectionText}>
            We take your privacy seriously. This policy explains what personal data we collect, 
            how we use it, and your rights regarding your information.
          </Text>
        </View>
        <View style={[styles.policyItem,{paddingVertical:8,paddingBottom:12}]}/>
        {/* Policy Sections */}
        <View style={styles.policySection}>
          <View style={styles.policyItem}>
            <Icon name="security" size={20} color={appColors.black} style={styles.policyIcon} />
            <View style={styles.policyTextContainer}>
              <Text style={styles.policyTitle}>Information We Collect</Text>
              <Text style={styles.policyText}>
                We collect information you provide during registration, purchases, 
                and when you contact our support team.
              </Text>
            </View>
          </View>

          <View style={styles.policyItem}>
            <Icon name="how-to-reg" size={20} color={appColors.black} style={styles.policyIcon} />
            <View style={styles.policyTextContainer}>
              <Text style={styles.policyTitle}>How We Use Your Data</Text>
              <Text style={styles.policyText}>
                To process orders, improve our services, personalize your experience, 
                and communicate with you.
              </Text>
            </View>
          </View>

          <View style={styles.policyItem}>
            <Icon name="share" size={20} color={appColors.black} style={styles.policyIcon} />
            <View style={styles.policyTextContainer}>
              <Text style={styles.policyTitle}>Data Sharing</Text>
              <Text style={styles.policyText}>
                We only share data with trusted partners for order fulfillment and 
                never sell your information.
              </Text>
            </View>
          </View>

          <View style={styles.policyItem}>
            <Icon name="lock" size={20} color={appColors.black} style={styles.policyIcon} />
            <View style={styles.policyTextContainer}>
              <Text style={styles.policyTitle}>Security Measures</Text>
              <Text style={styles.policyText}>
                We use encryption, secure servers, and regular audits to protect your data.
              </Text>
            </View>
          </View>

          <View style={[styles.policyItem,{borderBottomWidth:0}]}>
            <Icon name="edit" size={20} color={appColors.black} style={styles.policyIcon} />
            <View style={styles.policyTextContainer}>
              <Text style={styles.policyTitle}>Your Rights</Text>
              <Text style={styles.policyText}>
                You can access, correct, or delete your personal information anytime.
              </Text>
            </View>
          </View>
        </View>

        {/* Last Updated */}
        <View style={styles.updateSection}>
          <Text style={styles.updateText}>Last updated: September 5, 2025</Text>
        </View>
      </ScrollView>
    </View>
   </SafeAreaView>
  );
};

export default PrivacyPolicy;