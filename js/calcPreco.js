'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const tempClient = {
    nome:"Alisson",
    email:"alisson@gmail.com",
    celular:"1927439838",
    cidade:"São Paulo - SP"
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// CRUD - create read update delete

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}
const readClient = () => getLocalStorage()

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}
    

const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}


const isValidFields = () => {
    //Validando se todos os campos do forms estão preenchidos
    return document.getElementById('form').reportValidity();
}

//Interação com o layout

const clearFields = () =>{
    //document = pega documeno do corpo
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(fields => fields.value = "");
    document.getElementById('nome').dataset.index = 'new';
}

const saveClient = () =>{
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById.dataset.index;
        if (index == 'new') {
            createClient(client);
            updateTable();
            closeModal();
        }else {
            updateClient(index, client);
            updateTable();
            closeModal();
        }
    }
};

const createRow = (client, index) =>{
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>

    <td> 
    <button type="button" class="button green" id="edit-${index}"> 
    </td>
    `

    document.querySelector('#tableClient>tbody').appendChild(newRow);


}




//Evento
document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)