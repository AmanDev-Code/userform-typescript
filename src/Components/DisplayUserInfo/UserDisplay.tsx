
import { Box, Fab, Tooltip, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Idata from '../../Easy-peasy/Interfaces';


interface Props {
    data: Idata;
    deleteItem(uniqueid: number | string, userName: string): void;
    editItems(uniqueid: String): void;

}

const UserDisplay = ({ data, deleteItem, editItems }: Props) => {

    return (
        <>

            <div key={Number(data.userId)}>
                <Box p={2} borderRadius={10} mb={2} style={{ backgroundColor: '#d8f3dc' }} key={Number(data.userId)}>
                    <Typography variant='h6' style={{ display: 'flex' }}> Name : {data.userName}</Typography>
                    <Typography variant='h6' style={{ display: 'flex' }}>  Email : {data.userEmail} </Typography>
                    <Typography variant='h6' style={{ display: 'flex' }}>  Age : {data.userAge}</Typography>
                    <div><i className="fas fa-edit" onClick={() => { editItems(data.userId); }}></i>
                        <i className="fas fa-trash-alt" onClick={() => { deleteItem(Number(data.userId), data.userName); }}></i>
                        <Link to={'/information/' + data.userId}>
                            <i className="fas fa-arrow-alt-circle-right" ></i> </Link ></div >

                </Box>
            </div>


        </>
    )
}

export default UserDisplay;

{/* <div className="eachItem" key={key}>
    <h3 >{data.userName}</h3>
    <h3 >{data.userEmail}</h3>
    <h3 >{data.userAge}</h3>


</div > */}