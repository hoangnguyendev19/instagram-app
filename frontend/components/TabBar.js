import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';

const TabBar = ({ state, descriptors, navigation }) => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View
              style={{
                alignItems: 'center',
                paddingVertical: '15px',
                backgroundColor: isFocused ? 'black' : 'white',
              }}
            >
              {label === 'Profile' ? (
                <Avatar.Image source={currentUser?.avatarUrl} size={24} />
              ) : (
                <Icon
                  name={
                    label === 'Home'
                      ? 'home'
                      : label === 'Search'
                      ? 'search'
                      : label === 'NewPost'
                      ? 'plus-square'
                      : label === 'Camera'
                      ? 'camera'
                      : ''
                  }
                  size={24}
                  style={{
                    color: isFocused ? 'white' : 'black',
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
