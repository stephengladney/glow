import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import type { Screen } from "../types"
import * as Brightness from "expo-brightness"
import { Camera, CameraType } from "expo-camera"

export function Toolbar({
  setScreen,
  takePicture,
}: {
  setScreen: Dispatch<SetStateAction<Screen>>
  takePicture: Function
}) {
  const [oldBrightness, setOldBrightness] = useState(0)
  const [whichFunc, setWhichFunc] = useState(0)

  useEffect(() => {
    Brightness.getBrightnessAsync()
      .then((val) => setOldBrightness(val))
      .catch((e) => alert(JSON.stringify(e)))
  }, [])

  const handlePhotoPress = () => {
    if (whichFunc === 0) {
      Brightness.setBrightnessAsync(100)
        .then(() => {
          setWhichFunc(1)
          setTimeout(() => {
            takePicture().then(Brightness.setBrightnessAsync(oldBrightness))
          }, 1000)
        })
        .catch((e) => console.log(e))
    } else {
      Brightness.setBrightnessAsync(oldBrightness).then(() => setWhichFunc(0))
    }
  }

  return (
    <View style={styles.container}>
      <Text onPress={() => setScreen("color")} style={styles.item}>
        Pick color
      </Text>
      <Text onPress={handlePhotoPress} style={styles.item}>
        Take photo
      </Text>
      <Text onPress={() => setScreen("home")} style={styles.item}>
        Show color
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    bottom: 0,
    flexDirection: "row",
    paddingBottom: 60,
    position: "absolute",
    zIndex: 2,
  },
  item: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    width: "33%",
  },
})
