import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { VendorContext } from '../../../utils/context/vendorContext';
import appColors from '../../../theme/appColors';
import { windowWidth } from '../../../theme/appConstant';

export default function VendorBranchCard({ branch, navigation }) {
  const { deleteBranch } = useContext(VendorContext);

  // Reusable info row
  const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
      <Icon name={icon} size={16} color={appColors.secondary} style={styles.infoIcon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.infoText}>{label}</Text>
        <Text style={styles.detail}>{value || '-'}</Text>
      </View>
    </View>
  );

  // Fields to render dynamically
  const rows = [
    [
      { icon: 'business', label: 'Branch Name', value: branch.branchName },
    ],
    [
      { icon: 'person-outline', label: 'First Name', value: branch.contactFirst },
      { icon: 'person-outline', label: 'Last Name', value: branch.contactLast },
    ],
    [
      { icon: 'call-outline', label: 'Mobile No', value: branch.primary },
      { icon: 'logo-whatsapp', label: 'Whatsapp Number', value: branch.whatsapp },
    ],
    [
      { icon: 'location-outline', label: 'Address', value: branch.address },
      { icon: 'navigate-outline', label: 'PinCode', value: branch.pincode },
    ],
    [
      { icon: 'map-outline', label: 'State', value: branch.state },
      { icon: 'home-outline', label: 'City', value: branch.city },
    ],
  ];

  return (
    <View style={styles.ownerCard}>
      {/* Header Row */}
      <View style={styles.ownerHeader}>
        <Text style={styles.cardTitle}>Branch Details</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddBranch', { branch })}
            style={styles.editBtn}
          >
            <Icon name="create-outline" size={14} color="green" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteBranch(branch.id)}
            style={styles.deleteBtn}
          >
            <Icon name="trash-outline" size={14} color={appColors.error} />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Branch Info */}
      <View style={styles.main}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.rowStyle}>
            {row.map((field, index) => (
              <View
                key={index}
                style={{
                  flex: row.length === 1 ? 1 : undefined,
                  width: row.length > 1 ? windowWidth(190) : undefined,
                }}
              >
                <InfoRow {...field} />
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
