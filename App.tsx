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
  const [countdown, setCountdown] = useState(0)
  const [status, requestCameraPermission] = Camera.useCameraPermissions()
  const cameraRef = useRef(null)

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync()
      await MediaLibrary.createAssetAsync(photo.uri)
    }
  }

  useEffect(() => {
    Brightness.requestPermissionsAsync().then(() => {
      requestCameraPermission().then(() => {
        MediaLibrary.requestPermissionsAsync()
      })
    })
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <StatusBar style="auto" />
      {screen === "color" && (
        <PickColorScreen color={color} setColor={setColor} />
      )}
      {screen === "home" && (
        <Camera
          onMountError={(e) => alert(JSON.stringify(e))}
          ref={cameraRef}
          style={styles.cameraStyle}
          type={CameraType.front}
        ></Camera>
      )}
      <Toolbar
        color={color}
        screen={screen}
        setScreen={setScreen}
        takePicture={takePicture}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cameraStyle: {
    alignSelf: "center",
    height: 100,
    position: "absolute",
    top: 100,
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
