import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
import { getOrdersDetail } from '@/services/order';
import { toast } from 'sonner';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrdersDetail(id);
      setOrder(response.data);
      console.log(response.data);

      const orders = response.data.order_lines.map((orderLine) => {
        return {
          productName: orderLine.product_item.product.product_name,
          qty: orderLine.qty,
          price: orderLine.price,
          size: orderLine.product_item.size.size_value,
          total: orderLine.qty * orderLine.price,
          image: orderLine.product_item.product.product_image,
          color: orderLine.product_item.color.color_hex_code,
        };
      });
      setOrderData(orders);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <h1 className=" my-5 flex text-2xl font-bold">
        Thông tin đơn hàng <p className="ml-3">#{order.id}</p>
      </h1>

      <p>Ngày đặt hàng: {order.order_date}</p>
      <p>
        Tên người nhận: {order.user && order.user.first_name}{' '}
        {order.user && order.user.last_name}
      </p>
      <p>Email: {order.user && order.user.email}</p>
      <p>Số điện thoại: {order.user && order.user.phone}</p>
      <p>Địa chỉ: {order.user && order.user.address}</p>
      <table className="mt-10 w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Tên sản phẩm</th>
            <th className="px-4 py-2">Màu sắc</th>
            <th className="px-4 py-2">Số lượng</th>
            <th className="px-4 py-2">Giá</th>
            <th className="px-4 py-2">Size</th>
            <th className="px-4 py-2">Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                <div className="flex items-center ">
                  <img src={order.image} alt="" className="mr-9 w-16" />{' '}
                  {order.productName}
                </div>
              </td>
              <td className="border px-4 py-2 text-center">
                <div
                  className="h-6 w-6 rounded-full"
                  style={{
                    backgroundColor: order.color,
                  }}
                ></div>
              </td>
              <td className="border px-4 py-2 text-center">{order.qty}</td>
              <td className="border px-4 py-2 text-center">
                ${order.price.toFixed(2)}
              </td>
              <td className="border px-4 py-2 text-center">{order.size}</td>
              <td className="border px-4 py-2 text-center">
                ${order.total.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th className=" border px-4 py-2">
          Tổng thanh toán: ${order.order_total}
        </th>
      </table>
      <div className="mr-16 mt-10 text-right">
        <button
          className="btn btn-accent btn-active mr-5"
          onClick={() => toast.success('Success')}
        >
          Order
        </button>
        <button
          className="btn btn-accent btn-active"
          onClick={() => toast.error('Fail')}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default OrderDetail;
