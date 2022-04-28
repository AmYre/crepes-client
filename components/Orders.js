import OrderBtn from './OrderBtn';

const Orders = ({ currentOrderId }) => {
	return (
		<div className="p-5">
			<OrderBtn currentOrderId={currentOrderId} />
		</div>
	);
};

export default Orders;
