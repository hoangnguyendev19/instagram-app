import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Post from '../components/Post';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState, useEffect } from 'react';
import CommentModal from '../components/CommentModal';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById } from '../store/post/postDetailSlice';

const PostScreen = ({ navigation, route }) => {
  const [modal, setModal] = useState(false);
  const { id } = route.params;
  const { post } = useSelector((state) => state.postDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: '15px',
          paddingHorizontal: '15px',
        }}
      >
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
          Khám phá
        </Text>
      </View>
      <ScrollView>
        <Post item={post} setModal={setModal} />
      </ScrollView>
      <CommentModal modal={modal} setModal={setModal} />
    </View>
  );
};

export default PostScreen;
