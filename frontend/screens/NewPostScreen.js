import { Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImageUpload from '../components/ImageUpload';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../store/post/postSlice';

const NewPostScreen = ({ navigation }) => {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(createPost({ post: { caption, location, imageUrl }, token }));
    setCaption('');
    setLocation('');
    setImageUrl('');
    navigation.navigate('Home');
  };

  return (
    <View style={{ width: '100%', height: '100%', paddingHorizontal: '15px' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '15px' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: '25px',
            fontSize: '20px',
            fontWeight: 'bold',
            marginRight: 'auto',
          }}
        >
          Bài biết mới
        </Text>
        <TouchableOpacity>
          <Text style={{ color: '#409eff', fontSize: '20px', fontWeight: '600' }}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>
      <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <View style={{ marginBottom: '30px' }}>
        <TextInput
          value={caption}
          onChangeText={(text) => setCaption(text)}
          placeholder="Nội dung..."
          placeholderTextColor="rgba(0,0,0,0.5)"
          style={{
            outlineStyle: 'none',
            borderBottomWidth: '1px',
            borderBottomColor: '#ccc',
            borderStyle: 'solid',
            paddingBottom: '10px',
            marginTop: '15px',
            fontSize: '20px',
          }}
        />
        <TextInput
          value={location}
          onChangeText={(text) => setLocation(text)}
          placeholder="Vị trí..."
          placeholderTextColor="rgba(0,0,0,0.5)"
          style={{
            outlineStyle: 'none',
            borderBottomWidth: '1px',
            borderBottomColor: '#ccc',
            borderStyle: 'solid',
            paddingBottom: '10px',
            marginTop: '15px',
            fontSize: '20px',
          }}
        />
      </View>
      <View style={{ marginBottom: '15px' }}>
        <Button
          onPress={handleCreate}
          title="Đăng tải"
          disabled={caption && location && imageUrl ? false : true}
        />
      </View>
    </View>
  );
};

export default NewPostScreen;
