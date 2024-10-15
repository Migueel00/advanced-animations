/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect, useRef} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Animated,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import styled from 'styled-components/native';
import Rating from './components/Rating';
import Genre from './components/Genre';
import { getMovies } from './api';
import * as CONSTANTS from './constants';
import LinearGradient from 'react-native-linear-gradient';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

interface Movie{
  key:            string;
  originalTitle:  string;
  posterPath:     string;
  backdropPath:   string;
  voteAverage:    number;
  description:    string;
  releaseDate:    string;
  genres:         string[];
}

type BackdropProps = {
  movies: Movie[]; 
  scrollX: Animated.Value; 
};

const Container = styled.View`
  flex: 1;
  padding-top: 50px;
  background-color: #000;
`
const PosterContainer = styled.View`
  width: ${CONSTANTS.ITEM_SIZE}px;
  margin.top: ${CONSTANTS.TOP}px;
`
const Poster = styled.View` 
  margin-horizontal: ${CONSTANTS.SPACING}px;
  padding: ${CONSTANTS.SPACING * 2}px;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  height: ${CONSTANTS.ITEM_SIZE * 2}px;
`
const PosterImage = styled.Image`
  width: 100%;
  height: ${CONSTANTS.ITEM_SIZE * 1.2}px;
  resize-mode: cover;
  border-radius: 10px;
  margin: 0 0 10px 0;
`

const PosterTitle = styled.Text`
  font-size: 18px;
  color: #FFF;
`
const PosterDescription = styled.Text`
  font-size: 12px;
`

const DummyContainer = styled.View`
  width: ${CONSTANTS.SPACER_ITEM_SIZE}px;
`
const ContentContainer = styled.View`
  position: absolute;
  width: ${CONSTANTS.WIDTH}px;
  height: ${CONSTANTS.BACKDROP_HEIGHT}px;
`
const BackdropContainer = styled.View`
  width: ${CONSTANTS.WIDTH}px;
  position: absolute;
  height: ${CONSTANTS.BACKDROP_HEIGHT}px;
  overflow: hidden;
`
const BackdropImage = styled.Image`
  position: absolute;
  width: ${CONSTANTS.WIDTH}px;
  height: ${CONSTANTS.BACKDROP_HEIGHT}px;
`

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadedMovies, setLoadedMovies] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovies();
      setMovies([{key: 'left-spacer' }, ...data, {key: 'right-spacer'}]);
      setLoadedMovies(true);
    }

    fetchData();
  }, []);

  const Backdrop: React.FC<BackdropProps> = ({ movies, scrollX }) => {
    return(
      <ContentContainer>
        <FlatList
          data={movies}
          keyExtractor={item => `${item.key}-black`}
          removeClippedSubviews={false}
          contentContainerStyle={{ width: CONSTANTS.WIDTH, height: CONSTANTS.BACKDROP_HEIGHT}}
          renderItem={({item, index}) => {
            if(!item.backdropPath){
              return null;
            }
            const translateX = scrollX.interpolate({
              inputRange: [(index - 1) * CONSTANTS.ITEM_SIZE, index * CONSTANTS.ITEM_SIZE],
              outputRange: [0, CONSTANTS.WIDTH]
            })
          return (
              <BackdropContainer
                as={Animated.View}
                style={{transform: [{translateX: translateX}]}}>
                <BackdropImage source={{uri: item.backdropPath}}/>
              </BackdropContainer>
            )
          }}

        ></FlatList>
        <LinearGradient 
          colors={['rgba(0, 0, 0, 0)', 'black']}
          style={{
            height: CONSTANTS.BACKDROP_HEIGHT,
            width: CONSTANTS.WIDTH,
            position: 'absolute',
            bottom: 0
          }}
          />
          
      </ContentContainer>
    )
  }

  if(!loadedMovies){
    return (<Text>Loading....</Text>)
  }


  return (
      <Container>
        <Backdrop movies={movies} scrollX={scrollX}></Backdrop>
        <StatusBar />
        <Animated.FlatList
          snapToInterval={CONSTANTS.ITEM_SIZE}
          decelerationRate={0}
          showsHorizontalScrollIndicator={false}
          data={movies}
          keyExtractor={item => item.key}
          horizontal
          contentContainerStyle={{
            alignItems: 'center'
          }}
          onScroll={Animated.event(
            [{ nativeEvent: {contentOffset: {x: scrollX}}}],
            { useNativeDriver: true}
          )}
          scrollEventThrottle={16}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 2) * CONSTANTS.ITEM_SIZE,
              (index - 1) * CONSTANTS.ITEM_SIZE,
              index * CONSTANTS.ITEM_SIZE
            ]

            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [0, -50, 0]
            })
            if(!item.originalTitle){
              return <DummyContainer/>
            }

            return (
              <PosterContainer>
                <Poster as = {Animated.View} style={{transform: [{translateY}]}}>
                  <PosterImage source={{ uri: item.posterPath }} />
                  <PosterTitle numberOfLines={1} style={styles.PosterTitle}>{item.originalTitle} </PosterTitle>
                  <Rating rating={item.voteAverage} />
                  <Genre genres={item.genres} />
                  <PosterDescription numberOfLines={5} style={styles.PosterDescription}>{item.description}</PosterDescription>
                </Poster>
              </PosterContainer>
            );
          }}
        />
      </Container>

  );
}



const styles = StyleSheet.create({
  PosterTitle: {
    fontFamily: 'SyneMono-Regular',
    fontSize: 18,
    color: '#FFF'
  },
  PosterDescription: {
    fontFamily: 'SyneMono-Regular',
    fontSize: 12,
    color: '#FFF',
  }
});

export default App;
