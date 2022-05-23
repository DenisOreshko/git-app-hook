import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method ='GET', body = null, headers = {
        'Content-Type': 'application/json',
        'accept': 'application/vnd.github.v3+json'}) => {
            
            setLoading(true);

            try{
                const response = await fetch(url, {method, body, headers}).catch(()=>{
                    setLoading(false);
                    setError('status: 0');
                    throw new Error('status: 0');
                });                

                if(!response.ok){
                    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
                }

                const data = await response.json(); 

                setLoading(false);
                return data;
            }catch(e){
                setLoading(false);
                setError(e.message);
                throw e;
            }

    },[]);

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError}
}