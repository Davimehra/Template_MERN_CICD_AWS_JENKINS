import React, { useState } from "react";
import Header from "../HelperComponents/Header";
import AxiosReqWithInteceptor from "../../axios/axiosInterceptors";
import { useSelector } from "react-redux";
import consoleLog from "../../hooks/consoleLog";


export default function HomePage() {
    const logMessage = consoleLog();
    const auth = useSelector((state) => state?.auth)
    const [userData, setUserData] = useState();
    const axiosRequest = AxiosReqWithInteceptor();

    logMessage("HomePage Rendered")


    const fetchUserHander = async () => {
        await axiosRequest({
            url: '/user/currentuser',
            method: 'get',
            contentType: 'application/json'
        }).then((res) => {
            logMessage(res?.data)
        }).catch((err) => {
            logMessage(`Error Occured in HomePage Api Request - `, err?.response?.data?.message)
        })
    }
    return (
        <React.Fragment>
            <Header />
            <div>HomePage</div>
            <p><b>Fetch User Information</b></p>
            <button onClick={fetchUserHander}>Fetch</button>
        </React.Fragment>
    )
}