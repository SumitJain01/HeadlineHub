import Bt from '@src/assets/svgs/bt.svg';
import Mint from '@src/assets/svgs/mint.svg';
import Toi from '@src/assets/svgs/toi.svg';
import Pin from '@src/assets/svgs/whitepin.svg';
import Delete from '@src/assets/svgs/delete.svg';
import PinTop from '@src/assets/svgs/Pin.svg';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import { formatTimestamp } from '@src/consts';

const NewsCard = ({ news, index, newsToShow, setNewsToShow, showPin, pinNews, setPinNews }) => {
  const rightButtons = [
    <View style={style.swipe}>
      <TouchableOpacity style={style.pin} onPress={() => { onDelete() }}>
        <View style={{ marginLeft: 4 }}>
          <Delete width={32} height={32} />
        </View>
        <Text style={style.side}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.pin2} onPress={() => { onPin() }}>
        <Pin width={24} height={24} />
        <Text style={style.side}>Pin</Text>
      </TouchableOpacity>
    </View>,
  ];
  const onDelete = () => {
    if (showPin) {
      setPinNews([])
      return;
    }
    let filteredNews = newsToShow.filter((itm) => {
      return itm.title != news?.title;
    });
    setNewsToShow(filteredNews)
  }
  const onPin = () => {
    pinNews &&
      setNewsToShow((prev) => [...pinNews, ...prev])
    setPinNews(news)
    onDelete();
  }
  return (
    <Swipeable rightButtons={rightButtons}>
      {showPin &&
        <View style={style.pinTop}>
          <PinTop width={11} height={11} />
          <Text style={style.pintext}>
            Pinned on top
          </Text>
        </View>}
      <View style={style.main} >
        <View style={style.info}>
          <View style={style.topView}>
            {index % 3 === 0 ?
              <Toi width={20} height={20} />
              :
              index % 2 === 0 ?
                <Bt width={20} height={20} />
                :
                <Mint width={20} height={20} />
            }
            <Text style={style.channel}>{news?.source?.name?.slice(0, 30)}</Text>
          </View>
          <Text style={style.time}>{formatTimestamp(news?.publishedAt)}</Text>
        </View>
        <View style={style.desc} >
          <Text style={style.headline} numberOfLines={3}>{news?.title}</Text>
          <Image style={style.profileImage} source={{ uri: news?.urlToImage, }} resizeMode={'contain'} />
        </View>
        <Text style={style.name}>{news?.author?.slice(0, 30)}</Text>
      </View>
    </Swipeable>
  );
};

const style = StyleSheet.create({
  main: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  headline: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 18,
    color: '#000000',
    width: '70%',
    marginRight: 16

  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  name: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: '#818181',
  },
  time: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: '#000000',
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channel: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 15,
    color: '#808080',
    marginLeft: 8
  },
  desc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#D6D6E2',
  },
  profileImage: {
    height: 90,
    width: 90,
    borderRadius: 16,
    backgroundColor: '#EAEAEA',
  },
  swipe: {
    backgroundColor: '#4BBDFC',
    height: '80%',
    marginVertical: 20,
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    paddingVertical: 16,
    flexDirection: 'col',
    justifyContent: 'space-between',
    paddingLeft: 20
  },
  side: {
    color: '#ffffff',
  },
  pin: {
    flexDirection: 'col',
    alignItems: 'start',

  },
  pin2: {
    flexDirection: 'col',
    alignItems: 'start',
    marginLeft: 6
  },
  pinTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: -10
  },
  pintext: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 13,
    color: '#808080',
    marginLeft: 4
  }
});

export default NewsCard;
