import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/Ionicons'; // También puedes usar otros sets como FontAwesome, Ionicons, etc.



const Container = styled.View`
    flex-direction: row;
    margin-vertical: 4px;
    align-items: center;
    justify-content: center;
`
type Props = {
    rating: number;
}
const Rating: React.FC<Props> = ({rating}) => {
    const totalOfFullStars  = Math.floor(rating / 2);
    const starOutLineArray  = Array(5 - totalOfFullStars).fill('star-outline');
    const fullStarsArray    = Array(totalOfFullStars).fill('star');
    const ratingStars  : any     = [...fullStarsArray, ...starOutLineArray];

    return (
        <Container>
            { ratingStars.map((icon : any, index : number) => (
                    <Icon name={icon} key={index} size={16} color="gray"></Icon>
                )
            )}
        </Container>
    );
}

export default Rating;