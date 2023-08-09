import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  followUserAction,
  getAllUsers,
  unfollowUserAction,
} from '../../redux/actions/userAction';
import Loader from '../common/Loader';
import tw from 'tailwind-react-native-classnames';

type Props = {
  navigation: any;
};

const SearchScreen = ({navigation}: Props) => {
  const [data, setData] = useState([
    {
      name: '',
      userName: '',
      avatar: {url: ''},
      followers: [],
    },
  ]);
  const {users, user, isLoading} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsers()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      setData(users);
    }
  }, [users]);

  const handleSearchChange = (e: any) => {
    if (e.length !== 0) {
      const filteredUsers =
        users &&
        users.filter((i: any) =>
          i.name.toLowerCase().includes(e.toLowerCase()),
        );
      setData(filteredUsers);
    } else {
      setData(users);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView>
          <View style={tw`p-3`}>
            <Text style={tw`text-2xl text-black font-bold`}>Search</Text>
            <View style={tw`relative bg-gray-200 mt-3 items-center rounded-md flex`}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/2811/2811806.png',
                }}
                height={20}
                width={20}
                style={tw`absolute top-3 left-2`}
              />
              <TextInput
                onChangeText={e => handleSearchChange(e)}
                placeholder="Search"
                placeholderTextColor={'#000'}
                style={tw`w-full pl-8 text-gray-600 py-3`}
              />
            </View>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                const handleFollowUnfollow = async (e: any) => {
                  try {
                    if (e.followers.find((i: any) => i.userId === user._id)) {
                      await unfollowUserAction({
                        userId: user._id,
                        users,
                        followUserId: e._id,
                      })(dispatch);
                    } else {
                      await followUserAction({
                        userId: user._id,
                        users,
                        followUserId: e._id,
                      })(dispatch);
                    }
                  } catch (error) {
                    console.log(error, 'error');
                  }
                };
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('UserProfile', {
                        item: item,
                      })
                    }>
                    <View style={tw`flex-row my-3`}>
                      <Image
                        source={{uri: item?.avatar?.url}}
                        width={30}
                        height={30}
                        borderRadius={100}
                      />
                      <View
                        style={tw`w-90 flex-row justify-between border-b border-black pb-2`}>
                        <View>
                          <View style={tw`flex-row items-center relative`}>
                            <Text style={tw`pl-3 text-lg text-black`}>
                              {item.name}
                            </Text>
                            {item?.role === 'Admin' && (
                              <Image
                                source={{
                                  uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828640.png',
                                }}
                                width={18}
                                height={18}
                                style={tw`ml-1`}
                              />
                            )}
                          </View>

                          <Text style={tw`pl-3 text-lg text-black`}>
                            {item.userName}
                          </Text>
                          <Text style={tw`pl-3 mt-1 text-lg text-gray-600`}>
                            {item.followers.length} followers
                          </Text>
                        </View>
                        <View>
                          <TouchableOpacity
                            style={tw`rounded-sm w-8 flex-row justify-center items-center h-9 border border-black`}
                            onPress={() => handleFollowUnfollow(item)}>
                            <Text style={tw`text-black`}>
                              {item.followers.find(
                                (i: any) => i.userId === user._id,
                              )
                                ? 'Following'
                                : 'Follow'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default SearchScreen;
