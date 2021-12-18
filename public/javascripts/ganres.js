async function createGanre() {
    let ganreName = document.getElementById('ganre-name').value
    let ganreParent = document.getElementById('ganre-parent').value

    let resp = await fetch('/ganres', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ganreName, ganreParent
        })
    })
    if (resp.status === 200) {
        let ganre = await resp.json()
        let tr = document.createElement('tr')
        tr.dataset.id = ganre._id
        let parent = ganre.parent ? document.querySelector(`tr[data-id="${ganre.parent}"]`).firstElementChild.innerText : null
        tr.innerHTML = `
            <td>${ganre.name}</td>
            <td>${ganre.parent ? parent : '-'}</td>
            <td>
                <button class="btn-floating waves-effect waves-light flat red" onclick="deleteGanre('${ganre._id}')"><i class="material-icons">delete</i></button>
            </td>`

        document.querySelector('.ganres-table tbody').appendChild(tr)
        
    }
}
async function deleteGanre(id) {
    let resp = await fetch('/ganres/' + id, {
        method: 'DELETE',
    })
    if (resp) { 
        resp = await resp.json()
        if (resp.deletedCount > 0) {
            document.querySelector(`.ganres-table tr[data-id="${id}"]`).remove()
        }
    }
}