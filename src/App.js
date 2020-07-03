import React from 'react'
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories, ] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [techs, setTechs] = React.useState('');

  
  React.useEffect(()=>{
    api.get('repositories').then(response=>{
      setRepositories(response.data)
    })

  },[])
  async function handleAddRepository(e) {
    e.preventDefault();
    const techsArray = techs.split(',').map(tech => tech.trim());

    const response = await api.post('repositories',{
          
          title,
          url,
          techs: techsArray,


    });

    const repository = response.data;
    setRepositories([...repositories, repository])


  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository => (
        <li key={repository.id}>
          {repository.title}
          

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
          ))}
        
      </ul>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Url"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Techs"
        value={techs}
        onChange={e => setTechs(e.target.value)}
      />
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
