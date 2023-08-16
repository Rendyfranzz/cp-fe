import { Layout } from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react"
import toast from "react-hot-toast";
import useSWR from "swr";
import { DEFAULT_TOAST_MESSAGE } from "@/constant/toast";

// import fsPromises from 'fs/promises';
// import { GetStaticProps } from "next";
// import path from 'path'
export default function Home(props: any) {
  // React.useEffect(()=>{
  //   getData()
  // },[])

  // const getData =async () => {
  //   const data = await axios.get("api/static")
  //   console.log(data);

  // }
  const router = useRouter()
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR('/api/static', fetcher);
  if (!data) return <div>Loading...</div>;

  function handleOnclick(params: number) {
    router.push(`/rule/${params}`)
  }
  function handleOndelete(params: number) {
    toast.promise(
      axios.delete(`/api/rule/${params}`)
      .then((res)=>{
         // getdata(router.query.id)
      }),
      {
         ...DEFAULT_TOAST_MESSAGE,
       success: 'Rule Successfully Deleted',
      }
 )
  }


  return (
    <Layout>
      <section className="layout">

        <button onClick={()=>router.push('/addrule')}>
          tambah data
        </button>
        <ul className="space-y-5">
          {
            data.db.map((data: any, index: any) => {
              return (
                <li key={index}>
                  <p>
                    {data.name}
                  </p>
                  <p>Endpoint: {`/ruleengine/?rule=${data.endpoint}`}</p>
                  <p>Body</p>
                  {
                    data.body.map((data: any, index: any) => {
                      return (
                        <div key={index} className="flex ">
                          <p>{data.name} : </p>
                          <p>{data.type}</p>
                        </div>
                      )
                    })
                  }
                  <div className="flex space-x-10 w-full">
                    <button onClick={() => handleOnclick(data.id)}>
                      detail
                    </button>
                    <button onClick={() => handleOndelete(data.id)}>
                      delete
                    </button>
                  </div>

                </li>
              )
            })
          }

        </ul>


      </section>
    </Layout>
  )
}

// export const getStaticProps : GetStaticProps =async () => {
//   const filePath = path.join(process.cwd(), 'data.json');
//   const jsonData = await fsPromises.readFile(filePath);
//   const objectData = JSON.parse(jsonData.toString());

//   return {
//     props: objectData
//   }
// }
