import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';


const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $nombre: String!
    $raza: String!
    $edad: Int!
    $foto: String!
  ) {
    createLink(nombre: $nombre, raza: $raza, edad: $edad, foto: $foto) {
      id
      nombre
      raza
      edad
      foto
    }
  }
`;

const CreateLink = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
     nombre: '',
     raza: '',
     edad: 0,
     foto: '',
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      nombre: formState.nombre,
      raza: formState.raza,
      edad: formState.edad,
      foto: formState.foto
    },
    onCompleted: () => navigate('/')
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.nombre}
            onChange={(e) =>
              setFormState({
                ...formState,
                nombre: e.target.value
              })
            }
            type="text"
            placeholder="Nombre del perro"
          />
          <input
            className="mb2"
            value={formState.raza}
            onChange={(e) =>
              setFormState({
                ...formState,
                raza: e.target.value
              })
            }
            type="text"
            placeholder="Raza del perro"
          />
          <input
            className="mb2"
            value={formState.edad}
            onChange={(e) =>
              setFormState({
                ...formState,
                edad: e.target.value
              })
            }
            type="number"
            placeholder="Edad del perro"
          />
          <input
            className="mb2"
            value={formState.foto}
            onChange={(e) =>
              setFormState({
                ...formState,
                foto: e.target.value
              })
            }
            type="text"
            placeholder="URL de foto de perro"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
