import React, {useState} from 'react';

// custom components
import EditProfile from "./EditProfile";

// styling
import styles from './UserProfileHeader.module.css';

// material icons
import {
    Link,
    Phonelink,
    Edit
} from '@material-ui/icons'
import {EDIT_PROFILE_TITLE} from "./constants";

function UserProfileHeader(props) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const openLink = (url) => () => {
        if (url) {
            window.open(url.includes('://') ? url : `https://${url}`);
        }
    }

    const handleDialogClose = () => {
        setIsEditDialogOpen(false)
    }

    const handleDialogOpen = () => {
        setIsEditDialogOpen(true)
    }

    const formatLink = (url) => {
        if (url) {
            if (url.includes('://')) {
                return url.split('://')[1]
            } else {
                return url
            }
        }
    }

    return (
        <>
        <EditProfile
            handleAlertClose={props.handleAlertClose}
            alertOpen={props.alertOpen}
            loading={props.loading}
            requestStatus={props.requestStatus}
            open={isEditDialogOpen}
            user={props.user}
            editAccount={props.editAccount}
            handleClose={handleDialogClose}
        />
        <div className={styles.profileHeader}>
            <div className={styles.profileMain}>
                <div className={styles.profileContentHeader}>
                    <img
                        className={styles.profilePicture}
                        src={`${props.user.profilePicture}`}
                        alt="profile picture"
                        width={260}
                        height={260}
                    />
                    <div className={styles.profileContentMain}>
                        <p className={styles.profileName}>{props.user.firstname} {props.user.lastname}</p>
                        <p className={styles.profileUsername}>{props.user.username}</p>
                    </div>
                </div>
                <div className={styles.profileContent}>
                    <div className={styles.profileContentBio}>
                        <p>{props.user.biography}</p>
                    </div>
                    <div className={styles.profileContentSecondary}>
                        <div>
                            <Link />
                            <p className={styles.profileUrl} onClick={openLink(props.user.websiteLink)}>{formatLink(props.user.websiteLink)}</p>
                        </div>
                        <div>
                            <Phonelink />
                            <p className={styles.profileUrl} onClick={openLink(props.user.socialLink)}>{formatLink(props.user.socialLink)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <button className={styles.editInfo} onClick={handleDialogOpen}>
                <Edit style={{marginRight: "5px"}} />
                <p>{EDIT_PROFILE_TITLE}</p>
            </button>
        </div>
        </>
    )

}

export default UserProfileHeader;