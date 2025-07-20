
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const API_URL = 'http://localhost:5000'; // URL do seu back-end

    // Função para buscar usuários
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    // Função para criar um novo usuário
    const createUser = async (e) => {
        e.preventDefault(); // Evita o recarregamento da página
        try {
            await axios.post(`${API_URL}/users`, { name, email });
            setName('');
            setEmail('');
            fetchUsers(); // Atualiza a lista de usuários
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            alert("Erro ao criar usuário. Verifique se o e-mail já existe.");
        }
    };

    // Efeito para carregar usuários quando o componente é montado
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Gerenciador de Usuários</h1>

                {/* Formulário para adicionar usuário */}
                <form onSubmit={createUser}>
                  <div>

                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                        </div>
                        <div>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                        </div>
                    <button type="submit">Adicionar Usuário</button>
                </form>

                {/* Lista de usuários */}
                <h2>Usuários Cadastrados:</h2>
                {users.length === 0 ? (
                    <p>Nenhum usuário cadastrado.</p>
                ) : (
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>
                                {user.name} - {user.email}
                            </li>
                        ))}
                    </ul>
                )}
            </header>
        </div>
    );
}

export default App;
