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
  FormErrorMessage,  
 } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useState } from 'react/cjs/react.development'
import api from './services/api';


export default function Home() {
  const [usuarios, setUsuarios] = useState ([]); 
  const [id, setId] = useState (null);

  const [name, setName] = useState ('');
  console.log({name})

  const [email, setEmail] = useState ('');
  console.log({email})

  const [telefone, setTelefone] = useState ('');
  console.log({telefone})

  const erro = null
  const [erros, setErros] = useState ({name:null, email:null, telefone:null});
  
  const validacao = () =>{
    if(!name) {
      setErros({name:'Campo obrigatório'}) 
      return false
    }
    if(!email) {
      setErros({email:'Campo obrigatório'}) 
      return false
    }
    if(!name) {
      setErros({telefone:'Campo obrigatório'})
      return false
    }
    setErros({})
    return true
  } 
  
  const handleChangeName = (text) =>{
    setName(text)
  }

  const handleChangeEmail = (text) =>{
    setEmail(text)
  }

  const handleChangeTelefone = (text) =>{
    setTelefone(text)
  }

  const handleSubmit = async (event) => {
    event.preventDefault() 
    
    if(!validacao()) return

    try{
      const response = await api.post('/usuarios', {name, email, telefone})
      console.log(response)

      //setUsuarios(usuarios.concat({name, email, telefone}))

      //setName('')
      //setEmail('')
      //setTelefone('')
    }catch(err){
      console.log(err)
    }    
    
  }

  const handleDelete = (_id) =>{
    setUsuarios(usuarios.filter(usuario => usuario._id !== _id))       
  } 

  const handleUpdate = (event) => {
    event.preventDefault() 
    
    if(!validacao()) return
    
    setUsuarios(usuarios.map(usuario => usuario._id === id ?{name, email, telefone, _id : id} : usuario))

    setName('')
    setEmail('')
    setTelefone('')
    setId(null)
  }
  const handleUpdateSubmit = (usuario) => {    
    setId(usuario._id)
    setName(usuario.name)
    setEmail(usuario.email)
    setTelefone(usuario.telefone)
    
  }

  return ( 
    <Box margin='4rem'>
      
      <Flex color='white' justifyContent='space-between' >
          <Text color='black' fontSize='2xl'>Usuários</Text>          
      </Flex>
      
      <VStack marginy='1rem' as='form' onSubmit={id ? handleUpdate : handleSubmit}>
        <FormControl isInvalid={!!erro}>
          <FormLabel >Nome:</FormLabel>
            <Input  
            type='text'
            value={name}
            erro={erros.name}
            onChange={event => handleChangeName(event.target.value)}           
            /> 
            {!!erro && <FormErrorMessage>{erro}</FormErrorMessage>}       
        </FormControl>

        <FormControl isInvalid={!!erro}>
          <FormLabel>Email:</FormLabel>
            <Input  
            type='email' 
            value={email}
            erro={erros.email}
            onChange={event => handleChangeEmail(event.target.value)}
            /> 
            {!!erro && <FormErrorMessage>{erro}</FormErrorMessage>}       
        </FormControl> 

        <FormControl isInvalid={!!erro}>
          <FormLabel >Telefone:</FormLabel>
            <Input 
            type='tel:'
            value={telefone}
            erro={erros.telefone}
            onChange={event => handleChangeTelefone(event.target.value)}
            />   
            {!!erro && <FormErrorMessage>{erro}</FormErrorMessage>}     
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
            <Tr>
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
