import React, { useState, FC, ChangeEvent } from 'react'
import UserDisplay from '../DisplayUserInfo/UserDisplay';
import { Box, Button, FilledInput, FormControl, Grid, Icon, InputLabel } from '@material-ui/core';
import { CloudCircleRounded } from '@material-ui/icons';
import { useStoreActions, useStoreState } from '../../Easy-peasy/Store';
import Idata from '../../Easy-peasy/Interfaces';


const UserForm: FC = () => {
    const userdata = useStoreState((store) => store.users.items);
    const createUser = useStoreActions((store) => store.users.createUser);

    const updateUser = useStoreActions((store) => store.users.updateUser);

    const [userInformation, setInfo] = useState<Idata>({ userId: "", userName: '', userEmail: '', userAge: undefined });
    const [toggleButton, setToggleButton] = useState(false);
    const [iseditItems, setIsEditItem] = useState<String>();


    const inputEventName = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setInfo({ ...userInformation, [name]: value, userId: String(Number(Math.random().toString().slice(2, 11))) });
    };

    // edit the current data card
    const editItems = (userinfo: Idata) => {

        console.log(userinfo)
        if (userinfo.userId) {
            setIsEditItem(userinfo.userId)
            setToggleButton(true);
            setInfo({
                userId: String(userinfo.userId), userName: userinfo.userName, userEmail: userinfo.userEmail, userAge: userinfo
                    .userAge
            });
            return userinfo.userId;
        }
        return null
    }

    const onSubmits = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        if ((toggleButton)) {
            updateUser({ userId: String(iseditItems), userName: userInformation.userName, userEmail: userInformation.userEmail, userAge: Number(userInformation.userAge) })
            setInfo({ userId: "", userName: '', userEmail: '', userAge: 0 });
            setToggleButton(false);
        } else {
            createUser({ userId: userInformation.userId, userName: userInformation.userName, userEmail: userInformation.userEmail, userAge: Number(userInformation.userAge) });
            setInfo({ userId: "", userName: '', userEmail: '', userAge: 0 });
        }
    }

    //redering the JSX and UserDisplay component
    return (
        <>
            <Grid container  >
                <Grid item md={8} xs={12} style={{ background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)' }}>
                    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh' >

                        <Box p={5} borderRadius={15} boxShadow={3} style={{ backgroundColor: "rgba(148,187,233,1) 100%", width: '50%' }}>
                            <form onSubmit={onSubmits} autoComplete="off">
                                <FormControl variant="filled" color='primary' style={{ display: 'block', marginBottom: '20px' }}>
                                    <InputLabel htmlFor="component-filled">Name</InputLabel>
                                    <FilledInput type='text' id="component-filled" value={userInformation.userName} onChange={inputEventName} name="userName" required fullWidth autoComplete="off" />
                                </FormControl>
                                <FormControl variant="filled" color='primary' style={{ display: 'block', marginBottom: '20px' }}>
                                    <InputLabel htmlFor="component-outlined">Email</InputLabel>
                                    <FilledInput type='text' id="component-outlined" value={userInformation.userEmail} onChange={inputEventName} name="userEmail" required fullWidth autoComplete="off" />
                                </FormControl>
                                <FormControl variant="filled" color='primary' style={{ display: 'block', marginBottom: '20px' }}>
                                    <InputLabel htmlFor="component-outlined">Age</InputLabel>
                                    <FilledInput type='number' id="component-outlined" value={userInformation.userAge} onChange={inputEventName} name="userAge" required fullWidth autoComplete="off" />
                                </FormControl>
                                {toggleButton ? <Button type="submit" style={{
                                    fontSize: 16,
                                    color: '#C0392B',
                                    padding: '6px 12px',
                                    lineHeight: 1.5,
                                    backgroundColor: '#F4D03F',

                                }} endIcon={<CloudCircleRounded />}> Update</Button>
                                    : <Button type="submit" style={{
                                        fontSize: 16,
                                        color: '#fff',
                                        padding: '6px 12px',
                                        backgroundColor: 'rgb(240, 21, 13)',

                                    }} variant="contained" color="secondary" endIcon={<Icon>send</Icon>}>Submit</Button>}
                            </form>
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={4} xs={12} style={{ background: 'linear-gradient(90deg, rgba(240,28,89,1) 0%, rgba(233,215,153,1) 100%)' }}>
                    <Box p={3}>
                        {userdata.map((data: any, key: number) => {
                            return (
                                <>
                                    <UserDisplay data={data} editItems={editItems} />

                                </>
                            )
                        })}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
export default UserForm