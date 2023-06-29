import {List} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SearchProfileOverviewItem from "./SearchProfileOverviewItem";
import * as React from "react";
import {Component} from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {Link} from "react-router-dom";
import SopraDatingAPI from "../api/SopraDatingAPI";

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 */

class SearchProfileOverviewContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchprofiles: [],
            error: null,
        };
    }

    deleteSearchProfileHandler = (searchprofile) => {
        this.setState({
            searchprofiles: this.state.searchprofiles.filter(profile => profile.getProfileID() !== searchprofile.getProfileID())
        });
    };

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

    addButtonClick() {
        this.addSearchProfile();
        setTimeout(() => {
            this.getSearchProfiles()
        }, 100)
    }

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

    componentDidMount() {
        this.getSearchProfiles();
    }
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