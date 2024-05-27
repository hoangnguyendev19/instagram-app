import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Logo from '../assets/img/logo.png';
import Meta from '../assets/img/meta.png';
import { useSelector } from 'react-redux';

const ResetPassScreen = () => {
  const { currentUser, token } = useSelector((state) => state.auth);

  if ((currentUser, token)) {
    navigation.navigate('Main');
  }

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
          placeholder="Tên người dùng"
          style={{
            padding: '15px',
            borderWidth: '1px',
            borderColor: '#A6A6AA',
            borderStyle: 'solid',
            borderRadius: '10px',
            color: '#A6A6AA',
            fontWeight: '600',
            fontSize: '18px',
          }}
        />
        <TextInput
          placeholder="Email"
          style={{
            padding: '15px',
            borderWidth: '1px',
            borderColor: '#A6A6AA',
            borderStyle: 'solid',
            borderRadius: '10px',
            color: '#A6A6AA',
            fontWeight: '600',
            fontSize: '18px',
            marginTop: '20px',
          }}
        />
      </View>
      <View style={{ marginTop: '40px' }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#1544eb',
            borderRadius: '30px',
            paddingVertical: '15px',
          }}
        >
          <Text
            style={{
              color: '#ffff',
              fontSize: '18px',
              textAlign: 'center',
              fontWeight: '600',
            }}
          >
            Làm mới
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={{ fontSize: '18px', marginTop: '10px', textAlign: 'center', fontWeight: '600' }}
          >
            Bạn đã có tài khoản?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 'auto', marginBottom: '20px' }}>
        <View
          style={{
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

export default ResetPassScreen;
