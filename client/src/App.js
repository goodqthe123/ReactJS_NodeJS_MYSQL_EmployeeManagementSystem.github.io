import './App.css';
import {useState} from "react";
import Axios from 'axios'

function App() {

  const [name , setName] = useState('');
  const [age , setAge] = useState('0');
  const [country , setCountry] = useState('');
  const [position , setPosition] = useState('');
  const [wage , setWage] = useState('0');

  const [newWage, setNewWage] = useState(0);

  const [employeelist,setEmployeeList]=useState([]);
/* const displayInfo = () =>  {
  console.log(name + age + country + position + wage);
}; */

//連結SEND到BACKEND
const addEmployee = () =>{
  
  Axios.post('http://localhost:3001/create', {
    name:name,
    age:age,
    country:country,
    position:position,
    wage:wage
    }).then(() => {
      console.log("success");
      setEmployeeList([
        ...employeelist,{
        name:name,
        age:age,
        country:country,
        position:position,
        wage:wage
      }])
    });
}

//backend扲番資料出黎
const getEmployees = () => {
  Axios.get('http://localhost:3001/employess').then(
    (response) => {
      setEmployeeList(response.data)
    })
};

//更新froutend
const updateEmployeeWage = (id) => {
  Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
    (response) => {
      setEmployeeList(
        employeelist.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                position: val.position,
                wage: newWage,
              }
            : val;
        })
      );
    }
  );
};

//刪除表格
const deleteEmployee = (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
    setEmployeeList(
      employeelist.filter((val) => {
        return val.id != id;
      })
    );
  });
};

  return (
    <div className="App">
      <div className="information">
      <label>Name:</label>
    <input 
      type="text" 
      onChange={(event) =>{
        setName(event.target.value);
      }}
      />
    <label>Age:</label>
    <input 
      type="number" 
      onChange={(event) =>{
      setAge(event.target.value);
      }}/>
    <label>Country:</label>
    <input type="text" 
      onChange={(event) =>{
      setCountry(event.target.value);
      }}/>
    <label>Position:</label>
    <input 
      type="text" 
      onChange={(event) =>{
      setPosition(event.target.value);
    }}/>
    <label>Wage(year):</label>
    <input type="number" 
      onChange={(event) =>{
      setWage(event.target.value);
    }}/>
    <button onClick={addEmployee} >Add Employee</button>
    </div>
    <hr />
      <div className='employees'>
        
       <button onClick={getEmployees}>Show Employees</button>
       
       {employeelist.map((val,key) => {
          return <div className="employee">
            <div>
              <h3>Name: <br />{val.name}</h3>
              <h3>Age: {val.age}</h3>
              <h3>Country: {val.country}</h3>
              <h3>Position: {val.position}</h3>
              <h3>Wage: {val.wage}</h3>
            </div>
           
            <div><input type="text" placehold="2000..."
            onChange={(event) =>{
              setNewWage(event.target.value);
              }}
              /></div>
            <button onClick={()=>{
              updateEmployeeWage(val.id)
              }}>Update</button>
            
            <button 
            onClick={()=>{
              deleteEmployee(val.id);
            }}
            >Delete</button>
            </div>

       })}
       
       </div>
    </div>
  );
}

export default App;
