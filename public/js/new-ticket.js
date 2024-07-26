

console.log('Nuevo Ticket HTML');

const newTicketLbl = document.getElementById('lbl-new-ticket');



document.getElementById('ticketForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    await createTicket();
    // getLastTicket();
    // console.log('Generar nuevo ticket');
});


async function createTicket() {
    const url = 'http://localhost:3000/api/ticket/post';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(!response.ok) {
            throw new Error(`Response status error: ${response.status}`);
        }

        const ticket = await response.json();
        newTicketLbl.innerText = `${ticket?.number}`;
        console.log(ticket);
    } catch (error) {
        console.log(error);
    }

}


async function getLastTicket() {
    const url = 'http://localhost:3000/api/ticket/last';

    try {
        const response = await fetch(url);
        if(!response.ok) {
            newTicketLbl.innerText = 'Error to fetch';
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        newTicketLbl.innerText = `${json}`;
        console.log(json);
    } catch (error) {
        console.log(error);
    }
}

getLastTicket();
