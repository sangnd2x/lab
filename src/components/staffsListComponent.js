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
                <div key={staff.id} className="col-12 col-md-5 col-lg-3 m-1 abc">
                    <Card onClick={() => this.selectedStaff(staff)} className="staff">
                        <CardTitle>{staff.name}</CardTitle>
                    </Card>
                </div>
            )
        });

        return (
            <div className="container">
                <div className="row justify-content-between">
                    {staff}
                </div>
                <div className="row justify-content-around m-2">
                    <StaffsInfo selectedStaff={ this.state.selectedStaff } />
                </div>
            </div>
        )
    }
}

export default StaffsList;