import { 
  Flex,
  Text,
  Box,
  Input,
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,  
  Tr,
  Th,
  Td,
  VStack,
  Menu,
  MenuItem,    
 } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development'
import api from './services/api';


export default function Home() {
  
  //funções de armazenamento de dados
  const [usuarios, setUsuarios] = useState ([]); 
  const [id, setId] = useState (null);

  const [name, setName] = useState ('');
  console.log({name})

  const [email, setEmail] = useState ('');
  console.log({email})

  const [telefone, setTelefone] = useState ('');
  console.log({telefone})

  //funções que controlam os eventos nos imputs 
  const handleChangeName = (text) =>{
    setName(text)
  }

  const handleChangeEmail = (text) =>{
    setEmail(text)
  }

  const handleChangeTelefone = (text) =>{
    setTelefone(text)
  }
  
  //função que controla o botão de submit
  const handleSubmit = async (event) => {
    event.preventDefault()    
    
    try{
      const response = await api.post('/usuarios', {name, email, telefone})
      console.log(response)

      setUsuarios(usuarios.concat(data.data))

      setName('')
      setEmail('')
      setTelefone('')
    }catch(err){
      console.log(err)
    }    
    
  }
  
  //função para trazer usuarios do banco de dados e imprimir na tela
  useEffect(() => {
    api.get('/usuarios').then(({data}) => {
      setUsuarios(data.data)
    })
  }, [])
  
  //função de controle do delete
  const handleDelete = async (_id) =>{
    try{
      await api.delete(`/usuarios/${_id}`)

      setUsuarios(usuarios.filter(usuario => usuario._id !== _id))
    }catch(err){
      console.log(err)
    }
           
  } 
  
  //funções de controle de update
  const handleUpdate = async (event) => {
    event.preventDefault()  
    
    try {
      await api.put(`/usuarios/${id}`, {name, email, telefone})
      setUsuarios(usuarios.map(usuario => usuario._id === id ?{name, email, telefone, _id : id} : usuario))

    setName('')
    setEmail('')
    setTelefone('')
    setId(null)
    } catch (err) {
      console.log(err)
    }       
  }

  const handleUpdateSubmit = (usuario) => {    
    setId(usuario._id)
    setName(usuario.name)
    setEmail(usuario.email)
    setTelefone(usuario.telefone)
    
  }

  return ( 
    <Box margin='5rem' >
      <Menu>
          <MenuItem         
            fontFamily={'sans-serif'}
            borderRadius='md'
            borderWidth='1px'
            bgColor={'green'}
            color={'white'}
            fontSize={'3xl'}
            _expanded={{ bg: 'blue.400' }}
            _focus={{ boxShadow: 'outline' }}
          >
          aterra
  </MenuItem>
  
</Menu>
    
      <Flex color='white' justifyContent='space-between' >
          <Text color='black' fontSize='2xl'>Usuários</Text>          
      </Flex>
      
      <VStack marginy='1rem' as='form' onSubmit={id ? handleUpdate : handleSubmit}>
        <FormControl>
          <FormLabel >Nome:</FormLabel>
            <Input  
            type='text'
            value={name}            
            onChange={event => handleChangeName(event.target.value)}           
            /> 
                   
        </FormControl>

        <FormControl>
          <FormLabel>Email:</FormLabel>
            <Input  
            type='email' 
            value={email}            
            onChange={event => handleChangeEmail(event.target.value)}
            /> 
                  
        </FormControl> 

        <FormControl>
          <FormLabel >Telefone:</FormLabel>
            <Input 
            type='tel:'
            value={telefone}            
            onChange={event => handleChangeTelefone(event.target.value)}
            />   
                
        </FormControl> 

        <Button fontSize='sm' margin='1rem' alignself='flex-end' colorScheme='gray' type='submit'>{id? 'Atualizar' : 'Adicionar'}</Button>

      </VStack>
     
      <Table variant='simple'>
               
        <Thead>
          
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th isNumeric>Telefone</Th>
            <Th>Actions</Th>
          </Tr>

        </Thead>
        
        <Tbody>
          
          {usuarios.map(usuario => (
            <Tr key={usuario.name}>
              <Td>{usuario.name}</Td>
              <Td>{usuario.email}</Td>
              <Td isNumeric>{usuario.telefone}</Td>
              <Td>
                <Flex justifyContent='space-between'>                  
                  <Button size="sm" fontSize="smaller" colorScheme="yellow" mr="2" 
                  onClick={() => handleUpdateSubmit(usuario)}>Editar</Button>
                  <Button size='sm' colorScheme='red' 
                  onClick={() => handleDelete(usuario._id)}>Remover</Button>                  
                </Flex>
              </Td>        
            </Tr>
          ))}          
          
        </Tbody>      
        
     </Table>    

    </Box>
     
  )
};
