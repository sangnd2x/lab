import React, {Component} from "react";
import { Card, CardTitle } from "reactstrap";
import StaffsInfo from "./staffsInfoComponent";

class StaffsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedStaff: null
        };
    }

    selectedStaff(staff) {
        this.setState({ selectedStaff: staff})
    }

    render() {
        const staff = this.props.staff.map(staff => {
            return (
                <div key={staff.id} className="col-12 col-md-6 col-lg-3 m-1">
                    <Card onClick={() => this.selectedStaff(staff)} className="style">
                        <CardTitle>{staff.name}</CardTitle>
                    </Card>
                </div>
            )
        });

        return (
            <div className="container">
                <div className="row center">
                    {staff}
                </div>
                <div className="row">
                    <StaffsInfo selectedStaff={ this.state.selectedStaff } />
                </div>
            </div>
        )
    }
}

export default StaffsList;