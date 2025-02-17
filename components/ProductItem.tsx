import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ProductType } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Link } from "expo-router";

type Props = {
  item: ProductType;
  index: number;
  productType: "sale" | "regular";
};

const width = Dimensions.get("window").width - 40;

const ProductItem = ({ item, index, productType }: Props) => {
  return (
    <Link href={{
      pathname: '/product-details/[id]',
      params: { id: item.id, productType: productType },
    }} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.container}
          entering={FadeInDown.delay(300 + index * 100).duration(500)}
        >
          <Image source={{ uri: item.images[0] }} style={styles.productImg} />
          <TouchableOpacity style={styles.bookmarkBtn}>
            <Ionicons name="heart-outline" size={22} color={Colors.black} />
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 10,
  },
  productImg: {
    width: "100%",
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
    marginLeft: 7,
  },
  bookmarkBtn: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 5,
    borderRadius: 30,
  },
});
