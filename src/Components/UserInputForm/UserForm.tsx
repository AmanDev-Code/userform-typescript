import React, { useState, FC, ChangeEvent } from 'react'

import UserDisplay from '../DisplayUserInfo/UserDisplay';

import { Box, Button, FilledInput, FormControl, Grid, Icon, InputLabel} from '@material-ui/core';
import { CloudCircleRounded} from '@material-ui/icons';
import { useStoreActions, useStoreState } from '../../Easy-peasy/Store';
import Idata from '../../Easy-peasy/Interfaces';


const UserForm: FC = () => {

    const createUser = useStoreActions((store) => store.users.createUser);
    const removeUser = useStoreActions((store) => store.users.removeUser);
    const updateUser = useStoreActions((store) => store.users.updateUser);

    const [Id, setId] = useState<String>("");
    const [userInformation, setInfo] = useState<Idata>({ userId : "" , userName : '' , userEmail: '',  userAge : 0});
    const [toggleButton, setToggleButton] = useState(false);
    const [iseditItems, setIsEditItem] = useState<Idata | any>([]);
    const userdata = useStoreState((store) => store.users.items);




    const inputEventName = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name , value } = event.target;
        setInfo({...userInformation , [name] : value , userId: String(Number(Math.random().toString().slice(2, 11)))});
    };


    // edit the current data card
    const editItems = (userid: String) => {
        const items_card_search_id: any = userdata.find((val) => {

            if (val.userId === userid) {
                setId(userid)
                setIsEditItem(String(Id))
                console.log(iseditItems)
                setToggleButton(true);
                return val;

            }
            return null
        });
        setIsEditItem(items_card_search_id.userId)
        console.log(items_card_search_id)
        console.log(iseditItems)
        setInfo({userId : items_card_search_id.userId , userName : items_card_search_id.userName , userEmail: items_card_search_id.userEmail,  userAge : items_card_search_id.userAge});
        


    }


    // delete Item in card
    const deleteItem = async (id: number, name: string) => {
        const isConfirmed = window.confirm(`Deleting a User \nid: ${id} \nName: ${name} \ncan't be restored?`);
        if (!isConfirmed) return;
        removeUser(String(id));
    }

    const onSubmits = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        if ((!userInformation.userName) || (!userInformation.userEmail) || (!userInformation.userAge)) {
            alert("Please fill the data")
        } else if ((userInformation.userName) && (userInformation.userEmail) && (userInformation.userAge) && (toggleButton)) {
            console.log(iseditItems)
            updateUser({ userId: iseditItems, userName: userInformation.userName, userEmail: userInformation.userEmail, userAge: Number(userInformation.userAge) })
            setInfo({userId : "" , userName : '' , userEmail: '',  userAge : 0});
            setToggleButton(false);
        } else {
            createUser({ userId: userInformation.userId , userName: userInformation.userName, userEmail: userInformation.userEmail, userAge: Number(userInformation.userAge) });
            setInfo({userId : "" , userName : '' , userEmail: '',  userAge : 0});
        }


    }

    //redering the JSX and displaying the core results
    return (
        <>
            <Grid container  >
                <Grid item md={6} xs={12} style={{ background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)' }}>
                    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh' >

                        <Box p={5} borderRadius={15} boxShadow={3} style={{ backgroundColor: "rgba(148,187,233,1) 100%", width: '50%' }}>
                            <form onSubmit={onSubmits} autoComplete="off">
                                <FormControl variant="filled" color='secondary' style={{ display: 'block', marginBottom: '20px' }}>
                                    <InputLabel htmlFor="component-filled">Name</InputLabel>
                                    <FilledInput id="component-filled" value={userInformation.userName} onChange={inputEventName} name="userName" required fullWidth autoComplete="off"/>
                                </FormControl>
                                <FormControl variant="filled" color='secondary' style={{ display: 'block', marginBottom: '20px' }}>
                                    <InputLabel htmlFor="component-outlined">Email</InputLabel>
                                    <FilledInput id="component-outlined" value={userInformation.userEmail} onChange={inputEventName} name="userEmail" required fullWidth autoComplete="off" />
                                </FormControl>
                                <FormControl variant="filled" color='secondary' style={{ display: 'block', marginBottom: '20px' }}>
                                    <InputLabel htmlFor="component-outlined">Age</InputLabel>
                                    <FilledInput id="component-outlined" value={userInformation.userAge} onChange={inputEventName} name="userAge" required fullWidth autoComplete="off" />
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
                <Grid item md={6} xs={12} style={{ background: 'linear-gradient(90deg, rgba(240,28,89,1) 0%, rgba(233,215,153,1) 100%)'}}>
                    <Box p={3}>
                        {userdata.map((data: any, key: number) => {
                            return (
                                <>
                                    <UserDisplay data={data} deleteItem={deleteItem} editItems={editItems} />

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