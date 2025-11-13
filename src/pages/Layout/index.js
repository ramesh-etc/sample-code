import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, sessionExpand, changePassword, sessionLogin, sessionTimeout, sessionClearTimeout } from "../../redux/app/actions";
import store2 from 'store2';
import { Button, Grid, AppBar, Toolbar, IconButton, ListItemText, List, Typography, Hidden, Drawer, ListItemButton, ListItemIcon, Menu, MenuItem, useMediaQuery } from "@mui/material";
import Icons from "../../components/Icons";
import { useStyles } from './styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@mui/system";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LeftIcon from '../../images/icons/Left.svg';
import RightIcon from '../../images/icons/Right.svg';
import { appColor, menuBtnShadowColor, spanColor } from "../../utils/tools";
import ModalRecordForm from "../../components/ModalRecordForm";
import schema from "../../routes/schema";
import { getFormValues } from "redux-form";
import moment from "moment";
import { visibility } from "../../utils/tools";
import Spinner from "../../components/Spinner";

const changePasswordColumns = schema().changePassword().columns;
const loginFormColumns = schema().login().columns;
const userSettingsColumns = schema().userMenuSettings().section;

function Layout(props) {
    const { pages } = props;
    let navigate = useNavigate();
    let location = useLocation();
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    const user = useAppSelector((state) => state?.authentication?.user) || {};
    const loggedIn = useAppSelector((state) => state?.authentication?.loggedIn) || false;
    const expand = useAppSelector((state) => state?.authentication?.expand) || false;
    const activeSession = useAppSelector((state) => state?.authentication?.activeSession) || false;
    const metaData = useAppSelector((state) => state?.authentication?.metaData) || {};
    const error = useAppSelector((state) => state?.authentication?.error) || false;
    const hospital = useAppSelector((state) => state?.authentication?.hospital) || [];
    const loading = useAppSelector((state) => state?.authentication?.loading) || false;
    // const appVersion = useAppSelector((state) => state?.authentication?.appVersion) || 0;

    const formselector = useAppSelector(state => getFormValues(`settingsMenu_1`)(state));

    const dispatch = useAppDispatch();
    const { classes } = useStyles({ drawerWidth: expand ? 200 : 60 });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [btnLoad, setBtnLoad] = React.useState(false);
    // const [menuList, setMenuList] = React.useState(null);
    // const [selectedMenu, setSelectedMenu] = React.useState(false);
    const [formSection, setFormSection] = useState(0);

    const field = userSettingsColumns[formSection];
    const { title, message, confirmMessage, confirmButton, columns, schemaId, onSubmitClose } = field;
    // const errorMessage = error && (error.practice || error.changePassword || error.twoFactorAuthentication || error.sessionTimeout || error.signature);
    // const successMessage = success && (success.practice || success.changePassword || success.twoFactorAuthentication || success.signature);

    const pathData = location && location.pathname && pages && pages.length > 0 && pages.find(_ => _.data && _.data.path && location.pathname.includes(_.data.path)) || false;
    const activePath = location.pathname;
    const { hospitalDetails, role, lastPasswordChangeDate = moment(), temporary_password, version } = user || {};
    const { name, logo_file } = hospital[0] || {};

    const open = Boolean(anchorEl);

    const initialValues = false;

    const formValues = (field.value === "changePassword") ? formselector : false;
    const confirmationMessage = confirmMessage && typeof confirmMessage == "function" ? confirmMessage(user, formValues, metaData) : confirmMessage;

    useEffect(() => {
        if (location.pathname == '/' && store2.get('secret') && role) {
            if (role == "customer" || role == "admin") {
                navigate('/dashboard', { replace: true })
            } else if (role == "fileUploader") {
                navigate('/docs', { replace: true })
            } else {
                navigate('/providers', { replace: true })
            }
        } else if (location.pathname != '/' && !loggedIn) {
            //navigate('/')
        }
    }, [location, role])

    useEffect(() => {
        visibility({ callback: () => dispatch(sessionTimeout({ dispatch: dispatch })), clearSessionTimeout: () => dispatch(sessionClearTimeout()) });
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    // const handleMenu = (event) => {
    //     setAnchorEl(event.currentTarget);
    //   };

    //   const handleClose = () => {
    //     setAnchorEl(null);
    //   };

    // const handleClick = (e) => {
    //     setMenuList(e?.currentTarget);
    //   };

    //   const handleCloseMenuList = () => {
    //     setMenuList(null);
    //     setSelectedMenu(false);
    //   };

    const handleChangePassword = (data, dispatch, { form }) => {
        setBtnLoad(true);
        dispatch(changePassword({ record: data, form: form, setLoadingAction: () => setBtnLoad(false) }));
    };

    const handleSessionLogin = (loginData, dispatch, { form }) => {
        setBtnLoad(true);
        if (loginData) {
            const email = loginData.identifier || false;
            const secret = loginData.secret || false;
            dispatch(sessionLogin({ identifier: email, secret: secret, form: form, setLoadingAction: () => setBtnLoad(false) }));
        }
    }

    const handleExpandToggle = () => {
        dispatch(sessionExpand({ expand: !expand }));
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const hanleClickMenu = (id, value) => {
        setAnchorEl(null);
        if (value == "logout") {
            dispatch(logOut(true));
        } else {
            setOpenModal(true);
            setFormSection(id);
        }
    }

    const handleNavigate = (path, state) => {
        navigate(path, { state: state });
    }

    const handleMenuChange = (data, dispatch, { form }) => {
        setBtnLoad(true);
        if (form === "settingsMenu_1") {
            dispatch(changePassword({ record: data, form: form, setLoadingAction: () => setBtnLoad(false), parentFn: () => setOpenModal(false) }));
        }
    };

    const settingsMenu = [
        {
            id: 0,
            label: "Change Password",
            value: ['superAdmin'].includes(user?.role) ? "admin_change_password" : "changePassword",
            show: true,
            openModal: true,
            logo: "Key",
            style: {}
        },
        {
            id: 1,
            label: "Logout",
            value: "logout",
            show: true,
            openModal: true,
            logo: "Logout",
            style: { width: "22px", height: "20px" }
        }
    ]

    const drawer = (
        <Grid
            sx={{
                height: '100%',
                // width: '100%',
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: 'center',
                alignItems: 'center'
            }}>
            {!mobileOpen ? <IconButton
                onClick={handleExpandToggle}
                className={expand ? classes.mobileMenuIcon : classes.menuIcon}>
                {(expand || mobileOpen) ? <img src={LeftIcon} width='30px' /> : <img src={RightIcon} width='30px' />}
            </IconButton> : null}
            {(expand || mobileOpen) ? <Grid>
                <Typography variant="h5" className={classes.title}>
                    {name || ''}
                </Typography>
            </Grid> : null}
            <Grid className={classes.toolbar}>
                {logo_file ? <img
                    src={logo_file || ''}
                    alt="Logo"
                    className={(expand || mobileOpen) ? classes.logo : classes.mobileLogo}
                    onClick={() => handleNavigate("/settings", location.state)}
                /> : null}

            </Grid>
            <List
                className={classes.customisedlist}
                sx={{
                    width: (expand || mobileOpen) ? '174px' : '36px',
                    margin: (expand || mobileOpen) ? '0px 12px' : '0px 11px 0px 12px'
                }}
                component="nav" aria-label="main mailbox folders"
            >
                {(pages || []).map((page, index) => {
                    return (
                        <Grid key={index}
                            sx={{
                                width: '100%'
                            }}
                        >
                            <Link
                                key={index}
                                data-intercom-target={`tab-${page?.id}`}
                                to={page.data && page.data.path || '/'}
                                state={{ title: page.data && page.data.title }}
                                className={classes.link}
                                style={{
                                    width: (expand || mobileOpen) ? "100%" : 'auto',
                                }}
                            >
                                {page.data.separator ? <div className={classes.separator} /> : null}

                                <ListItemButton
                                    key={index}
                                    size={"small"}
                                    sx={{
                                        m: 0,
                                        minWidth: (expand || mobileOpen) ? "100%" : 0,
                                        display: 'flex',
                                        gap: '10px',
                                        width: 'auto',
                                        padding: (expand || mobileOpen) ? '7px 10px' : '5px',
                                        // justifyContent: (expand || mobileOpen) ? 'flex-start' : 'center',
                                        borderRadius: "10px",
                                        border: `1px solid ${appColor}`,
                                        boxShadow: (activePath === page.data.path) || (page.data.path != '/' && activePath.indexOf(page.data.path) > -1) ? menuBtnShadowColor : "none"
                                    }}
                                    onClick={() => setMobileOpen(false)}
                                    selected={(activePath === page.data.path) || (page.data.path != '/' && activePath.indexOf(page.data.path) > -1)}
                                >
                                    <Icons
                                        type={(page.data && page.data.icon) || ''}
                                        color={(activePath === page.data.path) || (page.data.path != '/' && activePath.indexOf(page.data.path) > -1) ? "#163266" : '#fff'}
                                        style={page?.data?.iconstyle || {}}
                                    />
                                    {(expand || mobileOpen) && <Typography variant="bodySpan1" primary={(page.data && page.data.title) || ''} sx={{ textTransform: 'capitalize', color: (activePath === page.data.path) || (page.data.path != '/' && activePath.indexOf(page.data.path) > -1) ? "#163266" : '#fff' }}>
                                        {(page.data && page.data.title) || ''}
                                    </Typography> || null}
                                </ListItemButton>

                            </Link>
                        </Grid>
                    )
                }
                )
                }
            </List>
        </Grid>
    );

    return (
        <Grid container sx={{
            height: '100%',
            flexWrap: 'nowrap'
        }}>
            {(loggedIn && user?.routes) ? <Grid>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar
                        className={classes.toolbar}
                        sx={
                            !md ? {
                                justifyContent: 'space-between'
                            } : {
                                '& :last-child': {
                                    marginLeft: 'auto'
                                }
                            }
                        }
                        variant='regular'
                    >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="bodySpan2"
                            className={classes.appBarTitle}
                        >
                            {pathData && pathData.data && pathData.data.title || ''}
                        </Typography>
                        <Grid className={classes.settingsmenu}>
                            <Grid
                                sx={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '& svg': {
                                        marginLeft: '0px !important'
                                    }
                                }}>
                                <Icons type={'profile'} sx={{ fontSize: '30px', color: spanColor }}
                                />

                            </Grid>
                            {!sm ? <Button
                                size="small"
                                onClick={handleClick}
                                className={classes.settingsMenuButton}
                            >
                                <Typography
                                    variant="bodySpan2"
                                    sx={{
                                        color: spanColor,
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        marginTop: '5px',
                                    }}
                                >
                                    {user?.name || ''}
                                </Typography>
                                <KeyboardArrowDownIcon size='small' sx={{
                                    color: spanColor,
                                    width: '18px',
                                    paddingTop: '5px'
                                }} />
                            </Button> : <IconButton
                                size="small"
                                onClick={handleClick}
                            >
                                <KeyboardArrowDownIcon size='small' sx={{
                                    color: spanColor,
                                    width: '18px'
                                }} />
                            </IconButton>}
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        border: '1px solid #d3d4d5',
                                        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                        width: '280px',
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    },
                                }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                {
                                    settingsMenu.map((menu, i) =>
                                    (menu.show ? <MenuItem
                                        key={`${menu.label}_${i}`}
                                        className={classes.settingsMenuItem}
                                        style={{ height: "35px" }}
                                        onClick={() => hanleClickMenu(menu.id, menu.value)}
                                    >
                                        <ListItemIcon>
                                            <Icons type={menu.logo} width='25px' height='25px' />
                                        </ListItemIcon>
                                        <ListItemText style={{ color: "#0000009e" }} primary={menu.label} />
                                    </MenuItem> : null
                                    ))
                                }
                            </Menu>
                            {openModal && <ModalRecordForm
                                initialValues={initialValues}
                                show={openModal}
                                title={title || ""}
                                fields={columns}
                                message={message}
                                form={`settingsMenu_${schemaId}`}
                                btnLabel="Update"
                                metaData={metaData}
                                onSubmitClose={onSubmitClose}
                                onSubmitbtn={!confirmButton ? true : false}
                                className={classes.changePasswordForm}
                                confirmButton={confirmButton || false}
                                // alertOnSubmitClose
                                confirmMessage={confirmationMessage}
                                onClose={() => setOpenModal(false)}
                                onSubmit={handleMenuChange.bind(this)}
                                // paperClass={classes.modalPaper}
                                paperStyle={{ maxWidth: '40% !important', overflow: 'auto' }}
                                loading={btnLoad}
                                submiterror={error?.[`settingsMenu_${schemaId}`] || false}
                            />}
                        </Grid>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Hidden mdUp implementation="css">
                        <Drawer
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaperFixed,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}>
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden mdDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open>
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
            </Grid> : null}
            {loading ? <Spinner style={{
                position: "absolute",
                height: "100%",
                display: "flex",
                alignItems: "center",
                // position: "fixed",
                overflowY: "scroll",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }} />
                : <main className={loggedIn ? classes.content : classes.login} style={{
                    // minHeight: containerHeight
                }}>
                    <Outlet />
                </main>}

            {!activeSession && loggedIn && role && role !== "superAdmin" && <ModalRecordForm
                initialValues={{ identifier: user.email }}
                title="Login"
                fields={loginFormColumns}
                message={'Your session has expired. Please login to continue.'}
                form={`SessionLoginForm`}
                btnLabel="Login"
                // onSubmitClose={true}
                enableSubmitBtn
                show
                disableCancelBtn
                className={classes.changePasswordForm}
                onSubmit={handleSessionLogin}
                paperStyle={{ maxWidth: '40% !important', overflow: 'auto' }}
                loading={btnLoad}
                submiterror={error?.[`SessionLoginForm`] || false}
            /> || null}

            {activeSession && loggedIn && role && <ModalRecordForm
                title="Change Password"
                fields={changePasswordColumns}
                message={'Password must be changed every 90 days'}
                form={`changePasswordForm90`}
                btnLabel="Update"
                // onSubmitClose
                enableSubmitBtn
                disableCancelBtn={true}
                // disableCancelBtn={(moment().diff(lastPasswordChangeDate, 'days') >= 90 || temporary_password) ? true : false}
                show={(moment().diff(lastPasswordChangeDate, 'days') >= 90 || temporary_password) ? true : false}
                className={classes.changePasswordForm}
                onSubmit={handleChangePassword.bind(this)}
                paperStyle={{ maxWidth: '40% !important', overflow: 'auto' }}
                loading={btnLoad}
                submiterror={error?.[`changePasswordForm90`] || false}
            /> || null}

        </Grid>
    );
}

export default Layout;