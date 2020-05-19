for (let i = 0; i < 2; i++) {
    const ticket = prompt("Введите номер билета", "");
    const fullName = prompt("Введите ФИО так, как написано в билете", "");
    const nowTime = new Date().getTime();

    if (eRegistration(ticket, fullName, nowTime))
        alert('Регистрация произведена успешно!');
}
