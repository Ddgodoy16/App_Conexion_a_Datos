import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto: {
    paddingTop: 50,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },

  image: {
    width: 350, 
    height: 350, 
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalImage: {
    width: 300,
    height: 300,
  },
  modalText: {
    fontSize: 25,
    marginBottom: 10,
  },
  searchInput:{
    paddingTop: 80,
    
  }

});
