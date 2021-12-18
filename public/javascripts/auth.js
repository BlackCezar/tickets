async function verifyAuth() {
    let password = document.getElementById('password').value
    let email = document.getElementById('email').value

    let resp = await fetch('/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({
            email, password
        })
    })
    if (resp.status === 200 && resp.redirected) {
        window.location = resp.url
        M.toast({html: 'Успешно', classes: 'rounded green white-text'}) 
    }
    if (resp.status === 404) M.toast({html: 'Такой учетной записи не существует', classes: 'rounded red white-text'}) 
    if (resp.status === 401) M.toast({html: 'Неверный пароль', classes: 'rounded red white-text'}) 
}

async function createUser() {
    if (document.querySelector('.users-form').checkValidity()) {
        let password = document.getElementById('password').value
        let email = document.getElementById('email').value
        let username = document.getElementById('username').value
    
        let resp = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password, username
            })
        })
        if (resp) {
            let user = await resp.json()
            let tr = document.createElement('tr')
            tr.dataset.id = user._id
            tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn-floating waves-effect waves-light flat red" onclick="deleteUser('${user._id}')"><i class="material-icons">delete</i></button>
                </td>`
    
            document.querySelector('.users-table tbody').appendChild(tr)
            M.toast({html: 'Пользователь создан', classes: 'rounded red white-text'}) 
        }  else M.toast({html: 'Возникла ошибка при записи', classes: 'rounded red white-text'}) 
    } else M.toast({html: 'Заполните все данные правильно', classes: 'rounded red white-text'}) 
    
}
async function deleteUser(id) {
    let resp = await fetch('/users/' + id, {
        method: 'DELETE',
    })
    if (resp) { 
        resp = await resp.json()
        if (resp.deletedCount > 0) {
            document.querySelector(`tr[data-id="${id}"]`).remove()
            M.toast({html: 'Пользователь удален', classes: 'rounded red white-text'}) 
        }
    }
}