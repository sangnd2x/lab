import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseURL";

const required = val => val && val.length;
const maxLength = len => val => !(val) || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFormOpen: false
        };

        this.toggleForm = this.toggleForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({
            isFormOpen: !this.state.isFormOpen
        });
    }

    handleSubmit(value) {
        this.toggleForm();
        this.props.addComment(this.props.dishId, value.rating, value.author, value.comment);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleForm}>
                <span className="fa fa-edit fa-lg"> Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isFormOpen} toggle={this.toggleForm}>
                    <ModalHeader toggle={this.toggleForm}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={value => this.handleSubmit(value)}> 
                            <Row className="form-group">
                                <Col md={12}>Rating</Col>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>Your Name</Col>
                                <Col md={12}>
                                    <Control.text model=".author" name="author" className="form-control"
                                        placeholder="Your name"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}
                                    >
                                    </Control.text>
                                    <Errors className="text-danger" model=".yourname" show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: ' Must be more than 3 characters',
                                            maxLength: ' Must be 15 character or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>Comment</Col>
                                <Col md={12}>
                                    <Control.textarea model=".comment" name="comment" className="form-control" rows="6"></Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary" value="submit">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderComment({comment, addComment, dishId}) {
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
                <CommentForm dishId={dishId} addComment={addComment} />
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
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}></CardImg>
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
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                    <RenderDish dish={props.dish} />
                    <RenderComment comment={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id} />
                </div>
            </div>
        );
    } else {
        return (<div></div>)
    }
}

export default DishDetailed;