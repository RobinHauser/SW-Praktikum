import {ListItem, ListItemButton, ListItemText} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {Link, useNavigate} from "react-router-dom";
import React, {Component} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import SopraDatingAPI from "../api/SopraDatingAPI";

/**
 * Class react component which renders the search profile list items
 */

class SearchProfileOverviewItem extends Component {

    /**
     * Calls the API to delete a search profile for a profile ID from the system
     */

    deleteSearchProfile = () => {
        const {profile, onSearchProfileRemoved} = this.props;
        SopraDatingAPI.getAPI().deleteSearchProfile(profile.getProfileID())
            .then(() => {
                onSearchProfileRemoved(profile);
            })
    }

    /**
     * Renders the class component
     * @returns SearchProfileOverviewItem - the rendered component
     */
    render() {
        const {name, profile} = this.props;
        return (
            <div style={{display: "flex", alignItems: "center"}}>
                <ListItem sx={{
                    my: 1,
                    justifyContent: "space-between",
                    borderBottom: 1,
                    borderTop: 1,
                    borderRight: 1,
                    borderLeft: 1,
                    borderRadius: 3,
                    borderColor: "#cfd8dc",
                    ':hover': {boxShadow: 2}
                }} style={{width: 500}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <ListItemText noWrap={false} sx={{ml: 2, fontSize: 20, wordBreak: 'break-all'}}
                                      primary={`${name}`}/>
                    </div>
                    <div style={{marginLeft: "auto", marginRight: "16px"}}>
                        <Link to={`/SearchProfile/${profile.getProfileID()}`}>
                            <Tooltip title="zum Suchprofil" fontSize="large" sx={{color: "#2979ff"}}>
                                <KeyboardDoubleArrowRightIcon/>
                            </Tooltip>
                        </Link>
                    </div>
                </ListItem>

                <ListItem sx={{
                    my: 1,
                    justifyContent: "space-between",
                    borderBottom: 1,
                    borderTop: 1,
                    borderRight: 1,
                    borderLeft: 1,
                    borderRadius: 3,
                    borderColor: "#cfd8dc",
                    ':hover': {boxShadow: 2},
                    width: "auto",
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "20px"
                }}>

                    <div style={{alignItems: "center"}}>
                        <Tooltip title="Suchprofil löschen" fontSize="large" sx={{color: "#2979ff"}}>
                            <IconButton onClick={() => this.deleteSearchProfile()}>
                                <DeleteIcon color="error"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </ListItem>
            </div>
        );
    }
}

export default SearchProfileOverviewItem;