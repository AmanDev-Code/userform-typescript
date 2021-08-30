import { Box, Typography, Grid, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreActions, useStoreState } from '../../Easy-peasy/Store';

const useStyles = makeStyles({
    Grid: {
        background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
    },
    Box: {
        background: 'rgb(85, 41, 220)',
    },
    Typography: {
        display: 'flex'
    }
})

const DynamicUserInfo: FC = () => {
    const classes = useStyles();

    const userId: any = useParams();

    const userdetails = useStoreState((state) => {
        return state.users.userDetails
    });
    const { setUserInfo } = useStoreActions((store) => store.users);

    setUserInfo(userId);

    return (
        <>
            {userdetails.userId !== null ? <Grid container  >
                <Grid item md={12} xs={12} className={classes.Grid}>
                    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh' >

                        <Box p={2} borderRadius={10} mb={2} className={classes.Box} key={Number(userdetails.userId)}>
                            <Typography variant='h6' className={classes.Typography}> Name : {userdetails.userName}</Typography>
                            <Typography variant='h6' className={classes.Typography}>  Email : {userdetails.userEmail} </Typography>
                            <Typography variant='h6' className={classes.Typography}>  Age : {userdetails.userAge}</Typography>

                        </Box>


                    </Box>
                </Grid>
            </Grid>
                :
                <h1>Sorry! the page your are visiting does'nt contain any information or the id is invalid. Try again later</h1>}
        </>
    )
}
export default DynamicUserInfo;
