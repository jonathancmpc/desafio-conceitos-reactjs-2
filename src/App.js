import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories',{
      title: `Novo repositório ${Date.now()}`,
      url: "https://github.com/jonathancmpc/desafio-conceitos-reactjs",
      techs: ["ReactJS", "NodeJS", "HTML5", "CSS3"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`repositories/${id}`,{});

    /* const repositoryIndex = repositories.findIndex(repository => repository.id == id); */
    /* const repository =  repositories.splice(repositoryIndex, 1); */

    if (response.status == 204){
      /* Fazendo uma consulta no array e extraindo tudo que é diferente do id */
      setRepositories(repositories.filter(repository => (repository.id !== id)));      
    }else{
      alert('Erro de comunicação com a API');
    }
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>{repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
