import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View,Text } from 'react-native';
import {styles} from './styles'
import appColors from "../../theme/appColors";
import fonts from '../../theme/appFonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Home from "../../screens/home";
import Order from "../../screens/order";
import Payment from '../../screens/payment'
import Account from "../../screens/account"
import {HomeIcon} from "../../assets/Icons/home"
import {OrderIcon} from "../../assets/Icons/order"
import {PaymentIcon} from "../../assets/Icons/payment"
import {AccountIcon} from "../../assets/Icons/account"

const Tab = createBottomTabNavigator();
const MinimalTabButton = ({ focused, icon: IconComponent, label, labelWidth,iconStyle,labelStyle }) => {
  return (
    <View style={styles.minimalTabButton}>
      <View style={[
        styles.minimalIconContainer,
        focused && styles.minimalIconContainerActive,
        iconStyle
      ]}>
        <IconComponent
          size={18}
          color={focused ? appColors.white : appColors.secondary}
        />
      </View>
      <Text style={[
        styles.minimalTabLabel,
        { 
          color: focused ? appColors.secondary : appColors.subTitle,
          fontFamily: focused ? fonts.PoppinsMedium : fonts.PoppinsRegular,
          width: labelWidth || 'auto',  // <-- set width if provided
          textAlign: 'center',          // center text if width is fixed
          bottom: focused ? -1 : 3
        },
        
      ]}>
        {label}
      </Text>
    </View>
  );
};


export default function BottomTab() {
    const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: [styles.minimalTabBar,{
             height: 65+ insets.bottom, 
          }],
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={Home}
          options={{
           
            tabBarIcon: ({ focused }) => (
              <MinimalTabButton 
                focused={focused} 
                icon={HomeIcon} 
                label="Home" 
               
              />
            ),
          }}
        />
        
        <Tab.Screen
  name="Order"
  component={Order}

    options={{
           
            tabBarIcon: ({ focused }) => (
              <MinimalTabButton 
                focused={focused} 
                icon={OrderIcon} 
                label="Order" 
               
              />
            ),
          }}


/>
        <Tab.Screen 
          name="Payment" 
          component={Payment}
          options={{
          
            tabBarIcon: ({ focused }) => (
              <MinimalTabButton 
                focused={focused} 
                icon={PaymentIcon} 
                label="Payment" 
                 labelWidth={53}
                iconStyle={{marginLeft:10}}
              />
            ),
          }}
        />

       


      
        <Tab.Screen 
          name="Account" 
          component={Account}
          options={{
           
            tabBarIcon: ({ focused }) => (
              <MinimalTabButton 
                focused={focused} 
                icon={AccountIcon} 
                label="Profile" 
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}

