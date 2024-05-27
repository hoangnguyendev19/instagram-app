import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Logo from '../assets/img/logo.png';
import Meta from '../assets/img/meta.png';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { login } from '../store/auth/authSlice';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('hoang19@gmail.com');
  const [password, setPassword] = useState('hoang19');
  const { currentUser, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (currentUser && token) {
    navigation.navigate('Main');
  }

  const handleLogin = () => {
    if (email && password) {
      dispatch(login({ email, password }));
      navigation.navigate('Main');
    }
  };

  return (
    <View style={{ width: '100%', height: '100%', paddingHorizontal: '20px' }}>
      <Text style={{ textAlign: 'center', color: '#A6A6AA', fontSize: '18px', marginTop: '20px' }}>
        Tiếng Việt
      </Text>
      <Image
        source={Logo}
        style={{ width: '60px', height: '60px', marginHorizontal: 'auto', marginTop: '40px' }}
      />
      <View style={{ marginTop: '40px' }}>
        <TextInput
          placeholder="Tên người dùng hoặc email"
          style={{
            padding: '15px',
            borderWidth: '1px',
            borderColor: '#A6A6AA',
            borderStyle: 'solid',
            borderRadius: '10px',
            color: 'black',
            fontWeight: '600',
            fontSize: '18px',
          }}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Mật khẩu"
          style={{
            padding: '15px',
            borderWidth: '1px',
            borderColor: '#A6A6AA',
            borderStyle: 'solid',
            borderRadius: '10px',
            color: 'black',
            fontWeight: '600',
            fontSize: '18px',
            marginTop: '20px',
          }}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={{ marginTop: '40px' }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#1544eb',
            borderRadius: '30px',
            paddingVertical: '15px',
          }}
          onPress={handleLogin}
        >
          <Text
            style={{
              color: '#ffff',
              fontSize: '18px',
              textAlign: 'center',
              fontWeight: '600',
            }}
          >
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text
            style={{ fontSize: '18px', marginTop: '10px', textAlign: 'center', fontWeight: '600' }}
          >
            Bạn quên mật khẩu ư?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 'auto', marginBottom: '20px' }}>
        <TouchableOpacity
          style={{
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#1544eb',
            paddingVertical: '15px',
            borderRadius: '30px',
          }}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={{ color: '#1544eb', textAlign: 'center', fontWeight: '600' }}>
            Tạo tài khoản mới
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: '10px',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image source={Meta} style={{ width: '30px', height: '20px' }} />
          <Text style={{ fontSize: '20px', fontWeight: '600', marginLeft: '5px' }}>Meta</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
