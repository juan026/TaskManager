const API_URL = "http://localhost:3000/api";

export const login = async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        return {ok: response.ok, 
            data: await response.json()}
};

export const getTasks = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/tasks`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return {ok: response.ok, 
        data: await response.json()}
};