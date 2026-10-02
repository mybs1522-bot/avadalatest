export const openRazorpayCheckout = ({
  amount,
  courseIds,
  userPhone,
  userEmail,
  onSuccess,
  onCancel,
  onError
}: {
  amount: number;
  courseIds: string[];
  userPhone: string;
  userEmail: string;
  onSuccess: (paymentId: string) => void;
  onCancel?: () => void;
  onError: (error: any) => void;
}) => {
  // Simulating payment success since payment is removed
  setTimeout(() => {
    onSuccess("sim_" + Date.now());
  }, 1000);
};
