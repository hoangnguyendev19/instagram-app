import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImageUpload from '../components/ImageUpload';
import { useState } from 'react';

const EditProfileScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View
      style={{ width: '100%', height: '100%', paddingHorizontal: '15px', justifyContent: 'center' }}
    >
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
          Chỉnh sửa trang cá nhân
        </Text>
      </View>
      <ImageUpload />
      <View style={{ marginBottom: '40px' }}>
        <TextInput
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          placeholder="Họ tên"
          placeholderTextColor="rgba(0,0,0,0.5)"
          style={{
            outlineStyle: 'none',
            borderBottomWidth: '1px',
            borderBottomColor: '#ccc',
            borderStyle: 'solid',
            paddingBottom: '10px',
            fontSize: '20px',
          }}
        />
        <TextInput
          value={userName}
          onChangeText={(text) => setUserName(text)}
          placeholder="Tên người dùng"
          placeholderTextColor="rgba(0,0,0,0.5)"
          style={{
            outlineStyle: 'none',
            borderBottomWidth: '1px',
            borderBottomColor: '#ccc',
            borderStyle: 'solid',
            paddingBottom: '10px',
            marginTop: '20px',
            fontSize: '20px',
          }}
        />
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          placeholderTextColor="rgba(0,0,0,0.5)"
          style={{
            outlineStyle: 'none',
            borderBottomWidth: '1px',
            borderBottomColor: '#ccc',
            borderStyle: 'solid',
            paddingBottom: '10px',
            marginTop: '20px',
            fontSize: '20px',
          }}
        />
      </View>
      <View style={{ marginBottom: '15px' }}>
        <Button title="Chỉnh sửa" disabled={fullName && userName && email ? false : true} />
      </View>
    </View>
  );
};

export default EditProfileScreen;
