const cosmeticsAPI = 'https://fortnite-api.com/v2/cosmetics/br';
const statsAPI = 'https://fortnite-api.com/v2/stats/br/v2/{accountId}'; // Replace {accountId} with the actual account ID

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const content = document.getElementById('content');
        if (item.id === 'locker') {
            fetchCosmetics(content);
        } else if (item.id === 'stats') {
            const accountId = prompt("Enter your Fortnite Account ID:");
            if (accountId) {
                fetchStats(content, accountId);
            }
        } else if (item.id === 'vbucks') {
            content.innerHTML = "You've got V-Bucks!";
        } else if (item.id === 'replays') {
            content.innerHTML = "View your Replays here!";
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

async function fetchStats(content, accountId) {
    const url = statsAPI.replace('{accountId}', accountId);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        const stats = data.data;

        if (!stats) {
            content.innerHTML = `<h2>No stats available for this account</h2>`;
            return;
        }

        // Example of displaying some stats
        content.innerHTML = `<h2>Stats for Account ID: ${accountId}</h2>
            <ul>
                <li>Wins: ${stats.total.wins}</li>
                <li>Matches Played: ${stats.total.matches}</li>
                <li>Kills: ${stats.total.kills}</li>
                <li>K/D Ratio: ${stats.total.kdRatio.toFixed(2)}</li>
            </ul>`;
    } catch (error) {
        content.innerHTML = `<h2>Error fetching stats</h2>`;
        console.error('Error fetching stats:', error);
    }
}
