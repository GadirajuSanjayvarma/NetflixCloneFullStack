import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    column:{
        
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 5,
    },
    image: {
        height: 75,
        aspectRatio: 16/9,
        resizeMode: 'cover',
        borderRadius: 3,
    },
    titleContainer: {
        flex: 0,
        paddingTop: 50,
        justifyContent: 'center',
    },
    title: {

    },
    duration: {
        color: 'darkgrey',
        fontSize: 10,
    },
    plot: {
        color: 'darkgrey',
        paddingLeft:10
    }
})

export default styles;
