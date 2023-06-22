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

    getSearchProfiles = () => {
        SopraDatingAPI.getAPI().getSearchProfiles(this.props.user)
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
                                <SearchProfileOverviewItem name={"Suchprofil " + item.getProfileID()} profile={item}></SearchProfileOverviewItem>
                            ))}
                        </List>
                        <Link  to="/SearchProfile">
                            <Button sx={{marginTop: '20px', fontWeight:'bold'}} variant="outlined" startIcon={<AddIcon />}>Suchprofil hinzufügen</Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>

        );
    }
}

export default SearchProfileOverviewContainer;