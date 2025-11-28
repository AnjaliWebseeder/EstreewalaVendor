import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},

modalContainerInstagram: {
  backgroundColor: '#fff',
  borderRadius: 14,
  width: '80%',
  maxWidth: 300,
  overflow: 'hidden',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},

titleSection: {
  paddingVertical: 20,
  paddingHorizontal: 20,
  borderBottomWidth: 0.5,
  borderBottomColor: '#dbdbdb',
  alignItems: 'center',
},

modalTitleInstagram: {
  fontSize: 18,
  fontWeight: '600',
  color: '#262626',
  textAlign: 'center',
},

messageSection: {
  paddingVertical: 20,
  paddingHorizontal: 20,
},

modalMessage: {
  fontSize: 14,
  color: '#666',
  textAlign: 'center',
  lineHeight: 20,
},

actionsContainer: {
  borderTopWidth: 0.5,
  borderTopColor: '#dbdbdb',
},

actionButton: {
  paddingVertical: 16,
  alignItems: 'center',
  justifyContent: 'center',
},

destructiveButton: {
  backgroundColor: 'transparent',
},

destructiveButtonText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#ED4956', // Instagram red color
},

cancelButtonInstagram: {
  backgroundColor: 'transparent',
  borderTopWidth: 0.5,
  borderTopColor: '#dbdbdb',
},

cancelButtonTextInstagram: {
  fontSize: 16,
  fontWeight: '400',
  color: '#262626',
},

separator: {
  height: 0.5,
  backgroundColor: '#dbdbdb',
},

loadingContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},

// Alternative Uber-style design
modalContainerUber: {
  backgroundColor: '#fff',
  borderRadius: 16,
  width: '85%',
  maxWidth: 320,
  overflow: 'hidden',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 12,
  elevation: 8,
},

modalTitleUber: {
  fontSize: 20,
  fontWeight: '700',
  color: '#000',
  textAlign: 'center',
  marginBottom: 8,
},

uberButton: {
  paddingVertical: 16,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000',
  marginHorizontal: 16,
  marginBottom: 12,
  borderRadius: 8,
},

uberButtonText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#fff',
},

uberCancelButton: {
  paddingVertical: 16,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
},

uberCancelText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#666',
},
})