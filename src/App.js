import logo from "./logo.svg";
import "./App.css";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import parse from "html-react-parser";
import MultiSelectField from "./components/MultiSelectField";

const options = [
  { label: "Global", value: "g" },
  { label: "Case Insensitive", value: "i" },
  { label: "Multiline", value: "m" },
  { label: "Dot All", value: "s" },
  { label: "Has Indices", value: "d" },
  { label: "Unicode", value: "u" },
  { label: "Sticky", value: "y" },
];

function App() {
  const [testResult, setTestResult] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [hightlightedText, setHightlightedText] = useState(null);

  const schema = yup.object().shape({
    regexString: yup.string().required(),
    targetText: yup.string().required(),
    regexFlags: yup.array(),
    regexFunction: yup.string().required(),
  });

  const handleSubmit = ({
    regexString,
    targetText,
    regexFlags,
    regexFunction,
  }) => {
    regexFlags = regexFlags.join(""); // converting into concated string
    resetResults();
    const re = new RegExp(regexString, regexFlags);

    updateHightlightedText(re, targetText, regexFlags);

    switch (regexFunction) {
      case "Test":
        handleTest(re, targetText);
        break;
      case "Search":
        handleSearch(re, targetText);
        break;
      case "Match":
        handleMatch(re, targetText, regexFlags);
        break;
      case "Match":
        handleMatch(re, targetText, regexFlags);
        break;

      default:
        break;
    }
  };

  const handleTest = (re, targetText, regexFlags) => {
    const result = re.test(targetText);
    setTestResult(result ? "Passed!" : "Failed! None of the text was matched!");
  };
  const handleSearch = (re, targetText, regexFlags) => {
    const searchIndex = targetText.search(re);
    setSearchResult(
      searchIndex >= 0
        ? "Starting Character: " +
            targetText[searchIndex].toString() +
            ", String Index: " +
            searchIndex
        : "Not Found!"
    );
  };
  const handleMatch = (re, targetText, regexFlags) => {
    const result = targetText.match(re);
    setMatchResult(result ? result.toString() : "No text was matched!");
  };

  const updateHightlightedText = (re, targetText, regexFlags) => {
    let result = null;
    if (targetText.match(re)) {
      result = targetText.replace(
        re,
        (match) => `<mark><b>${match}</b></mark>`
      );
    } else {
      result = targetText.match(re);
    }
    setHightlightedText(result ? parse(result) : null);
  };

  const resetResults = () => {
    setTestResult(null);
    setSearchResult(null);
    setMatchResult(null);
    setHightlightedText(null);
  };

  return (
    <div className="App items-center">
      <h1 style={{ height: "10%" }}>Regular Expression Helper</h1>
      <Container className="app-container">
        <Formik
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={{
            regexString: "",
            targetText: "",
            regexFlags: [],
            regexFunction: "",
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationRegexString">
                  <Form.Label>Regular Expression</Form.Label>
                  <Form.Control
                    type="text"
                    name="regexString"
                    value={values.regexString}
                    onChange={handleChange}
                    isInvalid={touched.regexString && errors.regexString}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.regexString}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationTargetText">
                  <Form.Label>Target Text</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    name="targetText"
                    value={values.targetText}
                    onChange={handleChange}
                    isInvalid={touched.targetText && errors.targetText}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.targetText}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationRegexFlags">
                  <Form.Label>Select Flag</Form.Label>
                  <Field
                    name="regexFlags"
                    className="custom-select"
                    options={options}
                    component={MultiSelectField}
                    isMulti={true}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationRegexFlags">
                  <Form.Label>Select Regex Function</Form.Label>
                  <Form.Select
                    name="regexFunction"
                    value={values.regexFunction}
                    onChange={handleChange}
                    isInvalid={touched.regexFunction && errors.regexFunction}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option>Test</option>
                    <option>Search</option>
                    <option>Match</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.regexFunction}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Button type="submit">Run</Button>
            </Form>
          )}
        </Formik>

        <div className="result">
          <h4>Results</h4>
          {testResult ? (
            <div>
              <h6>Test:</h6>
              <p>{testResult}</p>
            </div>
          ) : null}
          {searchResult ? (
            <div>
              <h6>Search:</h6>
              <p>{searchResult}</p>
            </div>
          ) : null}
          {matchResult ? (
            <div>
              <h6>Match:</h6>
              <p>{matchResult}</p>
            </div>
          ) : null}
          {hightlightedText ? <p>{hightlightedText}</p> : null}
        </div>
      </Container>
    </div>
  );
}

export default App;
