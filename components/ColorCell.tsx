import { Dispatch, SetStateAction } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Color, Screen } from "../types"

const hexRegEx = /#[0-9|a-f|A-F]{6}/
const isValidHex = (hex: string) => hexRegEx.test(hex)

export function ColorCell({
  hex,
  setColor,
  setScreen,
}: {
  hex: Color
  setColor: Dispatch<SetStateAction<Color>>
  setScreen: Dispatch<SetStateAction<Screen>>
}) {
  return isValidHex(hex) ? (
    <TouchableOpacity
      onPress={() => {
        setColor(hex)
        setScreen("home")
      }}
      style={[styles.container, { backgroundColor: hex }]}
    />
  ) : (
    <View style={styles.container}>
      <Text style={styles.errorText}>INVALID</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#555",
    flex: 1,
    flexGrow: 1,
    height: 200,
    justifyContent: "center",
  },
  errorText: {
    color: "#fff",
    textAlign: "center",
  },
})
