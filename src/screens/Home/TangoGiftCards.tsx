import React, { useState, useEffect } from 'react';
// Assuming you have a common layout component, adjust the import path
// import Layout from '../../components/Layout';
// Assuming you have a Card component, adjust the import path
// import GiftCard from '../../components/GiftCard';

interface TangoItemPriceTier {
    fixedPrice: number;
    // Add other properties if needed
}

interface TangoItem {
    itemId: string;
    name: string;
    currencyUnit: string;
    priceTier: TangoItemPriceTier;
    // Add other properties based on the actual API response
}

interface TangoCatalog {
    catalogId: string;
    name: string;
    description: string;
    items?: TangoItem[];
    // Add other properties based on the actual API response
}

interface TangoCatalogResponse {
    catalogs?: TangoCatalog[];
}

const TangoGiftCards: React.FC = () => {
    const [tangoCatalogs, setTangoCatalogs] = useState<TangoCatalog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchTangoCatalogs = async () => {
            try {
                // Replace with your actual Tango Card API base URL
                const response = await fetch('YOUR_TANGO_API_BASE_URL/catalogs');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: TangoCatalogResponse = await response.json();
                setTangoCatalogs(data.catalogs || []);
                setLoading(false);
            } catch (e: any) {
                setError(e);
                setLoading(false);
            }
        };

        fetchTangoCatalogs();
    }, []);

    if (loading) {
        return <div>Loading Tango Gift Card Catalogs...</div>;
    }

    if (error) {
        return <div>Error loading Tango Gift Card Catalogs: {error?.message}</div>;
    }

    return (
        // Replace with your actual layout component if you have one
        <div>
            {/* <Layout> */}
            <h1>Tango Gift Card Catalogs</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {tangoCatalogs.map((catalog) => (
                    <div key={catalog.catalogId} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
                        <h3>{catalog.name}</h3>
                        <p>{catalog.description}</p>
                        {catalog.items && catalog.items.length > 0 && (
                <h4>Available Gift Cards:</h4>
                <ul>
                  {catalog.items.map((item) => (
                    <li key={item.itemId}>
                      {item.name} - {item.currencyUnit} {item.priceTier?.fixedPrice}
                    </li>
                  ))}
                </ul>
                        )}
                    </div>
                    // <GiftCard key={catalog.catalogId} title={catalog.name} description={catalog.description} content={<ul>{catalog.items?.map(item => <li key={item.itemId}>{item.name} - {item.currencyUnit} {item.priceTier?.fixedPrice}</li>)}</ul>} />
                ))}
            </div>
            {/* </Layout> */}
        </div>
    );
};

export default TangoGiftCards;