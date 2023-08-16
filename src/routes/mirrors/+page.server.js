import fetch from 'node-fetch';

export const load = async() => {
    
    let sites = [
        { name: "Physics Central", url: "https://physics-central.com", status: null },
        { name: "Venture X Jewelry", url: "https://venturexjewelry.com", status: null },
        { name: "Algebra Tools", url: "https://algebratools.com", status: null },
        { name: "aiwriter.dev", url: "https://aiwriter.dev", status: null },
        { name: "mathcalculator.lol", url: "https://mathcalculator.lol", status: null },
        { name: "UnblockedGames.lol", url: "https://unblockedgames.lol", status: null }  
    ];

    console.log('Checking status of sites...');

    for (let site of sites) {
        try {
            const response = await fetch(site.url);
            if (response.ok) {
                site.status = 'Online';
            } else {
                site.status = 'Offline';
            }
            
        } catch (error) {
            site.status = 'Offline';
        }
    }
    console.log(sites);

    return {
        sites: sites
    };
}
