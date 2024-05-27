import { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Menu } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../store/user/userDetailSlice';

const StoryScreen = ({ navigation, route }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [like, isLike] = useState(false);
  const { id } = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetail);
  console.log(user);
  useEffect(() => {
    dispatch(getUserById(id));
  }, [id]);

  useEffect(() => {
    const animationDuration = 3000;
    const interval = 50;
    const steps = animationDuration / interval;
    let step = 0;

    const progressInterval = setInterval(() => {
      if (step < steps) {
        setProgress((step + 1) / steps);
        step += 1;
      } else {
        clearInterval(progressInterval);
      }
    }, interval);

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <ImageBackground
        source={user?.posts?.[0].imageUrl}
        style={{ flex: 1, width: '100%', height: '100%' }}
      >
        <View style={{ flex: 1, marginTop: '5px' }}>
          <Progress.Bar
            progress={progress}
            width={screenWidth}
            animated={true}
            indeterminate={false}
            height={2}
            animationType="timing"
            unfilledColor="rgba(255,255,255,0.5)"
            color="white"
          />
          <View
            style={{
              paddingHorizontal: '15px',
              marginTop: '10px',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={user?.avatarUrl}
              style={{ width: 40, height: 40, borderRadius: 20, marginRight: '10px' }}
            />
            <Text
              style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', marginRight: '10px' }}
            >
              {user?.userName}
            </Text>
            <Text
              style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '400', marginRight: 'auto' }}
            >
              18 giờ
            </Text>
            <View>
              <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={
                  <TouchableOpacity onPress={() => setVisible(true)}>
                    <Icon name="ellipsis-v" size={24} color="white" />
                  </TouchableOpacity>
                }
                style={{ paddingTop: 40 }}
              >
                <Menu.Item onPress={() => {}} title="Ẩn story" leadingIcon="eye-off-outline" />
                <Menu.Item
                  onPress={() => navigation.navigate('Home')}
                  title="Quay lại trang chủ"
                  leadingIcon="keyboard-return"
                />
              </Menu>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: '15px',
          paddingVertical: '15px',
          width: '100%',
          backgroundColor: 'black',
        }}
      >
        <View
          style={{
            paddingHorizontal: '15px',
            paddingVertical: '10px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'white',
            borderRadius: '20px',
            width: '75%',
            marginRight: 'auto',
          }}
        >
          <TextInput placeholder="Gửi tin nhắn" style={{ outlineStyle: 'none', color: 'white' }} />
        </View>
        <TouchableOpacity onPress={() => isLike(!like)}>
          <Icon
            name="heart"
            size={24}
            color={like ? 'red' : 'white'}
            style={{ marginRight: '15px' }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="paper-plane" size={24} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoryScreen;
