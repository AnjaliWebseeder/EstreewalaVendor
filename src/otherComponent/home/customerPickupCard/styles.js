import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";

const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  card: {
    backgroundColor: appColors.white,
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  deliveryBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f4ff",
    borderRadius: 8,
    padding: 8,
    borderColor:appColors.secondary,
    borderWidth:1
  },
  deliveryLabel: { fontSize: 12, color: appColors.font,fontFamily:fonts.InterSemiBold },
  deliveryValue: { fontSize: 13, fontWeight: "600", color: "#2a2a9f" ,fontFamily:fonts.InterSemiBold},

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  name: { fontSize: 14, fontWeight: "600" },
  location: { fontSize: 12, color: "#666" },

  pickupRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  pickupBox: { flexDirection: "row", alignItems: "center" },
  pickupText: { marginLeft: 6, fontSize: 13, color: "#333" },

  routeBox: { marginBottom: 12 },
  routeItem: { marginBottom: 2 },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
    marginRight: 6,
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
    marginRight: 6,
  },
  routeLabel: { fontSize: 12, fontWeight: "600", marginTop: 2 },
  routeValue: { fontSize: 13, color: "#333" },
  routeLine: {
    height: 20,
    borderLeftWidth: 1,
    borderColor: "#ccc",
    marginLeft: 4,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rejectBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 6,
    alignItems: "center",
  },
  rejectText: { color: "red", fontWeight: "600" },
  acceptBtn: {
    flex: 1,
    backgroundColor: "#1ec971",
    borderRadius: 8,
    paddingVertical: 10,
    marginLeft: 6,
    alignItems: "center",
  },
  acceptText: { color: appColors.white, fontWeight: "600" },
});