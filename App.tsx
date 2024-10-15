/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import styled from 'styled-components/native';
import Rating from './components/Rating';
import Genre from './components/Genre';
import { getMovies } from './api';
import * as CONSTANTS from './constants';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

interface Player {
  key:            string;
  originalTitle:  string;
  posterPath:     string;
  backdropPath:   string;
  voteAverage:    number;
  description:    string;
  releaseDate:    string;
  genres:         string[];
}

const Container = styled.View`
  flex: 1;
`
const PosterContainer = styled.View`
  width: ${CONSTANTS.ITEM_SIZE}px;
`
const Poster = styled.View` 
  margin-horizontal: ${CONSTANTS.SPACING}px;
  padding: ${CONSTANTS.SPACING * 2}px;
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 10px;
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
`
const PosterDescription = styled.Text`
  font-size: 12px;
`


function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [movies, setMovies] = useState<Player[]>([]);
  const [loadedMovies, setLoadedMovie] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovies();
      setMovies(data);
      setLoadedMovie(true);
    }

    fetchData();
  }, []);


  return (
      <Container>
        <StatusBar />
        <FlatList 
          showsHorizontalScrollIndicator={false}
          data={movies}
          keyExtractor={item => item.key}
          horizontal
          contentContainerStyle={{
            alignItems: 'center'
          }}
          renderItem={({item}) => {
            return (
              <PosterContainer>
                <Poster>
                  <PosterImage source={{ uri: item.posterPath }} />
                  <PosterTitle numberOfLines={1} style={styles.SyneMono}>{item.originalTitle} </PosterTitle>
                  <Rating rating={item.voteAverage} />
                  <Genre genres={item.genres} />
                  <PosterDescription numberOfLines={5} style={styles.SyneMono}>{item.description}</PosterDescription>
                </Poster>
              </PosterContainer>
            );
          }}
        />
      </Container>

  );
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  SyneMono: {
    fontFamily: 'SyneMono-Regular',
    fontSize: 12,
    color: 'black',
  }
});

export default App;
