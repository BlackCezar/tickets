async function createFilm() {
    let filmName = document.getElementById('film-name').value
    if (document.querySelector('.films-form').checkValidity() && filmName.trim().length !== 0) {

        let filmGanre = document.getElementById('film-ganre').value

        let resp = await fetch('/films', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filmName, filmGanre
            })
        })
        if (resp.status === 200) {
            let film = await resp.json()
            let tr = document.createElement('tr')
            tr.dataset.id = film._id
            let ganre = film.ganre ? document.querySelector(`tr[data-id="${film.ganre}"]`).firstElementChild.innerText : null
            tr.innerHTML = `
                <td>${film.name}</td>
                <td>${film.ganre ? ganre : '-'}</td>
                <td>
                    <button class="btn-floating waves-effect waves-light flat red" onclick="deleteFilm('${film._id}')"><i class="material-icons">delete</i></button>
                </td>`

            document.querySelector('.films-table tbody').appendChild(tr)
            M.toast({html: 'Фильм создан', classes: 'rounded green white-text'}) 
        } else M.toast({html: 'Возникла ошибка при записи', classes: 'rounded red white-text'}) 
    } else M.toast({html: 'Заполните все данные правильно', classes: 'rounded red white-text'}) 
}
async function deleteFilm(id) {
    let resp = await fetch('/films/' + id, {
        method: 'DELETE',
    })
    if (resp) { 
        resp = await resp.json()
        console.log(resp.deletedCount)
        if (resp.deletedCount > 0) {
            console.log(document.querySelector(`.films-table tr[data-id="${id}"]`))
            document.querySelector(`.films-table tr[data-id="${id}"]`).remove()
            M.toast({html: 'Фильм удален', classes: 'rounded green white-text'}) 

        }
    }
}