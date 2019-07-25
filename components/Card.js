import React from 'react';
import { View } from 'react-native';
import { w, h } from '../api/Dimensions';

const RecipeCard = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: w(1),
    marginRight: w(1),
    marginTop: h(1),
    flexDirection: 'row',
  }
};

export default RecipeCard;