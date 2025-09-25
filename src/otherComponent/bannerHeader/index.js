import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { styles } from './styles'; // Use shared styles
import { BackIcon } from '../../assets/Icons/backIcon';

const BannerHeader = ({
  bannerImage,
  title,
  subtitle,
  defaultAvatar,
  vendorLabel = 'Vendor',
  onImagePick,
  showBackButton = true,
  onBackPress,
  bannerStyle
}) => {
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode) {
        setProfileImage(response.assets[0].uri);
        if (onImagePick) onImagePick(response.assets[0].uri);
      }
    });
  };

  return (
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

      <View style={styles.mainStyle}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={[styles.subText, { marginVertical: 0 }]}>{subtitle}</Text>}

     {defaultAvatar &&    <TouchableOpacity onPress={pickImage} style={styles.vendorBox}>
          <Image
            source={profileImage ? { uri: profileImage } : defaultAvatar}
            style={styles.avatar}
          />
          <Text style={styles.vendorText}>{vendorLabel}</Text>
        </TouchableOpacity>}
      </View>
    </ImageBackground>
  );
};

export default BannerHeader;
