import React from "react";
import { Text, StyleSheet, TextProps, TextStyle } from "react-native";

type Variant = "title" | "body" | "button";

type AppTextProps = TextProps & {
  variant?: Variant;
  bold?: boolean;
};

export default function TextComponent({
  variant = "body",
  bold,
  style,
  children,
  ...rest
}: AppTextProps) {
  const variantStyle =
    variant === "title"
      ? styles.title
      : variant === "button"
      ? styles.button
      : styles.body;

  const flat = StyleSheet.flatten(style) as TextStyle | undefined;

  // fontSize cuối cùng: nếu ngoài truyền fontSize thì lấy ngoài, không thì lấy theo variant
  const fontSize =
    (flat?.fontSize as number | undefined) ??
    (variant === "title" ? 28 : variant === "button" ? 16 : 14);

  // lineHeight: nếu ngoài không set, tự tính theo fontSize
  const lineHeight =
    (flat?.lineHeight as number | undefined) ?? Math.round(fontSize * 1.25);

  return (
    <Text
      {...rest}
      style={[
        styles.base,
        variantStyle,
        { lineHeight },      // đảm bảo không bị cắt đuôi chữ
        bold && styles.bold,
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: "#111",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  body: {
    fontSize: 14,
    fontWeight: "400",
  },
  button: {
    fontSize: 16,
    fontWeight: "700",
  },
  bold: {
    fontWeight: "700",
  },
});
