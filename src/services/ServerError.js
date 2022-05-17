class ServerError extends Error{
    constructor(message, status){
        super(message);
        this.status = status;
        this.name = 'ServerError';
    }
}

export default ServerError;