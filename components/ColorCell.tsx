import { Dispatch, SetStateAction } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Screen } from "../types"

const hexRegEx = /#[0-9|a-f|A-F]{6}/
const isValidHex = (hex: string) => hexRegEx.test(hex)

export function ColorCell({
  hex,
  setColor,
  setScreen,
}: {
  hex: string
  setColor: Dispatch<SetStateAction<string>>
  setScreen: Dispatch<SetStateAction<Screen>>
}) {
  return isValidHex(hex) ? (
    <TouchableOpacity
      onPress={() => {
        setColor(hex)
        setScreen("home")
      }}
      style={[styles.container, { backgroundColor: hex }]}
    ></TouchableOpacity>
  ) : (
    <View style={styles.container}>
      <Text style={styles.errorText}>INVALID</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#555",
    borderRadius: 100,
    height: 125,
    width: 125,
  },
  errorText: {
    color: "#fff",
    textAlign: "center",
  },
})
