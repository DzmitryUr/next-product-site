import Link from 'next/link';

import { formatDate } from '@/src/utils/date';
import { getOrders } from '@/src/utils/orders/get-orders';
import { getUsers } from '@/src/utils/users/get-users';

function getUserOrderData(userId: string) {
  const orderData = getOrders();
  const user = orderData.filter((item) => item.user === userId);
  const userData = getUsers().filter((user) => user.id === userId);
  const totalAmount = user.reduce((total, order) => total + order.total, 0);
  return { user, userData, totalAmount };
}

const userOrders = ({ params }: { params: { userId: string } }) => {
  const { user, userData, totalAmount } = getUserOrderData(params.userId);

  if (!user?.length) {
    return <p>User not Found</p>;
  }

  return (
    <main className='flex min-h-screen flex-col items-center p-8 max-sm:p-2'>
      <div className='max-w-5xl w-full items-center justify-between font-mono text-sm mb-10 '>
        <h2 className='text-3xl font-bold  text-gray-700 dark:text-gray-300 mb-2'>
          Order Details For:
          <span className='ml-2 text-gray-900 dark:text-white'>
            {userData[0].firstName + ' ' + userData[0].lastName}
          </span>
        </h2>

        <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-300 mb-8'>
          Total Amount Spent: <span className='text-green-700 dark:text-green-400'>${totalAmount}</span>
        </h3>

        {user.map((order, index) => (
          <div
            key={index}
            className='bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow mb-5'
          >
            <div className='flex items-center justify-between mb-3'>
              <span className='text-base font-semibold'>{formatDate(order.time)}</span>
              <span className='text-base font-bold text-green-700 dark:text-green-400'>Total: ${order.total}</span>
            </div>
            <div className='flex flex-wrap gap-4'>
              {order.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className='flex flex-col bg-gray-100 dark:bg-gray-700 rounded-lg p-4 min-w-[180px] max-w-xs flex-1 border border-gray-200 dark:border-gray-600'
                >
                  <p className='font-medium text-gray-900 dark:text-gray-100 mb-1'>{item.name}</p>
                  <p className='text-gray-600 dark:text-gray-400 text-sm mb-0.5'>Price: ${item.price}</p>
                  <p className='text-gray-600 dark:text-gray-400 text-sm'>Quantity: {item.count}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <Link
          href='/users/'
          className='self-start text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none font-semibold rounded-lg text-base px-5 py-2.5 text-center transition-colors'
        >
          ← Back to Users
        </Link>
      </div>
    </main>
  );
};

export default userOrders;
