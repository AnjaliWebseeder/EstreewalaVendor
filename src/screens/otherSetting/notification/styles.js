import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFC",
  },

  listContainer: {
    padding: 16,
  },

  card: {
    flexDirection: "row",
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#4F8AF2",
    backgroundColor: "#F2F6FF",
  },

  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 14,
    color: "#555",
  },

  unreadTitle: {
    fontWeight: "700",
    color: "#000",
  },

  time: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: "#999",
  },
});
