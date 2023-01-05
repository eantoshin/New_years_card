export const sharing = () => {
    let postCardName = '';

    const popup = (url) => {
        window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
    };

    const vk = (url, title, imageUrl) => {
        let shareUrl = 'https://vk.com/share.php';
        shareUrl += `?url=${encodeURIComponent(url)}`;
        shareUrl += `&title=${encodeURIComponent(title)}`;
        shareUrl += `&image=${encodeURIComponent(imageUrl)}`;
        shareUrl += '&noparse=false';

        popup(shareUrl);
    };

    const tg = (url) => {
        let shareUrl = 'https://t.me/share/url';
        shareUrl += `?url=${encodeURIComponent(url)}`;

        popup(shareUrl);
    };

    const ok = (url, title, imageUrl) => {
        let shareUrl = 'https://connect.ok.ru/offer';
        shareUrl += `?url=${encodeURIComponent(url)}`;
        shareUrl += `&title=${encodeURIComponent(title)}`;
        shareUrl += `&imageUrl=${encodeURIComponent(imageUrl)}`;

        popup(shareUrl);
    };

    const share = (event) => {
        const socialNetworkKey = event.target.dataset && event.target.dataset.share || '';
        const url = `${location.origin}/${postCardName}`;
        const title = 'Новогодняя открытка от Tiburon Research';
        const imageUrl = `${location.origin}/assets/images/share/cards/${postCardName}.png`;

        switch (socialNetworkKey) {
            case 'ok':
                ok(url, title, imageUrl);
                break;
            case 'vk':
                vk(url, title, imageUrl);
                break;
            case 'tg':
                tg(url, title);
                break;
            default:
                break;
        }
    };

    const initSharing = () => {
        document.querySelectorAll('.share-icon-item').forEach((icon) => {
            icon.addEventListener('click', share);
        });
    };

    const updatePostCardName = (name) => {
        postCardName = name;
    };

    const resetSharing = () => {
        document.querySelectorAll('.share-icon-item').forEach((icon) => {
            icon.removeEventListener('click', share);
        });
    };

    return {
        initSharing,
        updatePostCardName,
        resetSharing,
    };
};
