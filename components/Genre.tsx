import React from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";

const Container = styled.View`
    flex-direction: row;
    flex-wrap:      wrap;
    justify-content:    center;

`
const GenreContainer = styled.View`
    border: 1px solid #CCCCCC;
    border-radius: 3px;
    margin: 0 2px 2px 0;
    padding: 3px;
`

const Text = styled.Text`
    opacity: 0.5;
    font-size: 8px;
`
type Props = {
    genres: string[]
}

const Genre: React.FC<Props> = ({genres}) => {
    return (
        <Container>
            
            {genres.map((genre, index) => {
                return (
                <GenreContainer key={index.toString()}>
                    <Text style={styles.SyneMono}>{genre}</Text>
                </GenreContainer> )
            })}
            
        </Container>
    )
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
export default Genre;


