import React, { useState, useEffect } from 'react';
// Assuming you have a common layout component, adjust the import path
// import Layout from '../../components/Layout';
// Assuming you have a Card component, adjust the import path
// import GiftCard from '../../components/GiftCard';

interface TremendousCampaign {
    id: number;
    name: string;
    status: string;
    // Add other properties based on the actual API response
}

const TremendousGiftCards: React.FC = () => {
    const [tremendousCampaigns, setTremendousCampaigns] = useState<TremendousCampaign[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchTremendousCampaigns = async () => {
            try {
                // Replace with your actual Tremendous API base URL
                const response = await fetch('YOUR_TREMENDOUS_API_BASE_URL/campaigns');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: TremendousCampaign[] = await response.json();
                setTremendousCampaigns(data);
                setLoading(false);
            } catch (e: any) {
                setError(e);
                setLoading(false);
            }
        };

        fetchTremendousCampaigns();
    }, []);

    if (loading) {
        return <div>Loading Tremendous Gift Card Campaigns...</div>;
    }

    if (error) {
        return <div>Error loading Tremendous Gift Card Campaigns: {error?.message}</div>;
    }

    return (
        // Replace with your actual layout component if you have one
        <div>
            {/* <Layout> */}
            <h1>Tremendous Gift Card Campaigns</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {tremendousCampaigns.map((campaign) => (
                    // Replace with your actual Card component if you have one
                    <div key={campaign.id} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
                        <h3>{campaign.name}</h3>
                        <p>Status: {campaign.status}</p>
                        {/* You might need to fetch and display rewards here, potentially with a button to view details */}
                        <button>View Rewards</button>
                    </div>
                    // <GiftCard key={campaign.id} title={campaign.name} description={`Status: ${campaign.status}`} onClick={() => console.log('View Rewards for', campaign.name)} />
                ))}
            </div>
            {/* </Layout> */}
        </div>
    );
};

export default TremendousGiftCards;