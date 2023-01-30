//@ts-nocheck

import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const Logo = (props) => (
  <Svg
    width={135}
    height={127}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle
      cx={67.5}
      cy={89.5}
      r={37.5}
      fill="#EF476F"
      style={{
        mixBlendMode: "multiply",
      }}
    />
    <Circle
      cx={97.5}
      cy={37.5}
      r={37.5}
      fill="#3E92CC"
      style={{
        mixBlendMode: "multiply",
      }}
    />
    <Circle
      cx={37.5}
      cy={37.5}
      r={37.5}
      fill="#0C9"
      style={{
        mixBlendMode: "multiply",
      }}
    />
  </Svg>
);

export default Logo;
