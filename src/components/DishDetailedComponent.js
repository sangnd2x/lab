import React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from "reactstrap";

function RenderComment({comment}) {
    const DATE_OPTIONS = { year: 'numeric', month: 'short', day: '2-digit' };


    if (comment == null) {
        return (<div></div>);
    } else {
        const comments = comment.map(cmt => {
            return (
                
                    <div key={cmt.id}>
                        <p>{cmt.comment}</p>
                        <p>-- {cmt.author}, {new Date(cmt.date).toLocaleDateString('en-US', DATE_OPTIONS)}</p>
                    </div>
            
            );
        })

        return (
            <div className="col-12 col-md-5 m-1">
                {comments}
            </div>
        );
    }
}

function RenderDish({dish}) {
    if (dish == null) {
        return (<div></div>);
    } else {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

const DishDetailed = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComment comment={props.dish.comments} />
                </div>
            </div>
        );
    } else {
        return (<div></div>)
    }
}


export default DishDetailed