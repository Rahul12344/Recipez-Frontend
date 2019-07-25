import React from 'react';
import { View } from 'react-native';
import SquareButton from './SquareButton'

const ButtonRow = () => {
  return (
    <View style={styles.containerStyle}>
      <SquareButton>
            My Recipes
        </SquareButton>
        <SquareButton>
            Trending Recipes
        </SquareButton>
        <SquareButton>
            Food News
        </SquareButton>
    </View>
  );
};

const styles = {
    containerStyle: {
      flexDirection: 'row',
    }
  };


export default ButtonRow;