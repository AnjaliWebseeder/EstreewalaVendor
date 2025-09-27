import Svg, { Path } from "react-native-svg";
export function HomeIcon({ color =  color ? color : "#000" }) {
  return (
    <Svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/Svg">
<Path d="M1.875 15.9997H5.22125V10.0575H10.5288V15.9997H13.875V6.99972L7.875 2.48047L1.875 6.99972V15.9997ZM0.375 17.4997V6.24972L7.875 0.605469L15.375 6.24972V17.4997H9.02875V11.5575H6.72125V17.4997H0.375Z" fill={color}/>
</Svg>
  );
}
