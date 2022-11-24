import Button from '@mui/material/Button';

const TestPage = (testVal) => {

    let value = testVal.props;
    const handleTestVal = () => {
        value.current = value.current + 1;
        console.log(value);
    }

    return (
        <>
            <Button variant="outlined" onClick={handleTestVal}>Outlined</Button>
        </>
    )

}

export default TestPage;