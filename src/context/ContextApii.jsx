import React, { createContext, useState } from 'react'

export const addblogContext = createContext()
export const editblogContext = createContext()
export const authContext = createContext()


function ContextApii({ children }) {
    const [addblog, setaddBlog] = useState("")

    const [editblog, setEditBlog] = useState("")

    const [auth, setAuth] = useState(false)
    return (
        <>
            <addblogContext.Provider value={{ addblog, setaddBlog }}>
                <editblogContext.Provider value={{ editblog, setEditBlog }}>
                    <authContext.Provider value={{ auth, setAuth }}>
                        {children}
                    </authContext.Provider>
                </editblogContext.Provider>
            </addblogContext.Provider>

        </>
    )
}

export default ContextApii