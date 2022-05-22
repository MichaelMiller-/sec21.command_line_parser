import {Form} from "react-bootstrap";

type InPlaceUploadProps = {
    onUpdateData: (content: string) => void;
}

const InPlaceUpload = (props: InPlaceUploadProps) => {

    const handleChange = (event: React.ChangeEvent<any>) => {
        const reader = new FileReader();
        reader.readAsText(event.target.files[0], "UTF-8");
        reader.onload = (evt: ProgressEvent<FileReader>) => {
            //! \todo find a better way to deal with 'null'
            if (evt !== null) {
                // @ts-ignore
                props.onUpdateData(evt.target.result);
            }
        };
    };
    return (
        <>
            <Form.Label>Upload Definition</Form.Label>
            <Form.Control type="file" onChange={handleChange}/>
        </>
    );
}

export default InPlaceUpload;