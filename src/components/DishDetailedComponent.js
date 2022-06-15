import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetailed extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const dish = this.props.dishSelected
        const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };


        if (dish == null) {
            return (<div></div>)
        } else {

            const comment = dish.comments.map(comment => {
                return (
                    <div  key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {new Date(comment.date).toLocaleDateString('en-US', DATE_OPTIONS)}</p>
                    </div>
                )
            })

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h2>Comments</h2>
                            {comment}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default DishDetailed