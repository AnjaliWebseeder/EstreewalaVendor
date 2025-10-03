import { View, Text, TextInput, StyleSheet } from 'react-native';
import appColors from '../../theme/appColors';
import fonts from '../../theme/appFonts';
import { fontSizes } from '../../theme/appConstant';

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  error,
  rowStyle
}) {
  return (
    <View style={[styles.row,rowStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[
          styles.input,
          error && { borderColor: appColors.error, borderWidth: 1.5 }, // highlight error
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={appColors.placeholder}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { marginBottom: 12 },
  label: {
    marginBottom: 6,
    color: appColors.title,
    fontFamily: fonts.InterSemiBold,
    fontWeight: '600',
    fontSize: fontSizes.FONT17,
  },
  input: {
    borderWidth: 1.2,
    borderColor: appColors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
  
    backgroundColor: appColors.inputField,
    fontSize: fontSizes.FONT16,
  },
 error:{
    color: appColors.error, marginTop: 5,
    fontSize:11,
    fontFamily:fonts.InterRegular,

  },

});
