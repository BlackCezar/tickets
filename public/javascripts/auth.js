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
    }
}

async function createUser() {
    let password = document.getElementById('password').value
    let email = document.getElementById('email').value
    let username = document.getElementById('username').value

    console.log('qwdqwdqwdqwdw')

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
    }
}
async function deleteUser(id) {
    let resp = await fetch('/users/' + id, {
        method: 'DELETE',
    })
    if (resp) { 
        resp = await resp.json()
        if (resp.deletedCount > 0) {
            document.querySelector(`tr[data-id="${id}"]`).remove()
        }
    }
}