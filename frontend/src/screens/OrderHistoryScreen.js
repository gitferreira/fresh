import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryScreen(props) {
	const orderList = useSelector((state) => state.orderList)
	const { loading, error, orders} = orderList;

	const dispatch = useDispatch()
	useEffect(()=> {
		dispatch(listOrder())
	},[dispatch])

	return(
		<div>
			<h1 className = "table-title">Your Orders:</h1>
			{loading? (<LoadingBox></LoadingBox>) : error? (<MessageBox variant = "danger">{error}</MessageBox>)
			: 
			(
				<table className = "table">
					<thead>
						<tr>
							<th>ID</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th>ACTIONS</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order)=> (
							//Note*: KEY always has to be a UNIQUE value
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								{/* toFixed(2) --> 100,00 */}
								<td>{order.totalPrice.toFixed(2)}</td>
								{/* Remove hour time with substring */}
								<td>{order.isPaid ? order.paidAt.substring(0, 10): "No"}</td>
								<td>{order.isDelivered? order.deliveredAt.substring(0, 10): "No"}</td>
								<td>
									<button type = "button" className = "small" onClick = {()=> {props.history.push(`/order/${order._id}`)}}>
										Details
									</button>
								</td>
							</tr>
						))}	
					</tbody>
				</table>
			)}

		</div>
	)
}