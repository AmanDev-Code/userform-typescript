
import { Box,Icon, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import UserDetails from '../../Easy-peasy/Interfaces';
import { useStoreActions } from '../../Easy-peasy/Store';

interface Props {
    info: UserDetails;
    editItems(uniqueid: UserDetails): void;

}

const useStyles = makeStyles({
    Box: {
        background: '#6200ea'
    },
    userDetailsTransfer: {
        color: '#64b5f6'
    }
})

const UserDisplay = ({ info, editItems }: Props) => {
    const classes = useStyles();

    const removeUser = useStoreActions((store) => store.users.removeUser);

    const deleteItem = async (id: number, name: string) => {
        const isConfirmed = window.confirm(`Deleting a User \nid: ${id} \nName: ${name} \ncan't be restored?`);
        if (!isConfirmed) return;
        removeUser(String(id));
    }

    return (
        <>
            <div key={Number(info.userId)}>
                <Box p={2} borderRadius={10} mb={2} className={classes.Box} key={Number(info.userId)}>
                    <Typography variant='h6' style={{ display: 'flex' }}> Name  : {info.userName}</Typography>
                    <Typography variant='h6' style={{ display: 'flex' }}> Email : {info.userEmail} </Typography>
                    <Typography variant='h6' style={{ display: 'flex' }}> Age : {info.userAge}</Typography>
                    <IconButton size="medium" onClick={() => { editItems(info); }} aria-label="edit">
                        <Icon fontSize='large' color='secondary' className="fas fa-pencil-alt"></Icon>
                    </IconButton>
                    <IconButton size="medium" onClick={() => { deleteItem(Number(info.userId), info.userName); }} aria-label="edit">
                        <Icon fontSize='large' color='primary' className="fas fa-trash"></Icon>
                    </IconButton>
                    <Link to={'/information/' + info.userId}>
                    <IconButton size="medium" aria-label="edit" className={classes.userDetailsTransfer}>
                        <Icon fontSize='large' className="fas fa-arrow-circle-right"></Icon>
                    </IconButton>
                   </Link>
                </Box>
            </div>
        </>
    )
}

export default UserDisplay;