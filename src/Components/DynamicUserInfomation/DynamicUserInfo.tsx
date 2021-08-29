
import { Box, Typography, Grid } from '@material-ui/core';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreActions, useStoreState } from '../../Easy-peasy/Store';
const DynamicUserInfo: FC = () => {
    const userId: any = useParams();
    const userdetails = useStoreState((state) => {
        return state.users.userDetails
    });
    const setUserInfo = useStoreActions((store) => store.users.setUserInfo);
    setUserInfo(userId);
    return (
        <>    {userdetails.userId !== "" ? <Grid container  >
            <Grid item md={12} xs={12} style={{ background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)' }}>
                <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh' >

                    <Box p={2} borderRadius={10} mb={2} style={{ background: 'rgb(85, 41, 220)' }} key={Number(userdetails.userId)}>
                        <Typography variant='h6' style={{ display: 'flex' }}> Name : {userdetails.userName}</Typography>
                        <Typography variant='h6' style={{ display: 'flex' }}>  Email : {userdetails.userEmail} </Typography>
                        <Typography variant='h6' style={{ display: 'flex' }}>  Age : {userdetails.userAge}</Typography>

                    </Box>


                </Box>
            </Grid>
        </Grid>
            :
            <h1>Sorry! the page your are visiting does'nt contain any information or the id is invalid. Try again later</h1>}
        </>
    )
}

export default DynamicUserInfo
