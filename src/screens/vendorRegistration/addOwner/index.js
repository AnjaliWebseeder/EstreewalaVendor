import React, { useContext, useState } from 'react';
import { 
  View, 
  Text, 
  Switch, 
  TouchableOpacity, 
  Alert, 
  ScrollView 
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/header';
import InputField from '../../../components/InputField';
import { VendorContext } from '../../../utils/context/vendorContext';
import { styles } from './styles';
import CustomButton from '../../../components/button';
import appColors from '../../../theme/appColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { windowHeight } from '../../../theme/appConstant';

export default function AddOwner({ navigation, route }) {
  const { addOwner, editOwner } = useContext(VendorContext);
  const editingOwner = route.params?.owner;

  const [firstName, setFirstName] = useState(editingOwner?.firstName || '');
  const [lastName, setLastName] = useState(editingOwner?.lastName || '');
  const [primary, setPrimary] = useState(editingOwner?.primary || '');
  const [whatsapp, setWhatsapp] = useState(editingOwner?.whatsapp || '');
  const [sameAsPrimary, setSameAsPrimary] = useState(false);
  const [governmentId, setGovernmentId] = useState(editingOwner?.governmentId || null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle image selection from gallery
  const handleSelectFromGallery = async () => {
    try {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        quality: 0.8,
        selectionLimit: 1,
      };

      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        Alert.alert('Error', 'Failed to select image. Please try again.');
      } else if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];

        if (asset.fileSize > 5 * 1024 * 1024) {
          Alert.alert('File Too Large', 'Please select a file smaller than 5MB');
          return;
        }

        const selectedFile = {
          uri: asset.uri,
          type: asset.type || 'image/jpeg',
          name: asset.fileName || `government_id_${Date.now()}.jpg`,
          size: asset.fileSize,
        };

        setGovernmentId(selectedFile);
      }
    } catch (error) {
      console.log('Image picker error:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setGovernmentId(null);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Validation
  const validate = () => {
    let newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!primary.trim() || primary.length !== 10) newErrors.primary = 'Enter valid primary number';
    if (!sameAsPrimary && (!whatsapp.trim() || whatsapp.length !== 10))
      newErrors.whatsapp = 'Enter valid whatsapp number';
    if (!governmentId) newErrors.governmentId = 'Government ID is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const submit = () => {
  if (!validate()) return;

  const newOwner = { 
    firstName, 
    lastName, 
    primary, 
    whatsapp: sameAsPrimary ? primary : whatsapp,
    governmentId 
  };

  if (editingOwner) {
    // Update existing owner
    editOwner(editingOwner.id, newOwner);
  } else {
    // Add new owner
    addOwner(newOwner);
  }

  navigation.goBack();
};


  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={styles.mainContainer}>
          <Header title="Add New Owner" onBack={() => navigation.goBack()} />

          <View style={styles.container}>
            <InputField
              label="First Name*"
              value={firstName}
              onChangeText={(t) => {
                setFirstName(t);
                if (errors.firstName) setErrors({ ...errors, firstName: null });
              }}
              placeholder="e.g. Nick"
              error={errors.firstName}
            />

            <InputField
              label="Last Name*"
              value={lastName}
              onChangeText={(t) => {
                setLastName(t);
                if (errors.lastName) setErrors({ ...errors, lastName: null });
              }}
              placeholder="e.g. Rao"
              error={errors.lastName}
            />

            <InputField
              label="Primary Number*"
              value={primary}
              keyboardType="phone-pad"
              onChangeText={(t) => {
                setPrimary(t);
                if (errors.primary) setErrors({ ...errors, primary: null });
              }}
              placeholder="e.g. 1234567890"
              error={errors.primary}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontWeight: '500' }}>Same as primary number</Text>
              <Switch 
                value={sameAsPrimary} 
                onValueChange={(val) => { 
                  setSameAsPrimary(val); 
                  if (val) setWhatsapp(primary); 
                }} 
                trackColor={{ false: appColors.border, true: appColors.blue }}
                thumbColor={sameAsPrimary ? appColors.white : appColors.white}
              />
            </View>

            {!sameAsPrimary && (
              <InputField
                label="Whatsapp Number*"
                value={whatsapp}
                keyboardType="phone-pad"
                onChangeText={(t) => {
                  setWhatsapp(t);
                  if (errors.whatsapp) setErrors({ ...errors, whatsapp: null });
                }}
                placeholder="e.g. 1234567890"
                error={errors.whatsapp}
              />
            )}

            {/* Government ID Upload */}
            <View style={styles.uploadSection}>
              <Text style={styles.uploadLabel}>Government ID*</Text>
              <Text style={styles.uploadSubtitle}>
                Upload Aadhaar Card, PAN Card, or other government ID (JPG, PNG, max 5MB, PDF)
              </Text>

              {governmentId ? (
                <View style={styles.fileContainer}>
                  <View style={styles.fileInfo}>
                    <Icon name="document-attach" size={24} color={appColors.secondary} />
                    <View style={styles.fileDetails}>
                      <Text style={styles.fileName} numberOfLines={1}>
                        {governmentId.name}
                      </Text>
                      <Text style={styles.fileSize}>
                        {formatFileSize(governmentId.size)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={handleRemoveFile} style={styles.removeButton}>
                    <Icon name="close-circle" size={20} color={appColors.error} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity 
                  style={[styles.uploadButton, errors.governmentId && styles.uploadButtonError]}
                  onPress={handleSelectFromGallery}
                  disabled={uploading}
                >
                  <Icon 
                    name="images" 
                    size={24} 
                    color={errors.governmentId ? appColors.error : appColors.secondary} 
                  />
                  <Text style={[styles.uploadButtonText, errors.governmentId && styles.uploadButtonTextError]}>
                    {uploading ? 'Uploading...' : 'Upload Government ID'}
                  </Text>
                </TouchableOpacity>
              )}

              {errors.governmentId && <Text style={styles.errorText}>{errors.governmentId}</Text>}
            </View>
          </View>

          <CustomButton 
            buttonContainerStyle={{ marginHorizontal: windowHeight(15) }} 
            title={editingOwner ? 'Update' : 'Submit'} 
            onPress={submit} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
