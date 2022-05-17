const FlexContainer = (props) => {
    return (
        <div className="flex-container">
            <div className="avatar-column">
                {props.avatarColumn}
            </div>
            <div className="repositories-column">
                {props.repositoriesColumn}
            </div>        
        </div>
    )
}

export default FlexContainer;