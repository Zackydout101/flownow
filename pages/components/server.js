// import Script from 'next/script'
import Link from 'next/link'
 
export default function ClassServer({serverInfo}) {
    let index =0;

    // function handleServerClick(){
    //     
    // }
    function increment(){
        index = index+1
    }
    
    // let server = serverList[index]
    return (
    <>
        <Link href={serverInfo.route}><h4 class="layer1">{serverInfo.name}</h4></Link>
    </>
    )
}
