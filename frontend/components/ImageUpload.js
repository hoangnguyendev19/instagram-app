import { Button, Image, View, Platform, TextInput } from 'react-native';
import DefaultImage from '../assets/img/default-image.png';
import * as ImagePicker from 'expo-image-picker';

const ImageUpload = ({ imageUrl, setImageUrl }) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: '15px' }}>
      <Image
        source={{ uri: imageUrl ? imageUrl : DefaultImage }}
        style={{
          width: '100%',
          height: 300,
          overflow: 'auto',
          objectFit: 'cover',
          marginBottom: '10px',
        }}
      />

      {Platform.OS === 'web' ? (
        <TextInput
          placeholder="Đường dẫn ảnh..."
          placeholderTextColor="rgba(0,0,0,0.5)"
          style={{
            outlineStyle: 'none',
            width: '100%',
            borderBottomWidth: '1px',
            borderBottomColor: '#ccc',
            borderStyle: 'solid',
            paddingBottom: '10px',
            fontSize: '20px',
          }}
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
        />
      ) : (
        <Button title="Chọn ảnh" onPress={pickImage} />
      )}
    </View>
  );
};

export default ImageUpload;
