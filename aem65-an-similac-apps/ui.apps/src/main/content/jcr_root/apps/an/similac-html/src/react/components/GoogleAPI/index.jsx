import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import RelativePortal from "react-relative-portal";
import { ErrorMessage, useFormikContext } from "formik";

const getGoogleMapInstance = async () => {
    return new Promise((resolve, reject) => {
        let { google } = window;
        if (google) {
            return resolve(google);
        }
        const loader = new Loader({
            apiKey: document.getElementById('google-maps-api-key').value,
            version: "quarterly",
            libraries: ["places"]
        });
        return loader.load().then(() => resolve(window.google)).catch(e => {
            console.log("google map loading error", e);
            return reject("Google Api Load error");
        })
    })


}

const cache = {};
let autoService = null;
let placeService = null;

const GoogleApi = ({
    label,
    name,
    type,
    value,
    error,
    touched,
    fieldId,
    maxLength,
    showAddressFields = () => null,
    onChange: _onChange = () => null,
    onBlur = () => null,
    onClick = () => null,
    validator,
    rules = "",
    subComponent = null,
    onFocus = () => null,
    getNode = () => null,
    icon,
    zipCodeField = "zipCode"
}) => {
    const MIN_CHAR = 5;
    const id = "react-form-field-" + name;
    const { submitCount, setFieldTouched, setFieldValue } = useFormikContext();
    useEffect(() => {
        if (submitCount > 0 && !!!touched) {
            setFieldTouched(name, true);
        }
    }, [submitCount]);
    const [isFocused, setFocus] = useState(false);
    const [selected, setSelected] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchSugg, setSearchSugg] = useState([]);
    const placeOptions = {
        "types": ["geocode"],
        "componentRestrictions": { "country": "us" },
        "input": ""
    };

    const clearAllValues = () => {
        setFieldValue(zipCodeField, "");
        setFieldValue("state", "");
        setFieldValue("city", "");
        setFieldValue("lineOne", "");
        showAddressFields(true, [zipCodeField, "state", "city"]);
    }
    const onChange = ({ currentTarget: { value: _val } }) => {
        setOpen(true);
        setSelected(false);
        setFieldValue(name, _val);
        if(!window.sessionStorage.getItem("addressPrepopulated"))
        {
        setTimeout(() => {
            clearAllValues();
            setFieldValue("lineOne", _val);
        }, 0);
        }
        else{
            window.sessionStorage.removeItem("addressPrepopulated")
        }
        return true;
    }
    const outsideClick = () => {
        setOpen(false);
    }
    const getPredictions = (a = [], status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK ||
            status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS ||
            status === window.google.maps.places.PlacesServiceStatus.INVALID_REQUEST
        ) {
            const sugg = a && a.map(({ place_id, description, matched_substrings }) => ({ place_id, description, matched_substrings }))
            setSearchSugg(sugg);
            cache[value] = sugg;
        }
        else {
            setSearchSugg([]);
        }
    }
    const fillInAddress = (place, desc) => {
        setSelected(true);
        _onChange(value);
        if (place) {
            const { address_components = [] } = place;
            const commonTypesMap = {
                postal_code: { api: "zipCode", nameType: "long_name" },
                country: { api: "country", nameType: "short_name" },
                administrative_area_level_1: { api: "state", nameType: "short_name" },
                administrative_area_level_2: { api: "state", nameType: "short_name" },
                locality: { api: "city", nameType: "long_name" },
                sublocality: { api: "city", nameType: "long_name" },
                neighborhood: { api: "neighborhood", nameType: "long_name" },
                route: { api: "route", nameType: "long_name" },
                street_number: { api: "street_number", nameType: "long_name" }
            };

            let tempData = {};

            address_components.forEach(({ types = [], ...names }) => {
                types.map(typeName => {
                    if (commonTypesMap.hasOwnProperty(typeName)) {
                        const commonMap = commonTypesMap[typeName];
                        const apiKey = commonMap["api"];
                        const _value = names[commonMap["nameType"]];
                        tempData[apiKey] = _value;
                    }
                })
            });

            const lineOne = [(tempData["street_number"]), (tempData["route"])].filter(item => item).join(" ");
            setFieldValue(zipCodeField, tempData["zipCode"] || "");
            setFieldValue("country", tempData["country"] || "US");
            setFieldValue("state", tempData["state"] || "");
            setFieldValue("city", tempData["city"] || "");
            setFieldValue("lineOne", lineOne || "");
            let profileRead="";
            if (ABBOTT.cookie("profile")) {
                profileRead = JSON.parse(ABBOTT.cookie("profile"));
            }
                const userInputLineOne =
                  profileRead.lineOne !== undefined && profileRead.lineOne !== ""
                    ? profileRead.lineOne
                    : "";
                const userInputCity =
                  profileRead.city !== undefined && profileRead.city !== ""
                    ? profileRead.city
                    : "";
                const userInputState =
                  profileRead.state !== undefined && profileRead.state !== ""
                    ? profileRead.state
                    : "";
                const userInputzipCode =
                  profileRead.zipCode !== undefined && profileRead.zipCode !== ""
                    ? profileRead.zipCode
                    : "";
            

                    if(!window.sessionStorage.getItem("addressPrepopulated")) {
                        
                        if(!tempData["zipCode"] || !tempData["city"] || !tempData["state"]){
                            showAddressFields(true, [zipCodeField, "state", "city"]);
                        }
                        else{
                            const address = [lineOne, tempData["city"], tempData["state"], tempData["zipCode"]].filter(item => item).join(", ");
                             setFieldValue(name, address);
                            showAddressFields(false, [zipCodeField, "state", "city"]);
                        }
                    }
                    else if(window.sessionStorage.getItem("addressPrepopulated")){
                        
                        setFieldValue(zipCodeField, userInputzipCode || "");
                        setFieldValue("state", userInputState || "");
                        setFieldValue("city", userInputCity || ""); 
                    if(lineOne !== userInputLineOne || tempData["city"] !== userInputCity || tempData["state"]!==userInputState || tempData["zipCode"]!==userInputzipCode)
                    {
                        setFieldValue("address", userInputLineOne || "");
                        showAddressFields(true, [zipCodeField, "state", "city"]);
                    }
                    else if (!userInputzipCode || !userInputState || !userInputCity) {
                        setFieldValue("address", userInputLineOne || "");
                        showAddressFields(true, [zipCodeField, "state", "city"]);               

                }
                else {
                    showAddressFields(false, [zipCodeField, "state", "city"]);
                }
            }


        }
    };

    const getGoogleMapInstancedata = (value) => {
        getGoogleMapInstance().then(() => {
            var tempDiv = document.createElement("div");
            tempDiv.className = "google-map-div";
            tempDiv.style.display = "none";
            document.body.appendChild(tempDiv);
            autoService = new window.google.maps.places.AutocompleteService;
            placeService = new window.google.maps.places.PlacesService(tempDiv);

            var CurrentAddress = value;
            var geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ 'address': CurrentAddress }, function (results, status) {
    
                if (status == google.maps.GeocoderStatus.OK) {
                    placesDetailsFill(results[0].place_id, results[0].description);
    
                }
    
            });
        })
    }


    const placesDetailsFill = (a, desc) => {

        placeService && placeService.getDetails({
            placeId: a,
            fields: ["address_components"]
        }, function (a, status) {
            status == window.google.maps.places.PlacesServiceStatus.OK ? fillInAddress(a, desc) : console.log(status, desc)
        })
      }

    const geolocate = (value) => {

        window.geolocationshown || (window.geolocationshown = !0 &&
            navigator.geolocation && navigator.geolocation.getCurrentPosition(function (a) {
                {
                    var b = new window.google.maps.LatLng(a.coords.latitude, a.coords.longitude);
                    new window.google.maps.Circle({
                        center: b,
                        radius: a.coords.accuracy
                    })
                }
            }));
        return true;
    }

    useEffect(() => {


        if (value && value.length >= MIN_CHAR && !selected) {
            const _po = {
                ...placeOptions,
                input: value
            }
            if (value in cache) {
                setSearchSugg(cache[value]);
            }
            else {
                getGoogleMapInstance().then(() => {
                    autoService = new window.google.maps.places.AutocompleteService;
                })
                autoService && autoService.getPlacePredictions(_po, getPredictions);
            }
            
      
        }
    }, [value]);
    const show = !selected && value && value.length >= MIN_CHAR && open && searchSugg;

    return (<fieldset id={fieldId}
        className={`form-group similac-form-group ${isFocused ? "isFocused" : "isBlured"
            } ${((value) && "input-contents") || ""}`}
    >
        <label htmlFor={id} className="similac-label-floating">
            {label}
        </label>
        <input
            type={type || "text"}
            className={`form-control ${(error && touched && "is-invalid") || ""}`}
            id={id}
            name={name}
            placeholder=""
            maxLength={maxLength || 999}
            onChange={onChange}
            onClick={onClick}

            value={value}
            autoComplete={"off"}
            onFocus={() => setFocus(true) & onFocus(true) & getGoogleMapInstancedata(value) & geolocate()}
            onBlur={(e) => setFocus(false) & onBlur(e)}
        />
        <RelativePortal
            component="div"
            left={0}
            right={0}
            fullWidth={true}
            top={1}
            onOutClick={show ? outsideClick : null}
        >

            {show
                && (<div className={"pac-container pac-logo"} style={{ width: "100%" }}>
                    {searchSugg.map(item =>
                        (<div
                            className={"pac-item"}
                            onClick={() => placesDetailsFill(item.place_id, item.description)}>
                            <span className="pac-icon pac-icon-marker" />
                            <span className="pac-item-query">{item.description}</span>
                        </div>)
                    )}</div>)}
        </RelativePortal>
        <ErrorMessage name={name} >
            {msg => (<div
                className="invalid-feedback similac-error-group "
                dangerouslySetInnerHTML={{ __html: msg }}
            />)}
        </ErrorMessage>
    </fieldset>)
}

export default GoogleApi;