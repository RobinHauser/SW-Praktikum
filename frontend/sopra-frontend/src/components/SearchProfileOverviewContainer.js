import {List} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SearchProfileOverviewItem from "./SearchProfileOverviewItem";
import * as React from "react";
import {Component} from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SopraDatingAPI from "../api/SopraDatingAPI";

/**
 * Class react component which renders the container in which the list of search profiles are placed
 **/

class SearchProfileOverviewContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchprofiles: [],
            error: null,
        };
    }

    /**
     * Deletes a search profiles from the list of all search profiles for a user
     * @param {object} searchprofile - the searchprofile which is getting deleted
     **/

    deleteSearchProfileHandler = (searchprofile) => {
        this.setState({
            searchprofiles: this.state.searchprofiles.filter(profile => profile.getProfileID() !== searchprofile.getProfileID())
        });
    };

    /**
     * Gets all search profiles for a user
     * Calls the API to get all search profiles
     **/

    getSearchProfiles = () => {
        SopraDatingAPI.getAPI().getSearchProfiles(this.props.user.getUserID())
            .then(SearchProfileBOs => {
                this.setState({
                    searchprofiles: SearchProfileBOs,
                    error: null
                });
            })
            .catch(e => {
                this.setState({
                    searchprofiles: [],
                    error: e
                });
            });
    };

    /**
     * Handles the adding of a new search profile and returns the refreshed list with all search profiles
     **/

    addButtonClick() {
        this.addSearchProfile();
        setTimeout(() => {
            this.getSearchProfiles()
        }, 100)
    }

     /**
     * Calls the API and is adding the new search profiles into the system
     **/
    addSearchProfile = () => {
        SopraDatingAPI.getAPI().addSearchProfile(this.props.user.getUserID())
            .then(() => {
                this.setState({
                    error: null
                });
            }).catch(e => {
                this.setState({
                    error: e
                });
            });
    };

     /**
     * Called after the component did mount
     * Gets all the search profiles for a user
     */

    componentDidMount() {
        this.getSearchProfiles();
    }

    /**
     * Renders the class component
     * @returns SearchProfileOverviewContainer - the rendered component
     */
    render() {
        return (
            <div>
                <Grid
                    container
                    alignItems="center"
                    spacing={0}
                    direction="row"
                    justifyContent="center"
                    flexFlow="column wrap">
                    <Grid>
                        <List id="searchprofieoverviewlist" sx={{width: '100%', maxWidth: 700}}>
                            {this.state.searchprofiles.map((item) => (
                                <SearchProfileOverviewItem key={item.getProfileID()}
                                                           name={"Suchprofil " + item.getProfileID()}
                                                           profile={item}
                                                           onSearchProfileRemoved={this.deleteSearchProfileHandler}
                                ></SearchProfileOverviewItem>
                            ))}
                        </List>
                            <Button
                                sx={{marginTop: '20px', fontWeight:'bold', marginBottom: '40px'}}
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={() => this.addButtonClick()}
                            >Suchprofil hinzufügen</Button>
                    </Grid>
                </Grid>
            </div>

        );
    }
}

export default SearchProfileOverviewContainer;