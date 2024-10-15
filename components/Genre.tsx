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
  
    SyneMono: {
      fontFamily: 'SyneMono-Regular',
      fontSize: 12,
      color: '#FFF',
    }
  });
export default Genre;


