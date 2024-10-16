const cosmeticsAPI = 'https://fortnite-api.com/v2/cosmetics/br';
const shopAPI = 'https://fortnite-api.com/v2/shop'; // Update this link if different

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const content = document.getElementById('content');
        switch (item.id) {
            case 'locker':
                fetchCosmetics(content);
                break;
            case 'shop':
                fetchShopItems(content);
                break;
            case 'vbucks':
                content.innerHTML = "You've got V-Bucks!";
                break;
            case 'replays':
                content.innerHTML = "View your Replays here!";
                break;
        }
    });
});

async function fetchCosmetics(content) {
    try {
        const response = await fetch(cosmeticsAPI);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        const cosmetics = data.data;

        const totalCosmetics = cosmetics.length;
        const skins = cosmetics.filter(cosmetic => cosmetic.type === 'outfit').length;
        const backblinks = cosmetics.filter(cosmetic => cosmetic.type === 'backpack').length;
        const emotes = cosmetics.filter(cosmetic => cosmetic.type === 'emote').length;
        const pickaxes = cosmetics.filter(cosmetic => cosmetic.type === 'pickaxe').length;
        const gliders = cosmetics.filter(cosmetic => cosmetic.type === 'glider').length;

        content.innerHTML = `<h2>Locker</h2>
            <p>Total Cosmetics: ${totalCosmetics}</p>
            <ul>
                <li>Skins: ${skins}</li>
                <li>Backblinks: ${backblinks}</li>
                <li>Emotes: ${emotes}</li>
                <li>Pickaxes: ${pickaxes}</li>
                <li>Gliders: ${gliders}</li>
            </ul>`;
    } catch (error) {
        content.innerHTML = `<h2>Error fetching data</h2>`;
        console.error('Error fetching cosmetics:', error);
    }
}

async function fetchShopItems(content) {
    try {
        const response = await fetch(shopAPI);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        const items = data.data;

        if (items.length === 0) {
            content.innerHTML = `<h2>No items available in the shop</h2>`;
            return;
        }

        content.innerHTML = `<h2>Shop</h2>`;
        const itemsList = items.map(item => `
            <div class="shop-item">
                <img src="${item.images.icon}" alt="${item.name}">
                <p>${item.name}</p>
                <p>Price: ${item.price} V-Bucks</p>
            </div>
        `).join('');

        content.innerHTML += `<div class="shop-items">${itemsList}</div>`;
    } catch (error) {
        content.innerHTML = `<h2>Error fetching shop items</h2>`;
        console.error('Error fetching shop items:', error);
    }
}
