import {ListItem, ListItemButton, ListItemText} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {Link, useNavigate} from "react-router-dom";
import {Component} from "react";

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 */

class SearchProfileOverviewItem extends Component {
render() {
const {name} = this.props;


    return (
        <div style={{display: "flex", alignItems: "center"}}>

            <ListItem  sx={{
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
                                  primary={`${name}`}></ListItemText>
                </div>
                <Link  to="/SearchProfile">
                <Tooltip title="zum Suchprofil" fontSize="large" sx={{color: "#2979ff"}}>
                    <KeyboardDoubleArrowRightIcon>
                        test
                    </KeyboardDoubleArrowRightIcon>
                </Tooltip>
</Link>
            </ListItem>

        </div>
    );
}
}
export default SearchProfileOverviewItem;