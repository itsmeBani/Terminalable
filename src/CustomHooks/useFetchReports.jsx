import {useState, useEffect, useContext} from "react";
import { db } from "../Services/Firebase-config.js";
import { collection, query, where, getDocs ,orderBy} from "firebase/firestore";
import {_UserContext} from "../Context/CurrentUser.jsx";

const useFetchReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {activeUser,refresh}=useContext(_UserContext)
    const fetchReports = async () => {
        try {
            const q = query(collection(db, "Report"), where("author", "==", activeUser),
                orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setReports(items);
            console.log(reports)
        } catch (err) {
            console.log(err)
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchReports().then();
    }, [refresh,activeUser]);



    return { reports, loading, error};
};

export default useFetchReports;
