const form = document.getElementById('buy-ticket-form');

form.addEventListener('submit', submitHandler);

function submitHandler(event) {
    event.preventDefault();

    const formData = {
        flightName: form.elements.flightName.value,
        fullName: form.elements.fullName.value,
        type: parseInt(form.elements.type.value)
    };

    form.elements.flightName.value = '';
    form.elements.fullName.value = '';
    form.elements.type.selectedIndex = 0;

    try {
        const result = buyTicket(bigWorld, formData.flightName, Date.now(), formData.fullName, formData.type);
        bigWorld = result.world;
        const ticket = result.ticket;
        alert(`You successfully bought the ticket ${ticket.id} (seat ${ticket.seat})`);
        updateView();
        
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}
