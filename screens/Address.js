import { COLORS, FONTS, SIZES, data, icons } from "../constants";
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import { LinearGradient } from "expo-linear-gradient";
import { MainLayout } from ".";
import PlaceItem from "../components/PlaceItem";
import { loadPlaces } from "../stores/place/placeAction";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.places.places);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Nueva"
            iconName="md-add"
            onPress={() => navigation.push("Nuevo")}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(loadPlaces());
  }, []);

  const renderItem = (data) => (
    <PlaceItem
      image={data.item.image}
      address={null}
      title={data.item.title}
      onSelect={() => navigation.push("Detalle")}
    />
  );

  return (
    <MainLayout>
      <StatusBar backgroundColor={COLORS.violetDark} barStyle="light-content" />
      <LinearGradient
        colors={[COLORS.violetDark, COLORS.black]}
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={places}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <View
          style={{
            paddingHorizontal: SIZES.radius,
            paddingVertical: SIZES.radius,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding,
              backgroundColor: COLORS.transparentWhite,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: COLORS.secondary,
            }}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.white,
              }}
            >
              Volver atrás
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Profile;
