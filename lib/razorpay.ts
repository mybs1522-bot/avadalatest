export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const triggerRazorpayCheckout = async (
  amountInINR: number,
  onSuccess: (response: any) => void,
  onFailure?: (response: any) => void,
  customerDetails?: { name: string; email: string; contact: string }
) => {
  const res = await loadRazorpay();

  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  // Using a dummy key for demonstration purposes
  const options = {
    key: 'rzp_live_Wh4xEHePkQXqRO', 
    amount: amountInINR * 100, // Amount is in currency subunits (paise)
    currency: 'INR',
    name: 'Avada Design',
    description: 'Course Purchase',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=100&q=80',
    handler: function (response: any) {
      onSuccess(response);
    },
    prefill: customerDetails || {
      name: 'John Doe',
      email: 'john@example.com',
      contact: '9999999999',
    },
    notes: {
      address: 'E-36, Coregano, Sector 8, Noida - 201301',
    },
    theme: {
      color: '#f97316', // Primary orange color matching the theme
    },
  };

  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.on('payment.failed', function (response: any) {
    if (onFailure) {
      onFailure(response);
    } else {
      alert(`Payment failed! Reason: ${response.error.description}`);
    }
  });
  
  paymentObject.open();
};
