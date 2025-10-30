import * as React from "react";
import Svg, { Path, G } from "react-native-svg";

const PremiumSubscriptionIcon = ({ size = 25, color = "#f7f7f7ff" }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
  >
    <G>
      <Path
        d="M6 28a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-3H6zM28.607 8.205a1.004 1.004 0 0 0-1.054-.1l-7.028 3.514-3.596-8.99a1 1 0 0 0-1.858 0l-3.596 8.99-7.028-3.514A1 1 0 0 0 3.02 9.196L5.78 23h20.44l2.76-13.804a1 1 0 0 0-.373-.99zM16 19a2.292 2.292 0 0 1-2-2.5 2.292 2.292 0 0 1 2-2.5 2.292 2.292 0 0 1 2 2.5 2.292 2.292 0 0 1-2 2.5z"
        fill={color}
      />
    </G>
  </Svg>
);

export default PremiumSubscriptionIcon;
