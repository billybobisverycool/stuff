const cosmeticsAPI = 'https://fortnite-api.com/v2/cosmetics/br';
const statsAPI = 'https://fortnite-api.com/v2/stats/br/v2/{accountId}';

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const content = document.getElementById('content');
        const inputContainer = document.getElementById('inputContainer');
        
        if (item.id === 'locker') {
            inputContainer.style.display = 'none'; // Hide input box
            fetchCosmetics(content);
        } else if (item.id === 'stats') {
            inputContainer.style.display = 'block'; // Show input box
            content.innerHTML = 'Enter your Account ID to see stats!';
            document.getElementById('accountIdInput').value = ''; // Clear previous input
        } else if (item.id === 'vbucks') {
            content.innerHTML = "You've got V-Bucks!";
            inputContainer.style.display = 'none'; // Hide input box
        } else if (item.id === 'replays') {
            content.innerHTML = "View your Replays here!";
            inputContainer.style.display = 'none'; // Hide input box
        }
    });
});

// Event listener for the submit button
document.getElementById('submitId').addEventListener('click', () => {
    const accountId = document.getElementById('accountIdInput').value.trim();
    if (accountId) {
        document.getElementById('inputContainer').style.opacity = 0; // Fade out input container
        setTimeout(() => {
            document.getElementById('inputContainer').style.display = 'none'; // Hide input after fade
            fetchStats(document.getElementById('content'), accountId);
        }, 500); // Match timeout with CSS transition duration
    }
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
