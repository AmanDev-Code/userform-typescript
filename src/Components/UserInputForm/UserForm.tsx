import React, { useState, FC, ChangeEvent } from 'react'
import UserDisplay from '../DisplayUserInfo/UserDisplay';
import { Box, Button, FilledInput, FormControl, Grid, Icon, InputLabel, makeStyles } from '@material-ui/core';
import { CloudCircleRounded } from '@material-ui/icons';
import store, { useStoreActions, useStoreState } from '../../Easy-peasy/Store';
import UserDetails from '../../Easy-peasy/Interfaces';

const useStyles = makeStyles({
    SubmitButton: {
        fontSize: 16,
        color: '#fff',
        padding: '6px 12px',
        backgroundColor: 'rgb(240, 21, 13)',
        lineHeight: 1.5,
        '&:hover': {
            backgroundColor: '#F4D03F',
            borderColor: '#21618C',
            color: '#C0392B',
            boxShadow: 'none',
        },
    },
    UpdateButton: {
        fontSize: 16,
        color: '#C0392B',
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: '#F4D03F',
        '&:hover': {
            backgroundColor: 'rgb(240, 21, 13)',
            borderColor: '#21618C',
            color: '#fff',
            boxShadow: 'none',
        },
    },
    GridForm: {
        background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
    },
    GridDisplay: {
        background: 'linear-gradient(90deg, rgba(240,28,89,1) 0%, rgba(233,215,153,1) 100%)',
    },
    BoxForm: {
        backgroundColor: "rgba(148,187,233,1) 100%",
        width: '50%',
    },
    FormControl: {
        display: 'block',
        marginBottom: '20px',
    },
    Reset: {
        marginBottom: '10px',
        fontSize: 16,
        color: '#C0392B',
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: '#F4D03F',
        width: '100%',
        '&:hover': {
            backgroundColor: 'rgb(240, 21, 13)',
            borderColor: '#21618C',
            color: '#fff',
            boxShadow: 'none',
        },
    }
});

const UserForm: FC = () => {

    const classes = useStyles();

    const userdata = useStoreState((store) => store.users.users);
    const createUser = useStoreActions((store) => store.users.createUser);
    const updateUser = useStoreActions((store) => store.users.updateUser);

    const [userInformation, setInfo] = useState<UserDetails>({ userId: "", userName: '', userEmail: '', userAge: undefined });

    const inputEventName = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setInfo({ ...userInformation, [name]: value });
    };

    // edit the current data card
    const editUser = (userinfo: UserDetails) => {
        if (userinfo.userId) {
            setInfo({
                userId: userinfo.userId, userName: userinfo.userName, userEmail: userinfo.userEmail, userAge: userinfo
                    .userAge
            });
            return userinfo.userId;
        }
        return null
    }

    const onSubmits = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        if ((userInformation.userId)) {
            updateUser({ userId: String(userInformation.userId), userName: userInformation.userName, userEmail: userInformation.userEmail, userAge: Number(userInformation.userAge) })
            setInfo({ userId: "", userName: '', userEmail: '', userAge: 0 });
            store.persist.flush();
        } else {
            createUser({ userId: String(Number(Math.random().toString().slice(2, 11))), userName: userInformation.userName, userEmail: userInformation.userEmail, userAge: Number(userInformation.userAge) });
            setInfo({ userId: "", userName: '', userEmail: '', userAge: 0 });
            store.persist.flush();
        }
    }

    const clearAllUsers = async () => {
        await store.persist.clear();
        window.location.reload();
    }

    //redering the JSX and UserDisplay component
    return (
        <>
            <Grid container  >
                <Grid item md={8} xs={12} className={classes.GridForm}>
                    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh' >
                        <Box p={5} borderRadius={15} boxShadow={3} className={classes.BoxForm}>
                            <form onSubmit={onSubmits} autoComplete="off">
                                <FormControl variant="filled" color='primary' className={classes.FormControl}>
                                    <InputLabel htmlFor="component-filled">Name</InputLabel>
                                    <FilledInput type='text' id="component-filled" value={userInformation.userName} onChange={inputEventName} name="userName" required fullWidth autoComplete="off" />
                                </FormControl>
                                <FormControl variant="filled" color='primary' className={classes.FormControl}>
                                    <InputLabel htmlFor="component-outlined">Email</InputLabel>
                                    <FilledInput type='text' id="component-outlined" value={userInformation.userEmail} onChange={inputEventName} name="userEmail" required fullWidth autoComplete="off" />
                                </FormControl>
                                <FormControl variant="filled" color='primary' className={classes.FormControl}>
                                    <InputLabel htmlFor="component-outlined">Age</InputLabel>
                                    <FilledInput type='number' id="component-outlined" value={userInformation.userAge} onChange={inputEventName} name="userAge" required fullWidth autoComplete="off" />
                                </FormControl>
                                {userInformation.userId ? <Button type="submit" className={classes.UpdateButton} endIcon={<CloudCircleRounded />}> Update</Button>
                                    : <Button type="submit" className={classes.SubmitButton} variant="contained" color="secondary" endIcon={<Icon>send</Icon>}>Submit</Button>}
                            </form>
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={4} xs={12} className={classes.GridDisplay}>
                    
                    <Box p={2}>
                    {userdata.length > 1 ? <Button  type="reset" className={classes.Reset} variant="contained" color="secondary" onClick={() => {clearAllUsers()}} endIcon={<i className="fas fa-broom"></i>}>Clear All</Button>: null}
                        {userdata.map((data: any, key: number) => {
                            return (
                                <>
                                    <UserDisplay info={data} editItems={editUser} />
                                </>
                            )
                        })}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
export default UserForm;

