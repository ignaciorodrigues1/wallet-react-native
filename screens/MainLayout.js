import { Animated, View } from "react-native";
import { COLORS, SIZES, icons } from "../constants";
import React, { useEffect, useRef } from "react";

import { IconTextButton } from "../components";
import { connect } from "react-redux";
import { isIphoneX } from "react-native-iphone-x-helper";

const MainLayout = ({ children, isTradeModalVisible, navigation }) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      SIZES.height,
      isIphoneX() ? SIZES.height - 240 : SIZES.height - 240,
    ],
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {children}

      {/* Dim Background */}
      {isTradeModalVisible && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.transparentBlack,
          }}
          opacity={modalAnimatedValue}
        />
      )}

      {/* Modal */}
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          top: modalY,
          width: "100%",
          padding: SIZES.padding,
          paddingBottom: 150,
          backgroundColor: COLORS.black,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <IconTextButton
          label="Transferir"
          icon={icons.arrowTopRotateBlack}
          onPress={() => navigation.navigate("Withdraw")}
        />
        <IconTextButton
          label="Ingresar"
          icon={icons.arrowBottomRotateBlack}
          containerStyle={{
            marginTop: SIZES.base,
          }}
          onPress={() => console.log("Ingresar")}
        />
      </Animated.View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
