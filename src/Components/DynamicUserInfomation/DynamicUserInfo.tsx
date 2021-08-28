
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreActions, useStoreState } from '../../Easy-peasy/Store';
import '../style.css'

const DynamicUserInfo: FC = () => {
    const userId: any = useParams();
    const userdetails = useStoreState((state) => {
        return state.users.userDetails
    });
    const setUserInfo = useStoreActions((store) => store.users.setUserInfo);
    setUserInfo(userId);
    return (
        <>
            <div className="showItems" >
                <div className='eachItem'>
                    <h1>Name: {userdetails.userName}</h1>
                    <h1>Email: {userdetails.userEmail}</h1>
                    <h1>Age: {userdetails.userAge}</h1>
                </div>
            </div>
        </>
    )
}

export default DynamicUserInfo
