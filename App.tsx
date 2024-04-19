import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { useEffect, useRef, useState } from "react"
import { PickColorScreen } from "./screens/PickColor"
import { Toolbar } from "./components/Toolbar"
import type { Color, Screen } from "./types"
import * as Brightness from "expo-brightness"
import { Camera, CameraType } from "expo-camera"
import * as MediaLibrary from "expo-media-library"

export default function App() {
  const [screen, setScreen] = useState<Screen>("home")
  const [color, setColor] = useState<Color>("#ff0000")
  const [status, requestPermission] = Camera.useCameraPermissions()
  const cameraRef = useRef(null)

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync()
      await MediaLibrary.createAssetAsync(photo.uri)
    }
  }

  useEffect(() => {
    Brightness.requestPermissionsAsync().then(() => {
      requestPermission().then(() => {
        MediaLibrary.requestPermissionsAsync()
      })
    })
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <StatusBar style="auto" />
      {screen === "color" && (
        <PickColorScreen setColor={setColor} setScreen={setScreen} />
      )}
      <Camera
        onMountError={(e) => alert(JSON.stringify(e))}
        ref={cameraRef}
        style={styles.cameraStyle}
        type={CameraType.front}
      ></Camera>
      <Toolbar setScreen={setScreen} takePicture={takePicture} />
    </View>
  )
}

const styles = StyleSheet.create({
  cameraStyle: {
    alignSelf: "center",
    height: 100,
    // left: 200,
    position: "absolute",
    bottom: 150,
    width: 100,
  },
  container: {
    // flex: 1,
    flexGrow: 1,
    backgroundColor: "#000",
    alignItems: "stretch",
    justifyContent: "center",
  },
})
