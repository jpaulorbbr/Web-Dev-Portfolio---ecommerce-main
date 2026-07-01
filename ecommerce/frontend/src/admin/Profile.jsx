import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get("/admin/api/profile", {
                withCredentials: true,
            })
            .then((res) => setUser(res.data))
            .catch(console.error);
    }, []);

    if(!user) {
        return <h4>Carregando perfil...</h4>;
    }

    return (
        <div>
            <h2>{user.username}</h2>

            <p>
                {user.first_name} {user.last_name}
            </p>

            <p>{user.email}</p>

            {user.profile_picture && (
                <img
                    src={user.profile_picture}
                    alt={user.username}
                    width="200"
                />
            )}
        </div>
    );
}

export default Profile;