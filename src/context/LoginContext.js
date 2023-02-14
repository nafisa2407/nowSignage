import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./CreateDataContext";
import contextCall from "../api/contentCall";

const authReducer = (state, action) => {
    switch (action.type) {
        case "add_error":
            return { ...state, apierrorMessage: action.payload };
        case "signin":
            return { apierrorMessage: "", records: action.payload };
        case "offline":
            return { apierrorMessage: "", offlineRecords: action.payload };
        case "add_loader":
            return { loading: action.payload };

        default:
            return state;
    }
};


const getOfflineData = (dispatch) => async (callback) => {
    let offlineRecords = await AsyncStorage.getItem("offLineRecords");
    offlineRecords = JSON.parse(offlineRecords);
    if (offlineRecords != null && Object.keys(offlineRecords).length != 0) {
        dispatch({ type: "offline", payload: offlineRecords })
    }
    if (callback) callback();
};


const setOfflineData = (dispatch) => async (recordsData, callback) => {
    if (recordsData != null && Object.keys(recordsData).length != 0) {
        await AsyncStorage.setItem("offLineRecords", JSON.stringify(recordsData));
    }
};


const signin =
    (dispatch) =>
        async (callback) => {
            try {
                const response = await contextCall.get();
                dispatch({
                    type: "add_loader",
                    payload: 0,
                });
                await AsyncStorage.setItem("records", JSON.stringify(response.data.record.items));
                dispatch({ type: "signin", payload: response.data.record.items });
                await AsyncStorage.setItem("firstVisit", 'no');
                if (callback) callback(response.data.record.items);

            } catch (err) {
                console.log(err)
                dispatch({
                    type: "add_error",
                    payload: "Something went wrong with sign in",
                });
            }

        };


export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, setOfflineData, getOfflineData },
    { records: {}, apierrorMessage: "", loading: 0, offlineRecords: {} }
);