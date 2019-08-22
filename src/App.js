import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap/'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import UniqueId from 'react-html-id';

class App extends Component {
  constructor(props) {
    super(props)

    UniqueId.enableUniqueIds(this);
    this.state = {
      posts: [],
      NewPostModal: false,
      editFormModal: false,
      newFormData: {
        id: parseInt(1),
        name: '',
        email: ''
      },
      editFormData: {
        id: '',
        name: '',
        email: ''
      }

    }
    this.toggleNewPostModal = this.toggleNewPostModal.bind(this);

  }


  toggleNewPostModal() {
    this.setState({
      NewPostModal: !this.state.NewPostModal
    })
  }

  toggleEditFormModal() {
    this.setState({
      editFormModal: !this.state.editFormModal
    })
  }
  addPost() {

    let { posts } = this.state;
    console.log(this.state.newFormData)
    let postData = this.state.newFormData;
    posts.push(postData);
    this.setState({
      posts, NewPostModal: false, newFormData: {
        id: parseInt(postData.id) + 1,
        email: '',
        name: ''

      }
    })

  }
  updateForm() {
    let { email, name } = this.state.editFormModal;
    let { posts } = this.state;
    let editData = this.state.editFormData;
    /// console.log(editData);
    posts.forEach(p => {
      if (p.id === editData.id) {
        p.name = editData.name;
        p.email = editData.email;
      }
    })
    console.log(posts);
    this.setState({
      posts, editFormModal: false
    })
  }


  editForm(id, name, email) {
    this.setState({
      editFormData: { id, name, email },
      editFormModal: !this.state.editFormModal
    });
  }

  deleteData(id) {
    let { posts } = this.state;
    posts.forEach((p, index) => {
      if (p.id === id) {
        posts.splice(index, 1)
      }
    });
    this.setState({
      posts:posts
    })
  }

  render() {

    let posts = this.state.posts.map((post, index) => {
      return (
        <tr key={index}>
          <td>{post.id}</td>
          <td>{post.name}</td>
          <td>{post.email}</td>
          <td>
            <Button variant="primary" className="mr-2" onClick={this.editForm.bind(this, post.id, post.name, post.email)}>Edit</Button>
            <Button variant="danger" onClick={this.deleteData.bind(this, post.id)}>Delete</Button>
          </td>
        </tr>
      )
    })
    return (

      <Container>
        <h1>Add User App </h1>
        <Button  variant="primary" onClick={this.toggleNewPostModal}>
          Add new User
        </Button>

        <Modal show={this.state.NewPostModal}  >
          <Modal.Header>
            <Modal.Title>Add a New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form>

              <Form.Group as={Row} controlId="formPlaintextId">
                <Form.Label column sm="2">
                  Id
    </Form.Label>
                <Col sm="10">
                  <Form.Control disabled value={this.state.newFormData.id} onChange={(e) => {
                    let { newFormData } = this.state;
                    newFormData.id = e.target.value;
                    this.setState({ newFormData })
                    console.log(newFormData.id)
                  }} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Email
    </Form.Label>
                <Col sm="10">
                  <Form.Control type="email" value={this.state.newFormData.email} onChange={(e) => {
                    let { newFormData } = this.state;

                    newFormData.email = e.target.value;

                    this.setState({ newFormData })
                  }} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextName">
                <Form.Label column sm="2">
                  Title
    </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" value={this.state.newFormData.name} onChange={(e) => {
                    let { newFormData } = this.state;

                    newFormData.name = e.target.value;

                    this.setState({ newFormData })
                  }} />

                </Col>
              </Form.Group>
            </Form>



          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleNewPostModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.addPost.bind(this)}>
              Add User
            </Button>
          </Modal.Footer>
        </Modal>


        <Modal show={this.state.editFormModal}>
          <Modal.Header>
            <Modal.Title>Edit Eisting User</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form>

              <Form.Group as={Row} controlId="formPlaintextId">
                <Form.Label column sm="2">
                  Id
    </Form.Label>
                <Col sm="10">
                  <Form.Control disabled value={this.state.editFormData.id} onChange={(e) => {
                    let { editFormData } = this.state;
                    editFormData.id = e.target.value;
                    this.setState({ editFormData })

                  }} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Email
    </Form.Label>
                <Col sm="10">
                  <Form.Control type="email" value={this.state.editFormData.email} onChange={(e) => {
                    let { editFormData } = this.state;

                    editFormData.email = e.target.value;

                    this.setState({ editFormData })
                  }} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextName">
                <Form.Label column sm="2">
                  Title
    </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" value={this.state.editFormData.name} onChange={(e) => {
                    let { editFormData } = this.state;

                    editFormData.name = e.target.value;
                    this.setState({ editFormData })
                  }} />

                </Col>
              </Form.Group>
            </Form>



          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleEditFormModal.bind(this)}>
              Close
            </Button>
            <Button variant="primary" onClick={this.updateForm.bind(this)}>
              Update User
            </Button>
          </Modal.Footer>
        </Modal>

        <Table bordered hover size="sm" className="mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts}
          </tbody>
        </Table>
      </Container>
    )
  }
}

export default App
