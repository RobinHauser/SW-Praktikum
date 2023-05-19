import {List} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SearchProfileOverviewItem from "./SearchProfileOverviewItem";
import * as React from "react";
import {Component} from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {Link} from "react-router-dom";

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 */

class SearchProfileOverviewContainer extends Component
{
    render() {
        const {name} = this.props

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
                            {name.map((item) => (
                                <SearchProfileOverviewItem name={item}></SearchProfileOverviewItem>
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