import { COLORS, FONTS, SIZES } from "../constants";
import { Platform, Text, View } from "react-native";

import React from "react";
import { isIphoneX } from "react-native-iphone-x-helper";

const HeaderBar = ({ title }) => {
  return (
    <View
      style={{
        height: isIphoneX() ? 100 : 70,
        justifyContent: "flex-end",
        paddingTop: 20,
      }}
    >
      <Text style={{ ...FONTS.h1, color: COLORS.white }}>{title}</Text>
    </View>
  );
};

export default HeaderBar;
