import { Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';

const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const toggleCameraType = () => {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <Camera type={type}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: '30px',
          }}
        >
          <TouchableOpacity onPress={toggleCameraType}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.3)',
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: '5px',
                borderStyle: 'solid',
                borderColor: 'white',
              }}
            ></View>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: '18px', marginTop: 10 }}>
              Chụp ảnh
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;
