import { View, Text, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../../components/header";
import appColors from "../../../theme/appColors";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

const notifications = [
  {
    id: "1",
    icon: "checkmark-circle",
    bgColor: "#4CAF50",
    title: "Successfully booked. You will rece...",
    time: "Yesterday at 10:00 AM",
  },
  {
    id: "2",
    icon: "pricetag",
    bgColor: "#1E88E5",
    title: "Lockdown: Enjoy upto 70% off...",
    time: "12 Mar 2021 at 10:00 PM",
  },
  {
    id: "3",
    icon: "car",
    bgColor: "#FB8C00",
    title: "Order is on the way.",
    time: "09 Mar 2021 at 11:35 AM",
  },
  {
    id: "4",
    icon: "cube",
    bgColor: "#8E24AA",
    title: "Order is being prepared.",
    time: "20 Feb 2021 at 10:00 AM",
  },
  {
    id: "5",
    icon: "pricetag",
    bgColor: "#03A9F4",
    title: "Grab now New Year 2021 discount.",
    time: "31 Dec 2020 at 11:00 PM",
  },
];

const Notification = ({navigation}) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={[styles.iconWrapper, { backgroundColor: item.bgColor }]}>
        <Icon name={item.icon} size={20} color={appColors.white} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
  <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <Header
        title="Notification"
        onBack={() => navigation.goBack()}
        onRightPress={() => console.log("Settings pressed")}
       
      />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  </SafeAreaView>
  );
};



export default Notification;
