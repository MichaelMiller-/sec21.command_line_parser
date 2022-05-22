import React, {useState, Fragment} from 'react';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {faPlusCircle, faTrash} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CommandLineOption} from "./CommandLineOption";
import InPlaceUpload from "./InPlaceUpload";

const App = () => {

    const [data, setData] = useState<CommandLineOption[]>([])

    const handleUpload = (content: string) => {
        const values: CommandLineOption[] = JSON.parse(content);
        //! \todo handle error
        setData(values);
    };

    const handleInputChange = (index: number, event: React.ChangeEvent<any>) => {
        const values = [...data];
        if (event.target.name === "required") {
            // special case for 'required' checkbox
            values[index] = {...values[index], [event.target.name]: event.target.checked};
        } else {
            values[index] = {...values[index], [event.target.name]: event.target.value};
        }
        setData(values);
    };

    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        event.preventDefault();

        //! \todo
        var saveJson = JSON.stringify(data)
        console.log(saveJson)
    };

    const handleNewItem = () => {
        setData([...data, {name: '', type: '', description: '', required: false}])
    }

    const handleDelete = (index: number) => {
        setData([...data.slice(0, index), ...data.slice(index + 1, data.length)])
    }

    return (
        <Container>
            <br/>
            <h3>sec21::command line parser</h3>
            <Form onSubmit={handleSubmit}>
                <Table borderless>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Required</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((elem, index) => (
                        <Fragment key={`${elem}~${index}`}>
                            <tr>
                                <td>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="name"
                                        value={elem.name}
                                        onChange={event => handleInputChange(index, event)}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="type"
                                        value={elem.type}
                                        onChange={event => handleInputChange(index, event)}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="description"
                                        value={elem.description}
                                        onChange={event => handleInputChange(index, event)}
                                    />
                                </td>
                                <td>
                                    <Form.Check
                                        type="switch"
                                        name="required"
                                        checked={elem.required}
                                        onChange={event => handleInputChange(index, event)}
                                    />
                                </td>
                                <td>
                                    <Button variant="link" onClick={() => handleDelete(index)}>
                                        <FontAwesomeIcon icon={faTrash} size="2x"/>
                                    </Button>
                                </td>
                            </tr>
                        </Fragment>
                    ))}
                    </tbody>
                </Table>
                <Row>
                    <Col>
                        <Button variant="link" onClick={handleNewItem}>
                            <FontAwesomeIcon icon={faPlusCircle} size="2x"/>
                        </Button>
                    </Col>
                    <Col>
                        <div className="d-flex justify-content-end">
                            <Button type="submit">Generate ...</Button>
                        </div>
                    </Col>
                </Row>
                <hr></hr>
                <InPlaceUpload onUpdateData={handleUpload}/>
            </Form>
            <pre>{JSON.stringify(data, null, 3)}</pre>
        </Container>

    );
}

export default App;
