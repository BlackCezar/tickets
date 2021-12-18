async function createHall() {
    let hallName = document.getElementById('hall-name').value
    let hallRows = document.getElementById('hall-rows').value
    let hallCols = document.getElementById('hall-cols').value

    let resp = await fetch('/halls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            hallName, hallRows, hallCols
        })
    })
    if (resp.status === 200) {
        let hall = await resp.json()
        let tr = document.createElement('tr')
        tr.dataset.id = hall._id
        tr.innerHTML = `
            <td>${hall.name}</td>
            <td>${hall.rows}</td>
            <td>${hall.cols}</td>
            <td>
                <button class="btn-floating waves-effect waves-light flat red" onclick="deleteHall('${hall._id}')"><i class="material-icons">delete</i></button>
            </td>`

        document.querySelector('.halls-table tbody').appendChild(tr)
    }
}
async function deleteHall(id) {
    let resp = await fetch('/halls/' + id, {
        method: 'DELETE',
    })
    if (resp) { 
        resp = await resp.json()
        if (resp.deletedCount > 0) {
            document.querySelector(`tr[data-id="${id}"]`).remove()
        }
    }
}