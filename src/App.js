import { Fragment,useRef,useState, useEffect} from "react";
import "./index.css";
import Modal from './components/Layout/Modal';
let graphqlQuery;
let arrayObj;
let changeIdx = false;
function App() {
  console.log(arrayObj);
  const [dataFetched, setDataFetched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
 

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const cityInputRef = useRef();


useEffect(()=>{
  graphqlQuery = {
    query: ` query {
      getDetails(phoneNumber:6169532698) {
        firstName
        lastName
        city
        streetLine1
        email
        bankAccount
        phoneNumber
      }
           
      }`,
  };

  
    const fetchOrders = async function () {
  
      const data = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        body: JSON.stringify(graphqlQuery),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const response = await data.json();
      console.log(response);
  
      arrayObj = response.data.getDetails;
     
      if (saving) {
        setSaving(false);
      }
      else {
        setDataFetched(true);
      }
    }();
},[changeIdx]);
    
   


  const editHandler = () => {
    setShowModal(true);
  }
  

  const confirmHandler = async (event) => {
    event.preventDefault();

    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    console.log(enteredFirstName);
    console.log(enteredCity);
    setSaving(true);
    
    graphqlQuery = {
      query: ` mutation {
        editProfile(firstName:"${enteredFirstName}",
        lastName:"${enteredLastName}",
        email:"${enteredEmail}",
          city:"${enteredCity}")  
             
        }`,
    };
 
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(graphqlQuery),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res =>{ 
      changeIdx = !changeIdx;
      setShowModal(false);
      
    });
 
    
    
  };



  return (
    <Fragment>
      {saving && <p>Saving User Data</p>}
    {dataFetched && arrayObj && !saving && <form >
    <div className="flexDetails">
      <span className="nameShort">{arrayObj.firstName.slice(0,1).toUpperCase()}{arrayObj.lastName.slice(0,1).toUpperCase()}</span>
      <div className="colDetail">
      <div style={{color:"grey",fontSize:"1.2rem"}}>Name</div>
      <div style={{color:"black",fontSize:"1.1rem"}}>{arrayObj.firstName} {arrayObj.lastName}</div>
      </div>
      
    </div>
    <div className="mainRow">
    <div className="row" style={{margin:"0.5rem 0",justifyContent:"space-between",width:"100%"}}>
          <div className="col-md-6" style={{padding:"0" ,margin:"1rem 0"}}>
            <div className="flexDetail">
            <span className="icon"><i class="fas fa-map-pin"></i></span>
              <div className="colDetail">
              <div style={{color:"grey",fontSize:"1.2rem"}}>Address</div>
              <div style={{color:"black",fontSize:"1.1rem",display:"flex",flexDirection:"column"}}>
                <div>{arrayObj.streetLine1}</div>
                <div>{arrayObj.city}</div>
              </div>
              </div>
            </div>

          </div>
          <div className=" col-md-6" style={{padding:"0",margin:"1rem 0"}} >
          <div className="flexDetail">
            <span className="icon"><i class="fas fa-link"></i></span>
              <div className="colDetail">
              <div style={{color:"grey",fontSize:"1.2rem"}}>IBAN Bank Account</div>
              <div style={{color:"black",fontSize:"1.1rem"}}>{arrayObj.bankAccount}</div>
              </div>
            </div>
          </div>
      </div>
      <div className="row" style={{margin:"0.5rem 0",justifyContent:"space-between",width:"100%"}}>
          <div className="col-md-6" style={{padding:"0" ,margin:"1rem 0"}}>
            <div className="flexDetail">
            <span className="icon"><i class="far fa-envelope"></i></span>
              <div className="colDetail">
              <div style={{color:"grey",fontSize:"1.2rem"}}>Email Address</div>
              <div style={{color:"black",fontSize:"1.1rem"}}>{arrayObj.email}</div>
              </div>
            </div>
          
          </div>
          <div className=" col-md-6" style={{padding:"0",margin:"1rem 0"}} >
          <div className="flexDetail">
          <span className="icon"><i class="fas fa-phone-alt"></i></span>
              <div className="colDetail">
              <div style={{color:"grey",fontSize:"1.2rem"}}>Phone Number</div>
              <div style={{color:"black",fontSize:"1.1rem"}}>{arrayObj.phoneNumber}</div>
              </div>
            </div>
          </div>
      </div>

      
    </div>
    
      <button
        type="button"
        onClick={editHandler}
      >
        EDIT
      </button>
  
  </form>}
 {showModal && !saving && <Modal>
  <form className="modalForm" >
  <div className="row" style={{margin:"0.5rem 0",justifyContent:"space-between",width:"100%"}}>
      <div className="col-sm-6" style={{padding:"0" ,margin:"1rem 0"}}>
        <label htmlFor="name">First Name</label>
        <input type="text" id="name" ref={firstNameInputRef} defaultValue={arrayObj.firstName}/>
      </div>
      <div className="col-sm-6" style={{padding:"0" ,margin:"1rem 0"}}>
        <label htmlFor="lastname">Last Name</label>
        <input type="text" id="lastname" ref={lastNameInputRef} defaultValue={arrayObj.lastName}/>
      </div>
  </div>
  <div className="row" style={{margin:"0.5rem 0",justifyContent:"space-between",width:"100%"}}>
      <div className="col-sm-6" style={{padding:"0" ,margin:"1rem 0"}}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" ref={emailInputRef} defaultValue={arrayObj.email}/>
      </div>
      <div className="col-sm-6" style={{padding:"0" ,margin:"1rem 0"}}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} defaultValue={arrayObj.city}/>
      </div>
  </div>
      <button onClick={confirmHandler}>SAVE</button>
    </form>
    </Modal>}
  </Fragment>
  );
}

export default App;
