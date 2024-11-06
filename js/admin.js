const users = [{
  fullname: 'John Doe',
  age: 30,
  email: 'admin@admin.com',
  id: '1',
  active: true,
  password: 'admin',
  bornDate: 725846400000,
  location: 'La Luna',
  image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/7/71/Mk8iconyoshi.png?width=1280',
  role: 'ADMIN_ROLE'
},
{
  fullname: 'Jane Doe',
  age: 25,
  email: 'jane.doe@example.com',
  id: '2',
  active: false,
  password: 'password456',
  bornDate: 894326400000,
  location: 'Mendoza',
  image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/f/f5/Mk8icondaisy.png?width=1280',
  role: 'CLIENT_ROLE'
},
{
  fullname: 'Alice Johnson',
  age: 35,
  email: 'alice.johnson@example.com',
  id: '3',
  active: true,
  password: 'password789',
  bornDate: new Date('1988-08-08').getTime(),
  location: 'Mendoza',
  image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/1/1d/Mk8icontoadette.png?width=325'
},
{
  fullname: 'Michael Smith',
  age: 40,
  email: 'michael.smith@example.com',
  id: '4',
  active: false,
  password: 'password101',
  bornDate: new Date('1983-04-10').getTime(),
  location: 'San Luis',
  image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/d/d1/Mk8iconrosalina.png?width=1280'
},
{
  fullname: 'Emily Johnson',
  age: 28,
  email: 'emily.johnson@example.com',
  id: '5',
  active: true,
  password: 'password202',
  bornDate: new Date('1995-02-15').getTime(),
  location: 'Córdoba',
  image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/5/59/Mk8iconpeach.png?width=325'
},
{
  fullname: 'Daniel Lee',
  age: 34,
  email: 'daniel.lee@example.com',
  id: crypto.randomUUID(), // se va a generar automaticamente
  active: false,
  password: 'password303',
  bornDate: new Date('1989-07-07').getTime(),
  location: 'Buenos Aires',
  image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/b/bf/Mk8iconmario.png?width=325'
},
];

let isEditing;
let userButtonsEdit;

const tableHTML = document.getElementById("table-container");
// Obtener el body de la tabla
const tableBodyHTML = document.getElementById("table-body");
const totalHTML = document.getElementById('total');
// Obtener el formulario del HTML
const userFormHTML = document.querySelector('#user-form');
// Obtenemos los elementos elementos del formulario para jugar con sus estilos según este editando o agregando un producto
const btnSumbitHTML = userFormHTML.querySelector('button[type="submit"]');
const formContainerHTML = document.querySelector(".user-form-container")
const titleFormHTML = document.querySelector(".titulo-form")


renderUsers(users);



userFormHTML.addEventListener("submit", (evento) => {

evento.preventDefault()

const el = evento.target.elements

if (el["password-repeat"].value !== el.password.value) {
  Swal.fire("Error", "Las contraseñas no coinciden", "warning")
  return // evito que se ejecuten las siguientes lineas si se ingreso a este if
}

const nuevoUsuario = {
  // Operador ternario
  id: isEditing ? isEditing : crypto.randomUUID(),
  fullname: el.fullname.value,
  email: el.email.value,
  password: el.password.value,
  location: el.location.value,
  image: el.image.value,
  // Transformo la fecha obtenida 2024-03-22 en un timestamp en milisegundos
  bornDate: new Date(el.bornDate.value).getTime(),
  // Obtengo el valor checked para obtener un booleano true o false según corresponda
  active: el.active.checked,
  // Tomo el valor como un tipo numérico
  // age: el.age.valueAsNumber
}

if(isEditing){

  const userIndex = users.findIndex( (user) => {

    if(user.id === isEditing){
      return true
    }

  })

  users[userIndex] = nuevoUsuario

}else{

  users.push(nuevoUsuario)

}

renderUsers(users);

isEditing = undefined;
formContainerHTML.classList.remove("form-edit")

btnSumbitHTML.classList.remove("btn-success")
btnSumbitHTML.classList.add("btn-primary")

btnSumbitHTML.innerText = "Agregar"

titleFormHTML.innerText = "Cargar usuario"

userFormHTML.reset()

el.fullname.focus()




})


function renderUsers(arrayUsers) {
// Cada vez que llamamos la función renderUsers limpiamos el body de la tabla y volvemos a pintar
tableBodyHTML.innerHTML = '';

arrayUsers.forEach((user, index) => {


  tableBodyHTML.innerHTML += `<tr>
                                <td class="user-image">
                                    <img src="${user.image}" alt="${user.fullname} avatar">
                                </td>
                                <td class="user-name">${user.fullname}</td>
                                <td class="user-email">${user.email}</td>
                                <td class="user-location">${user.location}</td>
                                <td class="user-actions">
                                  <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')">
                                    <i class="fa-solid fa-trash"></i>
                                  </button>
                                  <button class="btn btn-primary btn-sm" data-edit="${user.id}" >
                                    <i class="fa-solid fa-pencil"></i>
                                  </button>
                                </td>
                              </tr>`
}) // End forEach

updateEditButtons();
}

function updateEditButtons(){

userButtonsEdit = document.querySelectorAll('button[data-edit]')
// console.log(userButtonsEdit)

userButtonsEdit.forEach((btn) =>{

  btn.addEventListener('click', (evt) =>{

    const id = evt.currentTarget.dataset.edit
    
    completeUserForm(id)

  })

})

}

function completeUserForm(idUser){
isEditing = idUser;

const user = users.find((usr) => {
  if(usr.id === idUser){
    return true
  }
})

if(!user){
  alert("No se encontró el usuario")
  return
}

const el = userFormHTML.elements;

el.fullname.value = user.fullname;
el.email.value = user.email;
el.password.value = user.password;
el["password-repeat"].value = user.password;
el.image.value = user.image;
el.active.checked = user.active;
el.bornDate.valueAsNumber = user.bornDate;

/* ! Estilos */

formContainerHTML.classList.add("form-edit")
btnSumbitHTML.classList.remove("btn-primary")
btnSumbitHTML.classList.add("btn-success")

btnSumbitHTML.innerText = "Editar"

titleFormHTML.innerText = "Editar usuario"

}


function deleteUser(idUser) {
// debería buscar el indice de ese elemento en el array
const indice = users.findIndex((usr) => {
  // Voy a checkear cuando el idUser que es la persona que quiero borrar coincida con el id de mi usr
  if (usr.id === idUser) {
    return true
  }
})
// contemplar si el usuario no existia
if (indice === -1) {
  // alert("El usuario no se encontró")
  Swal.fire({
    title: "Error al borrar",
    text: "No se pudo borrar el usuario",
    icon: "error"
  })
  return
}
// debería eliminar ese elemento del array
users.splice(indice, 1)

// debería volver a pintar la tabla
renderUsers(users)
}

function inputSearch(evt) {
// Tenemos que tomar lo que la persona ha escrito en el input
console.log(evt.target.value)
const search = evt.target.value.toLowerCase();
// Luego deberiamos recorrer el array y filtrar por todos aquellos usuarios cuyo nombre coincida con la busqueda
// Deberiamos pintar nuevamente la tabla con los resultados de la busqueda
const filteredUsers = users.filter((usr) => {
  // Filter para devolver un usuario yo tengo que asegurarme de retornar un true bajo cierta condicion
  if (usr.fullname.toLowerCase().includes(search)) {
    return true;
  }
  return false;
})
renderUsers(filteredUsers)
}

function sortAsc() {
const collator = new Intl.Collator(undefined, {
  sensitivity: 'base'
})

users.sort((a, b) => {
  return collator.compare(a.fullname, b.fullname)
})

renderUsers(users);
}

function sortDesc() {

const collator = new Intl.Collator(undefined, {
  sensitivity: 'base'
})

users.sort((a, b) => {
  // #Método 2
  return collator.compare(b.fullname, a.fullname)

  // #Método 1
  // if(a.fullname.toLowerCase() < b.fullname.toLowerCase()) {
  //   return 1;  
  // }
  // if(a.fullname.toLowerCase() > b.fullname.toLowerCase()) {
  //   return -1;
  // }
  // return 0;
})

renderUsers(users);


}