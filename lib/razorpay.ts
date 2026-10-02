export const loadRazorpay = (): Promise<boolean> => {
  return Promise.resolve(true);
};

export const triggerRazorpaySubscriptionCheckout = async (
  subscriptionDetails: any,
  onSuccess: (response: any) => void,
  onFailure?: (response: any) => void,
  customerDetails?: { name: string; email: string; contact: string }
) => {
  // Simulate payment success since payment is removed
  setTimeout(() => {
    onSuccess({ razorpay_payment_id: "sim_" + Date.now() });
  }, 1000);
};

export const triggerRazorpayCheckout = async (
  amountInINR: number,
  onSuccess: (response: any) => void,
  onFailure?: (response: any) => void,
  customerDetails?: { name: string; email: string; contact: string }
) => {
  // Simulate payment success since payment is removed
  setTimeout(() => {
    onSuccess({ razorpay_payment_id: "sim_" + Date.now() });
  }, 1000);
};

export const verifySubscriptionStatus = async (subscriptionId: string): Promise<{ active: boolean; status: string }> => {
  return { active: true, status: 'active' };
};
