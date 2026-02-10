const mockOrders = [
  {
    orderId: "ORD123456",
    date: "2026-01-16",
    status: "Delivered", 
    total: 1500,
    items: [
      { id: 1, name: "Product A", qty: 2, price: 500 },
      { id: 2, name: "Product B", qty: 1, price: 500 },
    ],
    address: "123 Street, City, State, ZIP",
  },
  {
    orderId: "ORD123457",
    date: "2026-01-10",
    status: "Pending",
    total: 2500,
    items: [
      { id: 3, name: "Product C", qty: 1, price: 2500 },
    ],
    address: "456 Avenue, City, State, ZIP",
  },
];

export default mockOrders;
