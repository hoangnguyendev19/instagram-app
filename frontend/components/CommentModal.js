import { Image, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Modal, Portal, Avatar } from 'react-native-paper';
import Comment from '../components/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../store/post/postSlice';
import { useState } from 'react';

const CommentModal = ({ modal, setModal, comments, postId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const { token, currentUser } = useSelector((state) => state.auth);

  const handleCreate = () => {
    dispatch(createComment({ postId, content, token }));
    setContent('');
  };

  return (
    <Portal>
      <Modal visible={modal} onDismiss={() => setModal(false)}>
        <View
          style={{
            width: '100%',
            height: '560px',
            backgroundColor: 'white',
            justifyContent: 'flex-end',
            borderRadius: '10px',
            paddingHorizontal: '15px',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: '1px',
              borderStyle: 'solid',
              borderBottomColor: 'black',
              paddingVertical: '15px',
              marginTop: 0,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: '24px' }}>Bình luận</Text>
            <TouchableOpacity onPress={() => setModal(false)}>
              <Icon name="times" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ marginTop: '10px' }}>
            {comments?.length > 0 && comments.map((item) => <Comment key={item.id} item={item} />)}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: '10px',
              borderTopWidth: '1px',
              borderStyle: 'solid',
              borderTopColor: 'black',
            }}
          >
            <Avatar.Image source={currentUser?.avatarUrl} size={50} />
            <TextInput
              placeholder="Viết bình luận..."
              placeholderTextColor="rgba(0,0,0,0.5)"
              style={{ outlineStyle: 'none', width: '220px', fontSize: '18px' }}
              value={content}
              onChangeText={(text) => setContent(text)}
            />
            <TouchableOpacity onPress={handleCreate}>
              <Text style={{ color: 'blue', fontSize: '18px' }}>Đăng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default CommentModal;
