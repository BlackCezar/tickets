async function createSession() {
    let sessionFilm = document.getElementById('session-film').value
    let sessionHall = document.getElementById('session-hall').value
    let sessionDate = document.getElementById('session-date').value
    let sessionTime = document.getElementById('session-time').value
    let sessionPrice = document.getElementById('session-price').value

    let resp = await fetch('/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sessionFilm, sessionHall, sessionDate, sessionTime, sessionPrice
        })
    })
    if (resp.status === 200) {
        let session = await resp.json()
        let tr = document.createElement('tr')
        tr.dataset.id = session._id
        tr.innerHTML = `
            <td>${session.film.name}</td>
            <td>${session.hall.name}</td>
            <td>${session.date}</td>
            <td>${session.time}</td>
            <td>${session.price}</td>
            <td>
                <button class="btn-floating waves-effect waves-light flat red" onclick="deleteSession('${session._id}')"><i class="material-icons">delete</i></button>
            </td>`

        document.querySelector('.sessions-table tbody').appendChild(tr)
        
    }
}
async function createOrder() {
    let session = document.getElementById('order-session').value
    let count = document.getElementById('order-count').value
    let points = document.getElementById('order-points').value
    let s = sessions.find(s => s._id === session)
    
    let amount = s.price * document.getElementById('order-count').value
    let resp = await fetch('/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            session, count, points, amount
        })
    })

    if (resp.status === 200) {
        let order = await resp.json()
        let tr = document.createElement('tr')
        tr.dataset.id = order._id
        tr.innerHTML = `
            <td>${order.session.film.name}</td>
            <td>${new Date(order.datetime).toLocaleString()}</td>
            <td>${order.points}</td>
            <td>${order.count}</td>
            <td>${order.user.name}</td>
            <td>${order.amount}</td>
            <td>
                <button class="btn-floating waves-effect waves-light flat red" onclick="cancelOrder('${order._id}')"><i class="material-icons">delete</i></button>
            </td>`

        document.querySelector('.orders-table tbody').appendChild(tr)
        
    }
}

async function deleteSession(id) {
    let resp = await fetch('/sessions/' + id, {
        method: 'DELETE',
    })
    if (resp) { 
        resp = await resp.json()
        if (resp.deletedCount > 0) {
            document.querySelector(`.sessions-table tr[data-id="${id}"]`).remove()
        }
    }
}


async function cancelOrder(id) {
    let resp = await fetch('/orders/' + id, {
        method: 'DELETE',
    })
    if (resp) { 
        resp = await resp.json()
        if (resp.deletedCount > 0) {
            document.querySelector(`.orders-table tr[data-id="${id}"]`).remove()
        }
    }
}
 

async function selectSession(el) {
    let id = el.value
    let session = sessions.find(s => s._id === id)
    document.querySelector('.price').innerText = session.price
    document.querySelector('.hall').innerText = session.hall.name
    document.querySelector('.points').innerText = `Рядов: ${session.hall.rows}, мест: ${session.hall.cols}`
    document.querySelector('.date').innerText = session.date
    document.querySelector('.time').innerText = session.time
    document.querySelector('.amount').innerText = session.price * document.getElementById('order-count').value
}