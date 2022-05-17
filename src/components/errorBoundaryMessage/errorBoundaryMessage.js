import errImg from './err.png'
const ErrorBoundaryMessage = () => {
    return(
        <div>
            <img style={{width: "408px", height: "304px", objectFit: 'contain'}} src={errImg} alt="error"/>
        </div>
    )
}
export default ErrorBoundaryMessage;