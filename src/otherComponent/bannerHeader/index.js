import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from './styles'; // Use shared styles
import { BackIcon } from '../../assets/Icons/backIcon';

const BannerHeader = ({
  bannerImage,
  title,
  subtitle,
  showBackButton = true,
  onBackPress,
  bannerStyle,
  subTitleStyle
}) => {

  return (
  <View>
      <ImageBackground
      source={bannerImage}
      style={[styles.bannerContainer,{...bannerStyle}]}
      resizeMode="cover"
    >
      {showBackButton && onBackPress && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
       <BackIcon/>
        </TouchableOpacity>
      )}

   
    </ImageBackground>
       <View style={styles.mainStyle}>
         <View style={styles.titleWrapper}>
        <View style={styles.line} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line} />
      </View>
        {subtitle && <Text style={[styles.subText, { marginVertical: 0,...subTitleStyle }]}>{subtitle}</Text>}
      </View>
  </View>
  );
};

export default BannerHeader;
