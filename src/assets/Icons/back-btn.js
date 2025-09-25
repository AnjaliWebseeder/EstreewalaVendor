import Svg, { Path } from 'react-native-svg';

const ArrowRightIcon = ({ size = 17, color =  color ? color : '#ffffffff' }) => {
  return (
    <Svg width={size} height={(size * 16) / 17} viewBox="0 0 17 16" fill="none">
      <Path
        d="M11.2834 7.33301L7.55004 3.59968L8.50004 2.66634L13.8334 7.99967L8.50004 13.333L7.55004 12.3997L11.2834 8.66634H3.16671V7.33301H11.2834Z"
        fill={color}
      />
    </Svg>
  );
};

export default ArrowRightIcon;
