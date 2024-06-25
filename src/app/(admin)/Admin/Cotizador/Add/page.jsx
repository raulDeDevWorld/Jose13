'use client';
import { useUser } from '@/context/Context'
import { useEffect, useState } from 'react'
import { onAuth, signInWithEmail, writeUserData, removeData } from '@/firebase/utils'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal'
import InputFlotante from '@/components/InputFlotante'
import { generateUUID } from '@/utils/UIDgenerator'

export default function Home() {

    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [data, setData] = useState({})
    const [data2, setData2] = useState({})

    function handlerOnChange(e, key) {
        setData({ ...data, [e.target.name]: e.target.value })
    }



      // -------------------------------------------
    function handlerLess2() {
        let db = { ...data2 };
        delete db[`item${data2 !== undefined && Object.keys(data2).length - 1}`];
        return setData2(db)
    }
    
    function onChangeHandler2(e, index) {
        setData2({ ...data2, [`item${index}`]: { ...data2[`item${index}`], [e.target.name]: e.target.value } })
    }
    function saveEspecificaciones(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        writeUserData(`/Cliente/${query}/tarjetas/${route}/especificaciones`, data2, setUserSuccess)
    }




    function saveFrontPage(e, route) {
        e.preventDefault()
        let key = generateUUID()
        setUserSuccess('Cargando')
        writeUserData(`${route}/${key}`, data, setUserSuccess)
    }

    function close(e) {
        router.back()
    }
    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [cliente])
    return (
        <div className="min-h-full">
            <img src="/airplane-bg.jpg" className='fixed  w-screen h-screen  object-cover  ' alt="" />
            <div className="fixed h-screen top-0 left-0 flex justify-center items-center w-full  bg-[#000000b4] p-0 z-40 " >
                <div className="relative w-[95%] lg:w-[50%] bg-white border-b rounded-[10px] pt-16 pb-16 lg:pb-4 px-5">
                    <div className="absolute w-[50px] top-5 right-5 text-white p-1 rounded-tl-lg rounded-br-lg text-center bg-red-600" onClick={close}>
                        X
                    </div>
                    {(query === 'FTL') && <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5  "  >
                        <div className='relative p-5 my-5 mt-10 bg-white space-y-5'>
                            <h5 className='text-center font-medium text-[16px]'>Añadir {query}<br /> </h5>
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['ORIGEN']} required label={'ORIGEN'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['DESTINO']} required label={'DESTINO'} shadow='shadow-white' />
                            < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['PESO (KG)']} required label={'PESO (KG)'} shadow='shadow-white' />
                            < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['VOLUMEN M3']} required label={'VOLUMEN M3'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['TIPO DE UNIDAD']} required label={'TIPO DE UNIDAD'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['MERCANCIA']} required label={'MERCANCIA'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['SERVICIO']} required label={'SERVICIO'} shadow='shadow-white' />
                            < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['FLETE USD']} required label={'FLETE USD'} shadow='shadow-white' />
                            < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['SERVICIOS LOGISTICOS USD']} required label={'SERVICIOS LOGISTICOS USD'} shadow='shadow-white' />
                            <div className='flex justify-center'>
                                <Button theme="Primary" click={(e) => { saveFrontPage(e, `Cliente/price${query}`) }}>Guardar</Button>
                            </div>
                        </div>
                    </form>}



                    {(query === 'FCL') && <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5  "  >
                        <div className='relative p-5 my-5 mt-10 bg-white space-y-5'>
                            <h5 className='text-center font-medium text-[16px]'>Añadir {query}<br /> </h5>
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['ORIGEN']} required label={'ORIGEN'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['DESTINO']} required label={'DESTINO'} shadow='shadow-white' />
                            < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['NAVIERA']} required label={'NAVIERA'} shadow='shadow-white' />
                            < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['EQUIPO']} required label={'EQUIPO'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['TT']} required label={'TT'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['VALIDEZ']} required label={'VALIDEZ'} shadow='shadow-white' />



                            <form className="relative  pt-5" onSubmit={saveEspecificaciones} >

                                {/* ---------------------------------TARJETAS 2---------------------------------------- */}

                                <div className="inline-flex">
                                    <button type='button' className="bg-red-500 text-white font-bold py-2 px-4 rounded-l" onClick={handlerLess2}>
                                        -
                                    </button>
                                    <button type='button' className="bg-green-500 text-white font-bold py-2 px-4 rounded-r" onClick={() => setData2({ ...data2, [`item${data2 !== undefined && Object.keys(data2).length}`]: { ic: '', ip: '' } })} >
                                        +
                                    </button>
                                </div>
                                {data2 && data2 !== undefined && Object.values(data2).map((i, index) => {
                                    return <div className="sm:col-span-3 mb-5 pb-5 border-b-[.5px] border-[#666666]">
                                        <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Item</label>
                                        <input type="text" name={`ip`} onChange={(e) => onChangeHandler2(e, index)} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={data2[`item${index}`][`ip`]} />
                                        <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Especificacion</label>
                                        <input type="text" name={`ic`} onChange={(e) => onChangeHandler2(e, index)} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={data2[`item${index}`][`ic`]} />
                                    </div>
                                })
                                }


                                <div className="mt-6 flex items-center justify-center gap-x-6">
                                    <Button type="submit" theme="Primary">Guardar</Button>
                                </div>
                            </form>



                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['SERVICIO']} required label={'SERVICIO'} shadow='shadow-white' />
                            < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['FLETE USD']} required label={'FLETE USD'} shadow='shadow-white' />
                            < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e,)} defaultValue={data['SERVICIOS LOGISTICOS USD']} required label={'SERVICIOS LOGISTICOS USD'} shadow='shadow-white' />
                            <div className='flex justify-center'>
                                <Button theme="Primary" click={(e) => { saveFrontPage(e, `Cliente/price${query}`) }}>Guardar</Button>
                            </div>
                        </div>
                    </form>}
                    {query === 'mercancias' && <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 border-b-[.5px] "  >
                        <div className='relative p-5 my-5 mt-10 bg-white space-y-5'>
                            <h5 className='text-center font-medium text-[16px]'>Añadir {query}<br /> <span className='text-[#5c5c5c]'></span></h5>
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['MERCANCIA']} required label={'MERCANCIA'} shadow='shadow-white' />
                            < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['GA']} required label={'GA'} shadow='shadow-white' />
                            < InputFlotante type="number" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['IVA']} required label={'IVA'} shadow='shadow-white' />
                            <div className='flex justify-center'>
                                <Button theme="Primary" click={(e) => { saveFrontPage(e, `Cliente/${query}`) }}>Guardar</Button>
                            </div>
                        </div>
                    </form>}

                    {query === 'glosario' && <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 "  >
                        <div className='relative p-5 my-5 mt-10 bg-white space-y-5  '>
                            <h5 className='text-center font-medium text-[16px]'>Añadir {query}<br /> <span className='text-[#5c5c5c]'> </span></h5>
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['termino']} required label={'termino'} shadow='shadow-white' />
                            < InputFlotante type="text" id="floating_5" onChange={(e) => handlerOnChange(e)} defaultValue={data['significado']} required label={'significado'} shadow='shadow-white' />
                            <div className='w-full flex justify-center	'>
                                <Button theme="Primary" click={(e) => { saveFrontPage(e, (e, `Cliente/${query}`)) }}>Guardar</Button>
                            </div>

                        </div>

                    </form>}
                </div>
            </div>
            {success === 'Cargando' && <Loader>ghfhfhj</Loader>}
        </div>
    )
}
