import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#252525'
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    letterSpacing: 4
  },
  footer: {
    marginTop: 30,
    flexDirection: 'row'
  },
  title: {
    color: '#D2FF58',
    flex: 1,
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'KanitRegular',
  },
  author: {
    color: '#EEEEEE',
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'KanitRegular'
  },
  gameboard: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 24,
    color: '#EEEEEE',
    margin: 5
  },
  numbers: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 30,
    color: '#EEEEEE',
    marginTop: 20,
  },
  icons: {
    flexDirection: "row",
    marginBottom: 20
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#D2FF58",
    width: 280,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#252525",
    fontSize: 22
  }
});