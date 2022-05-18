import {Component} from 'react'; 
import ErrorBoundaryMessage from '../errorBoundaryMessage/errorBoundaryMessage';

class ErrorBoundary extends Component{
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo){
        console.log('error: ' + error);
        
        this.setState({
            error:true
        })
    }

    render() {
        if (this.state.error){
            return <ErrorBoundaryMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;