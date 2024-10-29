'use client'

import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { increment, decrement } from "./redux/features/counterSlice";
import { useGetUsersQuery } from "./redux/services/userApi";

export default function Home() {
  const count = useAppSelector(state => state.counterReducer.value)
  const dispatch = useAppDispatch()

  const {data, error, isLoading, isFetching} = useGetUsersQuery(null)

  if(isLoading || isFetching) return <div className="w-full h-svh flex justify-center items-center">Loading...</div>
  if(error) return <div className="w-full h-svh flex justify-center items-center">Error</div>

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1>Redux</h1>
        <section className="flex gap-6 items-center">
          <button className="border w-8 h-8 rounded-full border-white" onClick={() => dispatch(decrement())}>-</button>
          <p>{count}</p>
          <button className="border w-8 h-8 rounded-full border-white" onClick={() => dispatch(increment())}>+</button>
        </section>
        <section>
          {
            data?.map(e => 
              <article key={e.id}>
                <p>{e.username}</p>
                <p>{e.email}</p>
              </article>
            )
          }
        </section>
      </main>
    </div>
  );
}