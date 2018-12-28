import React, { Component } from "react";
import API from "../utils/API";


class Transactions extends Component {
  state = {
    transactions: []
  };

  componentDidMount() {
    this.loadTransactions()
  }

  loadTransactions = () => {
    API.getTransactions()
      .then(res => this.setState({ transactions: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What transactions Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input name="title" placeholder="Title (required)" />
              <Input name="author" placeholder="Author (required)" />
              <TextArea name="synopsis" placeholder="Synopsis (Optional)" />
              <FormBtn>Submit transactions</FormBtn>
            </form>
          </Col>  
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>transactions On My List</h1>
            </Jumbotron>
            {this.state.transactions.length ? (
              <List>
                {this.state.transactions.map(transactions => (
                  <ListItem key={transactions._id}>
                    <a href={"/transactions/" + transactions._id}>
                      <strong>
                        {transactions.title} by {transactions.author}
                      </strong>
                    </a>
                    <DeleteBtn />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Transactions;
