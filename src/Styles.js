import { StyleSheet } from "react-native";

export const colors = {
    white: '#FFF',
    whiteSmoke: '#F8F8F8',
    gray: '#BFBFBF',
    primary: '#E83E7F',
    darken: '#010044',
    black: '#000',
    mask: 'rgba(0,0,0,0.5)'
}

export const styles = StyleSheet.create({
    bgPrimary: {
		backgroundColor: colors.white,
        padding: 3,
		height: '100%'
	},
    white: {
        backgroundColor: colors.white
    },
    whiteSmoke: {
        backgroundColor: colors.whiteSmoke
    },
    darken: {
        backgroundColor: colors.darken
    },
    mask: {
        backgroundColor: colors.mask
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.mask,
    },
    modalHeader: {
        backgroundColor: colors.white,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        width: '100%',
        borderColor: colors.whiteSmoke,
    },
    modalBody: {
        backgroundColor: colors.white,
        height: '70%',
        maxHeight: '70%'
    },
    modalContent: {
        padding: 12,
        paddingBottom: 20,
        width: '100%',
    },
    modalFooter: {
        backgroundColor: colors.white,
        paddingVertical: 12,
        paddingHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        width: '100%',
        borderColor: colors.whiteSmoke,
    },
	button: {
		backgroundColor: colors.primary,
		paddingVertical: 6,
		paddingHorizontal: 8,
		marginVertical: 5,
		marginHorizontal: 3,
	},
	buttonLabel: {
		color: colors.white,
		textAlign: 'center',
	},
    buttonNormal: {
        borderWidth: 1,
        borderColor: colors.whiteSmoke,
		paddingVertical: 6,
		paddingHorizontal: 8,
		marginVertical: 5,
		marginHorizontal: 3,
    },
	buttonLabelNormal: {
		textAlign: 'center',
	},
    input: {
        backgroundColor: colors.whiteSmoke,
        paddingVertical: 6,
        paddingHorizontal: 8,
		marginVertical: 5,
		marginHorizontal: 3,
    },
    inputSelected: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.primary
    },
    picker: {
        backgroundColor: colors.whiteSmoke,
        paddingHorizontal: 8,
		marginVertical: 5,
		marginHorizontal: 3,
        width: '10%',
        height: 40
    },
    chip: {        
        borderWidth: 1,
        borderColor: colors.whiteSmoke,
		paddingVertical: 6,
		paddingHorizontal: 8,
		marginVertical: 5,
		marginHorizontal: 3,
    },
    chipSelected: {        
        backgroundColor: colors.primary,
		paddingVertical: 6,
		paddingHorizontal: 8,
		marginVertical: 5,
		marginHorizontal: 3,
    },
    flexColumn: {
		flexDirection: 'column',
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexRowRev: {
        flexDirection: 'row-reverse',
    },
    flexWrap: {
        flexWrap: 'wrap'
    },
    flexGrow: {
        flexGrow: 1
    },
    flexBasisAuto: {
        flexBasis: 'auto'
    },
    width40: {
        marginHorizontal: '1%',
        minWidth: '40%',
    },
    width50: {
        marginHorizontal: '1%',
        minWidth: '48%',
    },
    width100: {
        minWidth: '90%',
    },
    width98: {
        minWidth: '98%',
    },
    justifyContentCenter: {
		justifyContent: 'center',
    },
    justifyContentBetween: {
		justifyContent: 'space-between',
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    marginHor6: {
        marginHorizontal: 6
    },
    marginVer5: {
        marginVertical: 5
    },
    marginTop10: {
        marginTop: 10
    },
    marginTop30: {
        marginTop: 30
    },
    paddingTop8: {
        paddingTop: 8
    },
    textBold: {
        fontWeight: 'bold'
    }
});