import React, { Component } from 'react';
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';
import auth0Client from '../../Auth';

class Question extends Component {
  state = {
    question: null,
  };

  async componentDidMount() {
    await this.refreshQuestion();
  }

  async refreshQuestion() {
    const { match: { params } } = this.props;
    const question = (await axios.get(`http://localhost:8081/${params.questionId}`)).data;
    this.setState({
      question,
    });
  }

  submitAnswer = async (answer) => {
    const { question: { id } } = this.state;

    await axios.post(
      `http://localhost:8081/answer/${id}`,
      {
        answer,
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` },
      },
    );
    await this.refreshQuestion();
  };

  render() {
    const { question } = this.state;
    if (question === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{question.title}</h1>
            <p className="lead">{question.description}</p>
            <hr className="my-4" />
            <SubmitAnswer questionId={question.id} submitAnswer={this.submitAnswer} />
            <p>Answers:</p>
            {question.answers.map((answer, idx) => (
              <p className="lead" key={idx}>
                {answer.answer}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
