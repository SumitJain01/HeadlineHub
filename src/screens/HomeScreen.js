import Logo from '@src/assets/svgs/logo.svg';
import Refresh from '@src/assets/svgs/refresh.svg';
import { newsApiUrl } from '@src/consts';
import NewsCard from '@src/screens/NewsCard';
import React, { useEffect, useState, useRef } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [restart, setRestart] = useState(false);
  const [newsToShow, setNewsToShow] = useState([]);
  const [newsRemaining, setNewsRemaining] = useState([]);
  const [pinNews, setPinNews] = useState([])
  const timerRef = useRef(null);
  useEffect(() => {
    fetch(newsApiUrl)
      .then((resp) => resp.json())
      .then((data) => { storeNewsData(data?.articles) })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [update]);

  useEffect(() => {
    timerRef.current = setInterval(function () {
      addRandomNews()
    }, 10000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };

  }, [restart])
  const storeNewsData = async (data) => {
    try {
      await AsyncStorage.setItem('newsDataLocal', JSON.stringify(data))
      getNewsData();
    } catch (e) {
      console.error(e)
    }
  }
  const getNewsData = async () => {
    try {
      const value = await AsyncStorage.getItem('newsDataLocal')
      let resp = JSON.parse(value)
      if (resp !== null) {
        setNewsRemaining(resp)
        setNewsToShow(resp?.slice(0, 10));
        setRestart(!restart)
        setLoading(false)
      }
    } catch (e) {
      setLoading(false)
      console.error(e)
    }
  }
  const addRandomNews = () => {
    if (newsRemaining?.length === 0) {
      setUpdate(!update)
      setLoading(true)
      return;
    }
    const randomNews = newsRemaining
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    setNewsToShow((prev) => [...randomNews, ...prev]);
    setNewsRemaining((prev) => prev.filter((headline) => !randomNews.includes(headline)));
  };
  return (
    <View style={style.main}>
      <View style={style.header} >
        <Logo width={128} height={38} />
        <TouchableOpacity onPress={() => { { addRandomNews(), clearInterval(timerRef.current), setRestart(!restart) } }}>
          <Refresh />
        </TouchableOpacity>
      </View>
      <View style={style.separator} />
      {loading ?
        <View style={style?.loading}>
          <ActivityIndicator size="medium" color="#007FFF" />
        </View>
        :
        <ScrollView>
          {pinNews?.title &&
            <View>
              <NewsCard
                news={pinNews}
                newsToShow={newsToShow}
                setNewsToShow={setNewsToShow}
                showPin={true}
                pinNews={pinNews}
                setPinNews={setPinNews}
              />
              <View style={style.separator} />
            </View>}
          {
            newsToShow?.map((news, index) => {
              return (
                news?.title?.length > 20 && news?.author && news?.urlToImage &&
                <View>
                  <NewsCard
                    news={news}
                    key={index}
                    index={index}
                    newsToShow={newsToShow}
                    setNewsToShow={setNewsToShow}
                    showPin={false}
                    setPinNews={setPinNews}
                  />
                  <View style={style.separator} />
                </View>
              )
            })
          }
        </ScrollView>
      }
    </View>
  );
};

const style = StyleSheet.create({
  loading: {
    zIndex: 9999,
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    bottom: 0,
    opacity: 0.7,
    backgroundColor: '#FAFAFA',
  },
  main: {
    backgroundColor: '#ffffff',
    height: '100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#D6D6E2',
  }
});
export default HomeScreen;
