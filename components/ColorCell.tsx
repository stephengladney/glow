import { StyleSheet, Text, View } from "react-native"

const hexRegEx = /#[0-9|a-f|A-F]{6}/
const isValidHex = (hex: string) => hexRegEx.test(hex)

export function ColorCell({ hex }: { hex: string }) {
  return isValidHex(hex) ? (
    <View style={[styles.container, { backgroundColor: hex }]}></View>
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
    justifyContent: "center",
    height: 200,
    width: 200,
  },
  errorText: {
    color: "#fff",
    textAlign: "center",
  },
})
