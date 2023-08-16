import { useRouter } from 'next/router';
import * as React from 'react'
import useSWR from 'swr';
import axios from 'axios'
import { Layout } from '@/components/Layout';
import toast from 'react-hot-toast';
import { DEFAULT_TOAST_MESSAGE } from "@/constant/toast";

const rule = (props: any) => {
    const router = useRouter()
    const [data, setData] = React.useState<any>()
    const [conditions, setConditions] = React.useState<any>()
    React.useEffect(() => {
        if (router.query.id) {
            getdata(router.query.id)
        }

    }, [router.query.id])

    React.useEffect(() => {
        if (data) {
           getConditions()
        }

    }, [data])

    const getdata = async (params: any) => {
        const respon = await axios.get(`/api/rule/${params}`)

        setData(respon.data)
    }

     function handleOnclick(params: number) {
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

    // const temp = data?.conditions.map((data:any)=>{
    //     return data.id
    // })

     function getConditions() {
        if(data){
            const condition = data[0].rules.map((data: any) => {
                return data.conditions
            })
            setConditions(condition)
        }
    }
    if(conditions){
        console.log(conditions[0]);
        const temp = conditions[0].map((data:any)=>{
            return data
        })
        console.log(Object.keys(temp[0]));
        
        
        console.log(Object.keys(conditions[0]));
    }
    
   
    


    return (
        <Layout>
            <section className='layout'>
                {
                    data ?
                        <div>
                            <p>{data[0].name}</p>
                            <button onClick={() => handleOnclick(data[0].id)}>
                                delete
                            </button>
                            <div className='flex '>
                                {
                                    data[0].conditions.map((data: any, index: any) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <p>{data.label}</p>

                                            </React.Fragment>
                                        )
                                    })
                                }


                            </div>
                        </div>
                        :
                        <p>Loading</p>
                }

            </section>
        </Layout>
    )
}

export default rule