export function sendEmail() {
    const to = '';
    const subject = 'Создай новогоднее настроение с Tiburon Research!';
    // eslint-disable-next-line no-undef
    const cardLink = DOMAIN;
    const mailText = '2022 год прошёл, время выдохнуть!%20%0D' +
        'Предлагаем расслабиться, послушать новогоднюю музыку и ' +
        'почувствовать новогоднюю атмосферу с помощью открытки Tiburon Research.%20%0D';
    const body = mailText + cardLink;
    const emailLink = `mailto:${to}?subject=${subject}&body=${body}`;

    window.open(emailLink);
}
