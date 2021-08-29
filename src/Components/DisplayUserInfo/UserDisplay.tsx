
import { Box,Icon, IconButton, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Idata from '../../Easy-peasy/Interfaces';
import { useStoreActions } from '../../Easy-peasy/Store';


interface Props {
    data: Idata;
    editItems(uniqueid: Idata): void;

}

const UserDisplay = ({ data, editItems }: Props) => {

    const removeUser = useStoreActions((store) => store.users.removeUser);

    const deleteItem = async (id: number, name: string) => {
        const isConfirmed = window.confirm(`Deleting a User \nid: ${id} \nName: ${name} \ncan't be restored?`);
        if (!isConfirmed) return;
        removeUser(String(id));
    }

    return (
        <>
    
            <div key={Number(data.userId)}>
                <Box p={2} borderRadius={10} mb={2} style={{ background: 'rgb(85, 41, 220)' }} key={Number(data.userId)}>
                    <Typography variant='h6' style={{ display: 'flex' }}> Name : {data.userName}</Typography>
                    <Typography variant='h6' style={{ display: 'flex' }}>  Email : {data.userEmail} </Typography>
                    <Typography variant='h6' style={{ display: 'flex' }}>  Age : {data.userAge}</Typography>
                    <IconButton size="medium" onClick={() => { editItems(data); }} aria-label="edit">
                        <Icon fontSize='large' color='secondary' className="fas fa-pencil-alt"></Icon>
                    </IconButton>
                    <IconButton size="medium" onClick={() => { deleteItem(Number(data.userId), data.userName); }} aria-label="edit">
                        <Icon fontSize='large' color='primary' className="fas fa-trash"></Icon>
                    </IconButton>
                    <Link to={'/information/' + data.userId}>
                    <IconButton size="medium" aria-label="edit">
                        <Icon fontSize='large' color='error' className="fas fa-arrow-circle-right"></Icon>
                    </IconButton>
                   </Link>

                </Box>
            </div>


        </>
    )
}

export default UserDisplay;