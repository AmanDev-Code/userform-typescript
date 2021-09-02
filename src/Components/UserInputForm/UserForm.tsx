import React, { useState, FC } from 'react'
import UserDisplay from '../DisplayUserInfo/UserDisplay';
import { Box, Button, Grid, Icon, makeStyles } from '@material-ui/core';
import { CloudCircleRounded } from '@material-ui/icons';
import store, { useStoreActions, useStoreState } from '../../Easy-peasy/Store';
import UserDetails from '../../Easy-peasy/Interfaces';
import { ReactForm, IFormActionProps, IFieldProps, IProps, getFieldError } from 'react-forms';
import { FormikHelpers } from 'formik';

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

    const styles = useStyles();

    const userdata = useStoreState((store) => store.users.users);
    const createUser = useStoreActions((store) => store.users.createUser);
    const updateUser = useStoreActions((store) => store.users.updateUser);

    const [userInformation, setInfo] = useState<UserDetails>({ userId: "", userName: '', userEmail: '', userAge: '' });
    const handleConfig: IFormActionProps = {
        submitButtonText: (userInformation.userId === "") ? 'Submit' : 'Update',
        submitButtonProps: {
            className: (userInformation.userId === "") ? styles.SubmitButton : styles.UpdateButton,
            variant: "contained",
            color: "secondary",
            size: 'large',
            endIcon: (userInformation.userId === "") ? <Icon>send</Icon> : <CloudCircleRounded />
        },
    };

    const userConfig = [{
        type: 'text',
        valueKey: 'userName',
        fieldProps: { variant: "filled", label: 'Name', className: styles.FormControl, color: 'primary', fullWidth: true, required: true },

    },
    {
        type: 'text',
        valueKey: 'userEmail',
        fieldProps: { variant: "filled", label: 'Email', className: styles.FormControl, color: 'primary', fullWidth: true, required: true }
    },
    {
        type: "text",
        valueKey: 'userAge',
        fieldProps: { variant: "filled", label: 'Age', className: styles.FormControl, color: 'primary', fullWidth: true, required: true }
    },
    ]


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

    const onSubmits = (values: UserDetails, onSubmitProps: FormikHelpers<UserDetails>) => {
        if ((userInformation.userId)) {
            updateUser({ userId: String(userInformation.userId), userName: values.userName, userEmail: values.userEmail, userAge: Number(values.userAge) })
            setInfo({ userId: "", userName: '', userEmail: '', userAge: 0 });
            store.persist.flush();
        } else {
            createUser({ userId: String(Number(Math.random().toString().slice(2, 11))), userName: values.userName, userEmail: values.userEmail, userAge: Number(values.userAge) });
            setInfo({ userId: "", userName: '', userEmail: '', userAge: 0 });
            store.persist.flush();
        }
        onSubmitProps.setSubmitting(false);
    }

    const clearAllUsers = async () => {
        await store.persist.clear();
        window.location.reload();
    }

    //redering the JSX and UserDisplay component
    return (
        <>
            <Grid container  >
                <Grid item md={8} xs={12} className={styles.GridForm}>
                    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh' >
                        <Box p={5} borderRadius={15} boxShadow={3} className={styles.BoxForm}>
                            <ReactForm formId='userForm'
                                actionConfig={handleConfig}
                                initialValues={userInformation}
                                config={userConfig}
                                onSubmit={onSubmits}
                                enableReinitialize
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={4} xs={12} className={styles.GridDisplay}>

                    <Box p={2}>
                        {userdata.length > 1 ? <Button type="reset" className={styles.Reset} variant="contained" color="secondary" onClick={() => { clearAllUsers() }} endIcon={<i className="fas fa-broom"></i>}>Clear All</Button> : null}
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

