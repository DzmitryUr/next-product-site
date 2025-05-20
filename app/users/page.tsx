import Link from 'next/link';

import { getUsers } from '@/src/utils/users/get-users';
import { User } from '@/src/type/users';

const PAGE_SIZE = 40;

interface PaginatedData {
  paginatedData: User[];
  currentPage: number;
  totalPages: number;
}

const getPaginatedData = (page: number, pageSize: number): PaginatedData => {
  const currentPage = page;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const data = getUsers();
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / pageSize);

  return {
    paginatedData,
    currentPage,
    totalPages,
  };
};

const Users = ({ searchParams }: { searchParams?: { [key: string]: string } }) => {
  const currentPage = parseInt(searchParams?.page ?? '1', 10);

  const { paginatedData: usersData, totalPages } = getPaginatedData(currentPage, PAGE_SIZE);

  return (
    <>
      <div className='max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left'>
          {usersData.map((user) => (
            <div
              key={user.id}
              className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
            >
              <Link href={`/users/${user.id}`}>
                <h3 className='mb-3 text-2xl font-semibold'>
                  {user.firstName} {user.lastName}
                </h3>
                <p className='m-0 max-w-[50ch] text-sm opacity-50'>Phone: {user.phoneNumber}</p>
                <p className='m-0 max-w-[50ch] text-sm opacity-50'>Email: {user.email}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-around w-full border-t-2 pt-4'>
        <Link href={`?page=${currentPage - 1}`} className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}>
          <button disabled={currentPage === 1}>Previous</button>
        </Link>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Link
          href={`?page=${currentPage + 1}`}
          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
        >
          <button disabled={currentPage === totalPages}>Next</button>
        </Link>
      </div>
    </>
  );
};

export default Users;
