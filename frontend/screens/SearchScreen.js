import { View, ScrollView, FlatList } from 'react-native';
import PostBanner from '../components/PostBanner';
import Search from '../components/Search';
import { useSelector } from 'react-redux';

const SearchScreen = ({ navigation }) => {
  const { posts } = useSelector((state) => state.post);

  const renderPostRow = ({ item }) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      }}
    >
      {item.map((post) => (
        <PostBanner key={post.id} navigation={navigation} post={post} />
      ))}
    </View>
  );

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <Search />
      <ScrollView>
        <FlatList
          data={chunkArray(posts, 3)}
          renderItem={renderPostRow}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
};

const chunkArray = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, (index + 1) * size),
  );
};

export default SearchScreen;
