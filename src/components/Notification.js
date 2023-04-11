const Notification = ( { message, isError }) => {
    if (message === null) {
        return null
    }
    console.log(message, isError)
    if(isError) {
        return (
            <div className="errorMessage">
                {message}
            </div>
        )
    } else {
        return(
            <div className="successMessage">
                {message}
            </div>
        )
    }
}

export default Notification