import React, {useEffect, useState} from 'react';

// custom components
import EditProfile from "../userProfile/EditProfile";
import CreateProjectDialog from "../projects/create/CreateProjectDialog";

// images
import logo from '../../media/images/logo-name-resize.png';
import logoMobile from '../../media/images/logo-short-blue-resize.png';

// material components
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    MenuItem,
    Menu,
    makeStyles,
    fade,
    CircularProgress,
    Badge,
    Divider,
    useMediaQuery,
} from "@material-ui/core";

// material icons
import {
    Search,
    Notifications,
    AccountCircle,
    Mail,
} from "@material-ui/icons";

// routing
import { useHistory } from 'react-router-dom';

// styling
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'rgb(243, 243, 243)',
        height: '77px',
        boxShadow: 'none',
    },
    img: {
        cursor: 'pointer',
        marginTop: 'auto',
        marginBottom: 'auto',
        width: '253.68px',
        height: '50px',
        marginLeft: '20px',
    },
    search: {
        position: 'relative',
        border: '2px solid rgb(78, 182, 196);',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchMobile: {
        position: 'relative',
        border: '2px solid rgb(78, 182, 196);',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '70%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        position: 'absolute',
        right: 0,
    },
}))

function NavbarAuth(props) {
    const history = useHistory();
    const isMobile = useMediaQuery('(max-width:680px)');
    const classes = useStyles();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null)
    const [searchValue, setSearchValue] = useState('');
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

    const redirect = (path) => {
        history.push(path)
    }

    const handleSearchChange = (e) => {
        const searchVal = e.target.value
        setSearchValue(searchVal)
        props.search(searchVal)
    }

    const handleProfileMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
        setIsProfileMenuOpen(true)
    }

    const handleProfileMenuClose = () => {
        setIsProfileMenuOpen(false)
        setAnchorEl(null)
    }

    const handleLogout = () => {
        props.authLogout();
        handleProfileMenuClose();
    }

    const handleOpenEdit = () => {
        setIsEditOpen(true);
    }

    const handleCloseEdit = () => {
        setIsEditOpen(false);
    }

    const handleYourProfileSelect = () => {
        handleProfileMenuClose();
        redirect('/')
    }

    const handleCreateOpen = () => {
        setIsCreateOpen(true)
    }

    const handleCreateClose = () => {
        setIsCreateOpen(false)
    }

    const displayProfileMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isProfileMenuOpen}
            onClose={handleProfileMenuClose}
        >
            <MenuItem style={{
                borderBottom: '1px solid #CCC'
            }}>
                Signed in as&nbsp;<b>{props.user.username}</b>
            </MenuItem>
            <MenuItem onClick={handleYourProfileSelect}>Your Profile</MenuItem>
            <MenuItem
                onClick={handleCreateOpen}
                style={{
                    borderBottom: '1px solid #CCC'
                }}
            >
                New Project
            </MenuItem>
            <MenuItem onClick={handleOpenEdit}>Edit Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    )

    return (
        <>
        <CreateProjectDialog
            open={isCreateOpen}
            handleClose={handleCreateClose}
        />
        <EditProfile
            editAccount={props.editAccount}
            handleClose={handleCloseEdit}
            open={isEditOpen}
            user={props.user}
        />
        <AppBar
            className={classes.root}
        >
            <Toolbar>
                {isMobile ? null :
                    <img src={logo} className={classes.img} alt="" onClick={() => redirect('/')}/>
                }
                <div className={isMobile ? classes.searchMobile : classes.search}>
                    <div className={classes.searchIcon}>
                        <Search
                            style={{color: 'rgb(78, 182, 196)'}}
                        />
                    </div>
                    <InputBase
                        onChange={handleSearchChange}
                        placeholder="Search…"
                        classes={{
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <div className={classes.sectionDesktop}>
                    <IconButton
                        aria-label="account of current user"
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                    >
                        <AccountCircle
                            style={{color: '#4EB6C4'}}
                        />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        {displayProfileMenu}
        </>
    )

}

export default NavbarAuth;