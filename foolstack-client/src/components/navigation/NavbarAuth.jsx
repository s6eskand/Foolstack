import React, {useEffect, useState} from 'react';

// images
import logo from '../../media/images/logo-name-resize.png';

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
    CircularProgress
} from "@material-ui/core";

// material icons
import {
    Search,
    Notifications,
    AccountCircle,
} from "@material-ui/icons";

// styling
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'rgb(243, 243, 243)',
        height: '77px',
        boxShadow: 'none',
    },
    img: {
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
}))

function NavbarAuth(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null)
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (e) => {
        const searchValue = e.target.value
        setAnchorEl(e.currentTarget)
        setSearchValue(searchValue)
        props.search(searchValue)
    }

    const displaySearchResults = () => {
        if (props.searchResults) {
            return props.searchResults.map(result => (
                <MenuItem value={result}>{result}</MenuItem>
            ))
        } else if (props.loading) {
            return <CircularProgress />
        } else {
            return "No results found :("
        }
    }

    return (
        <AppBar
            className={classes.root}
        >
            <Toolbar>
                <img src={logo} className={classes.img} alt=""/>
                <div className={classes.search}>
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
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={searchValue.length > 0}
                        onClose={() => setAnchorEl(null)}
                    >
                        {displaySearchResults()}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )

}

export default NavbarAuth;