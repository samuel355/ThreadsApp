import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  followUserAction,
  loadUser,
  unfollowUserAction,
} from '../../redux/actions/userAction';
import tw from 'tailwind-react-native-classnames';

type Props = {
  route: any;
  navigation: any;
};

const FollowerCard = ({navigation, route}: Props) => {
  const followers = route.params.followers;
  const item = route.params.item;
  const following = route.params.following;
  const [data, setData] = useState(followers);
  const [active, setActive] = useState(0);
  const {user, users} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users) {
      if (followers) {
        const updatedUsers = [...users, user];
        const fullUsers = updatedUsers.filter((user: any) =>
          followers.some((item: any) => item.userId === user._id),
        );
        setData(fullUsers);
      }
      if (active === 1) {
        if (following) {
          const updatedUsers = [...users, user];
          const fullUsers = updatedUsers.filter((user: any) =>
            following.some((item: any) => item.userId === user._id),
          );
          setData(fullUsers);
        }
      }
    }
  }, [followers, following, active, users]);

  return (
    <SafeAreaView>
      <View style={tw`p-3 relative mb-2`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961937.png',
              }}
              height={25}
              width={25}
            />
          </TouchableOpacity>
          <Text style={tw`pl-3 text-xl font-[600] text-black`}>
            {item?.name}
          </Text>
        </View>
        <View style={tw`w-80 pt-5 m-auto flex-row justify-between`}>
          <TouchableOpacity onPress={() => setActive(0)}>
            <Text
              style={{
                ...styles.links,
                opacity: active === 0 ? 1 : 0.6,
              }}>
              Followers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActive(1)}>
            <Text
              style={{
                ...styles.links,
                opacity: active === 0 ? 1 : 0.6,
              }}>
              Following
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActive(2)}>
            <Text
              style={{
                ...styles.links,
                opacity: active === 0 ? 1 : 0.6,
              }}>
              Pending
            </Text>
          </TouchableOpacity>
        </View>

        {active === 0 ? (
          <View style={tw`w-40 absolute h-1 bg-black left-[-10px] bottom-0`} />
        ) : active === 1 ? (
          <View style={tw`w-30 absolute h-1 bg-black right-[31%] bottom-0`} />
        ) : (
          <View style={tw`w-30 absolute h-1 bg-black right-[0%] bottom-0`} />
        )}
      </View>

      {active === 0 && (
        <Text style={tw`py-2 text-center text-black text-md`}>
          {followers?.length} followers
        </Text>
      )}

      {active === 1 && (
        <Text style={tw`py-2 text-center text-black text-md`}>
          {following?.length} following
        </Text>
      )}

      {active !== 2 && (
        <FlatList
          data={data}
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
              loadUser()(dispatch);
            };

            return (
              <TouchableOpacity
                style={tw`w-90 m-auto py-3 flex-row justify-between`}
                onPress={() =>
                  navigation.navigate('UserProfile', {
                    item,
                  })
                }>
                <View style={tw`flex-row`}>
                  <Image
                    source={{uri: item?.avatar?.url}}
                    width={40}
                    height={40}
                    borderRadius={100}
                  />
                  <View style={tw`pl-3`}>
                    <View style={tw`flex-row items-center relative`}>
                      <Text style={tw`text-lg text-black`}>{item?.name}</Text>
                      {item.role === 'Admin' && (
                        <Image
                          source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828640.png',
                          }}
                          width={15}
                          height={15}
                          style={tw`ml-1`}
                        />
                      )}
                    </View>
                    <Text style={tw`"text-md text-gray-950`}>
                      {item?.userName}
                    </Text>
                  </View>
                </View>
                {user._id !== item._id && (
                  <TouchableOpacity
                    style={tw`rounded-md w-20 flex-row justify-center items-center h-20 border border-gray-900`}
                    onPress={() => handleFollowUnfollow(item)}>
                    <Text style={tw`text-black`}>
                      {item?.followers?.find((i: any) => i.userId === user._id)
                        ? 'Following'
                        : 'Follow'}
                    </Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}

      {active === 2 && (
        <Text style={tw`text-lg text-center pt-10 text-black`}>No Pending</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  links: {
    fontSize: 24,
    paddingLeft: 14,
    color: 'black',
  },
});

export default FollowerCard;
