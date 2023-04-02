import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
const translate = require("translate")
const useBillboard = () => {
    const {data,error,isLoading} = useSWR('/api/random',fetcher,{
        revalidateIfStale:false,
        revalidateOnFocus:false,
        revalidateOnReconnect:false
    })



    return {
        data,error,isLoading
    }


}

export default useBillboard;