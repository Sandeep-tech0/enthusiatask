import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

function App() {
  const [country, setCountry] = useState([]);
  const [countryid, setCountryid] = useState();
  const [cityid, setCityid] = useState();
  const [stetes, setSat] = useState([]);
  const [city, setCity] = useState([]);
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", "xxxxxxapi key");

  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };
  const getcountry = async () => {
    const req = await fetch("https://api.countrystatecity.in/v1/countries", requestOptions);
    const getres = await req.json();
    console.log(getres);
    return setCountry(await getres);

  }
  useEffect(() => {

    getcountry();


  }, []);


  const getstate = async (id) => {
    const resstate = await fetch(`https://api.countrystatecity.in/v1/countries/${id}/states`, requestOptions);
    const getst = await resstate.json();
    console.log({ getst })

    setSat(getst);

  }
  const getcity = async (id) => {
    const resstate = await fetch(`https://api.countrystatecity.in/v1/countries/${countryid}/states/${id}/cities`, requestOptions);
    const getst = await resstate.json();
    console.log({ getst })

    setCity(getst);

  }

  const handlecountry = async (event) => {
    const getcoutryid = event.target.value;

    setCountryid(getcoutryid);
    getstate(getcoutryid)

    event.preventDefault();
  }
  const handlestate = async (event) => {
    const getstateid = event.target.value;
    setCityid(getstateid)
    getcity(getstateid)
    event.preventDefault();
  }

  return (

    
    <Container className="content">
      <div className="row">
        <div className="col-sm-12">
          <h5 className="mt-4 mb-4 fw-bold">Output  { }</h5>

          <div className="row mb-3">
            <div className="form-group col-md-4">
              <label className="mb-2">Country</label>
              <select name="country" className="form-control" onChange={(e) => handlecountry(e)}>
                <option>--Select Country--</option>
                {
                  country.map((getcon) => (
                    <option key={getcon.id} value={getcon.iso2}> {getcon.name}</option>
                  ))
                }

              </select>
            </div>
            {countryid ? <div className="form-group col-md-4">
              <label className="mb-2">State</label>
              <select name="state" className="form-control" onChange={(e) => handlestate(e)}>
                <option>--Select State--</option>
                {
                  stetes.map((st, index) => (
                    <option key={index} value={st.iso2}>{st.name}</option>
                  ))
                }
              </select>
            </div>
              : ""}
            { cityid?
              <div className="form-group col-md-4">
                <label className="mb-2">City</label>
                <select name="state" className="form-control">
                  <option>--Select city--</option>
                  {
                    city.map((st, index) => (
                      <option key={index} value={st.id}>{st.name}</option>
                    ))
                  }
                </select>
              </div>

              : ""}


          </div>




        </div>
      </div>
    </Container>
  );
}
export default App;