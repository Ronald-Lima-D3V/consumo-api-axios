var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)

function run(event){
    event.preventDefault()

    var zipCode = zipCodeField.value

    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.trim()

    axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)

    .then(function(response){
        if (response.data.erro){
            throw new Error('CEP inválido.') // caso o cep tenha quantidade de caracteres certos, porem invalido
        }



        content.innerHTML = ''
        renderData(response.data.logradouro)
        renderData(response.data.bairro)
        renderData(`${response.data.localidade} - ${response.data.uf}`)


        console.log(response.data)
    })
    .catch(function(error){
        console.log(error)
        content.innerHTML = ''
        renderData('Ops, algo deu errado!')
    })
    .finally(function(){
        console.log('Requisição realizada com sucesso.')
    })
}

function renderData(value){
    var line = document.createElement('p')
    var textLine = document.createTextNode(value)

    line.appendChild(textLine)
    content.appendChild(line)
}
