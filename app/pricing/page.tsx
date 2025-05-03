"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PricingPage: React.FC = () => {
  const { data: session } = useSession();
  const [pricingData, setPricingData] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (session?.user?.id) {
        if (session.user.role === 'creator') {
          const { data } = await axios.get('/api/pricing/influencer', {
            headers: { Authorization: `Bearer ${session.accessToken}` }
          });
          setPricingData(data.pricing);
        } else if (session.user.role === 'hotel' || session.user.role === 
'brand') {
          const { data } = await 
axios.get(`/api/subscriptions/${session.user.id}`, {
            headers: { Authorization: `Bearer ${session.accessToken}` }
          });
          setSubscription(data.subscription);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [session]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Pricing & Subscription</h1>
      {session?.user?.role === 'creator' && (
        <div>
          {pricingData.map((pricing, index) => (
            <div key={index}>
              <p>Event: {pricing.eventId}</p>
              <p>Price: {pricing.prismSellPrice}</p>
            </div>
          ))}
        </div>
      )}
      {session?.user?.role === 'hotel' || session?.user?.role === 'brand' 
&& (
        <div>
          <p>Subscription: {subscription?.plan}</p>
          <p>Cost: ${subscription?.amount}</p>
        </div>
      )}
    </div>
  );
};

export default PricingPage;

