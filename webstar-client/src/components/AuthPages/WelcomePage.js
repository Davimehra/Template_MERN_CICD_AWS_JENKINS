
import Header from "../../components/HelperComponents/Header";

export default function WelcomePage({ setAuthReducer, authReducer }) {

    return (
        <div>
            <Header setAuthReducer={setAuthReducer} authReducer={authReducer} />
            <div>
                WelcomePage
            </div>
        </div>
    )
}