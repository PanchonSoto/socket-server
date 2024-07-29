


function renderTickets(tickets=[]) {

    for (let index = 0; index < tickets.length; index++) {
        if(index>=4) break;

        const ticket = tickets[index];
        if(!ticket) return;

        const lblTicket = document.querySelector(`#lbl-ticket-0${index+1}`);
        const lblDesk = document.querySelector(`#lbl-desk-0${index+1}`);

        lblTicket.innerText = `Ticket ${ticket.number}`;
        lblDesk.innerText = ticket.handleAtDesk;
    }
}

async function loadCurrentTickets() {
    const tickets = await fetch('/api/ticket/working-on').then(res=>res.json());

    console.log({tickets});
    renderTickets(tickets);
}

function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );

    socket.onmessage = ( event ) => {
        const {type, payload} = JSON.parse(event.data);
        if(type!=='on-working-changed') return;

        console.log({payload});
        renderTickets(payload);
    };

    socket.onclose = ( event ) => {
      console.log( 'Connection closed' );
      setTimeout( () => {
        console.log( 'retrying to connect' );
        connectToWebSockets();
      }, 1500 );

    };

    socket.onopen = ( event ) => {
      console.log( 'Connected' );
    };

}

loadCurrentTickets();
connectToWebSockets();
