import React, { useEffect, useState } from "react";
import "./Dashboard.css";
// import logo from '../assets/logo.png'

import profile1 from "../assets/profile-1.jpg";
import profile2 from "../assets/profile-2.jpg";
import profile3 from "../assets/profile-3.jpg";
import profile4 from "../assets/profile-4.jpg";
import Navbar from "../Navbar/Navbar";
import { redirect } from "react-router-dom";
import axios from "axios";
import Single from "./singlediv";
import { setConfig } from "dompurify";











function RenderingArrayOfObjects(props) {
  const [currentcoins,setcurrentcoins]=useState([]);
  const [listItems,setlistItems]=useState([]);

  const getdata = () => {
    const token = localStorage.getItem("token");
    var userId = localStorage.getItem("userId");
    console.log(userId);
    userId = userId.replace(/['"]+/g, "");
    console.log(userId);
    fetch("https://crytotrade-app.onrender.com/api/user/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userId: userId
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        let newarr=[];
        console.log("hi");
        res=res.data.stocks;
        for(let i=0;i<res.length;i++){

            const url = `https://api.coingecko.com/api/v3/coins/${res[i].stockId}`;

            axios.get(url).then((resa) => {
                res[i].imagesmall=resa.data.image.small;
                res[i].current_market_price=resa.data.market_data.current_price.inr;
            }).catch((error) => {
                console.log(error)
            })
        }
        console.log(res);
        return res;
        
      })
      .then((res)=>{
        // showdata(res)
        setcurrentcoins(res);
        
      })
      .then(()=>{
        return showdata(currentcoins);
        
      })
      .then((lists)=>{
        setlistItems(lists)
        
      })
      .catch((err) => {
        console.log(err);
      });
  }; 
//   getdata();
  useEffect(() => {
    getdata();
  }, [currentcoins]);

  // const data = {currentcoins};
  // console.log(data);
  // let listItems=[];
const showdata=(datas)=>{
 let listItems1 = datas.map(
      (element) => {
          return (
<Single key={element.sto} stockId={element.stockId} imagesmall={element.imagesmall} total_amount={element.total_amount} current_market_price={element.current_market_price}/>       

)
      }
  )
return listItems1;
    }


  return (
      <div>
          {listItems}
      </div>
  )
}




















const Dashboard = () => {

  const [name, setName] = React.useState("Admin");

const [alldivs,setalldivs]=useState([]);

// const currentdata=(coinobj,id,index)=>{
//   const url = `https://api.coingecko.com/api/v3/coins/${id}`;

//         axios.get(url).then((res) => {
//             let dummy=coinobj;
//             dummy.imagesmall=res.data.image.small;
//             dummy.current_market_price=res.data.market_data.current_price.inr;

            
//             console.log(dummy);
//             return dummy;
//             // setCoin(res.data)
//         }).catch((error) => {
//             console.log(error)
//         })

// }







  useEffect(() => {
    if (!localStorage.getItem("token")) {
    }
    console.log(localStorage.getItem("token"));
    const name = window.localStorage.getItem("first_name");
    console.log(name);
    setName(name);
  }, []);


  return (
    <div className="container1">
      <div className="navbar-area">
        <Navbar />
      </div>

      {/* <!-------------  END OF ASIDE  ----------> */}
      <main>
        <h1>DashBoard</h1>

        <div className="date">{/* <input type="date"> */}</div>

        <div className="insights">

 <RenderingArrayOfObjects  />


{/* 
          <div className="sales">
            <img src={currentcoins[0].imagesmall}></img>
            <span className="material-icons-sharp">analytics</span>

            <div className="middle">
              <div className="left">
                <h3>{currentcoins[0].stockId}</h3>
                <h1>Rs {currentcoins[0].total_amount}</h1>
                <h1>Rs {currentcoins[0].current_market_price}</h1>
              </div>
              <div className="progress">
        
                <img src={currentcoins[0].imagesmall}></img>
                <div className="number">
                  <p>81%</p>
                </div>
              </div>
            </div>
            <small className="text-muted">Last 24 Hours</small>
          </div>
 */}






          <div className="sales">
            <span className="material-icons-sharp">analytics</span>
            <div className="middle">
              <div className="left">
                <h3>Total Sales</h3>
                <h1>$25,024</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="number">
                  <p>81%</p>
                </div>
              </div>
            </div>
            <small className="text-muted">Last 24 Hours</small>
          </div>
          {/* <!-- END OF SALES --> */}
          <div className="expenses">
            <span className="material-icons-sharp">bar_chart</span>
            <div className="middle">
              <div className="left">
                <h3>Total Expenses</h3>
                <h1>$14,194</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="number">
                  <p>62%</p>
                </div>
              </div>
            </div>
            <small className="text-muted">Last 24 Hours</small>
          </div>
          {/* <!-- END OF EXPENSES --> */}
          <div className="income">
            <span className="material-icons-sharp">stacked_line_chart</span>
            <div className="middle">
              <div className="left">
                <h3>Total Incomes</h3>
                <h1>$17,811</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="number">
                  <p>47%</p>
                </div>
              </div>
            </div>
            <small className="text-muted">Last 24 Hours</small>
          </div>
          {/* <!-- END OF INCOME --> */}
        </div>
        {/* <!----------- END OF INSIGHTS -------------> */}

        <div className="orders">
          <h2>Recent Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Number</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Foldable Mini Drone</td>
                <td>81641</td>
                <td>Due</td>
                <td className="war">Pending</td>
                <td className="primary">Details</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Foldable Mini Drone</td>
                <td>69001</td>
                <td>Due</td>
                <td className="war">Pending</td>
                <td className="primary">Details</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Foldable Mini Drone</td>
                <td>12346</td>
                <td>Due</td>
                <td className="war">Pending</td>
                <td className="primary">Details</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Foldable Mini Drone</td>
                <td>52921</td>
                <td>Due</td>
                <td className="war">Pending</td>
                <td className="primary">Details</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Foldable Mini Drone</td>
                <td>33911</td>
                <td>Due</td>
                <td className="war">Pending</td>
                <td className="primary">Details</td>
              </tr>
            </tbody>
          </table>
          <a href="#">Show All</a>
        </div>
      </main>
      {/* <!---------------- END OF MAIN -----------> */}

      <div className="right">
        <div className="top">
          <button id="menu-btn">
            <span className="material-icons-sharp">menu</span>
          </button>
          <div className="theme-toggler">
            <span className="material-icons-sharp" id="light">
              light_mode
            </span>
            <span className="material-icons-sharp">dark_mode</span>
          </div>
          <div className="profile">
            <div className="info">
              <p>
                Hey, <b>{name}</b>
              </p>
              <small className="text-muted">Admin</small>
            </div>
            <div className="profile-photo">
              <img src={profile1} alt="hero" />
            </div>
          </div>
        </div>
        {/* <!----------- END OF TOP -----------> */}
        <div className="recent-updates">
          <h2>Recent Updates</h2>
          <div className="updates">
            <div className="update">
              <div className="profile-photo">
                <img src={profile2} alt="hero" />
              </div>
              <div className="message">
                <p>
                  <b>
                    Mike <b>received his order of Night lion tech GPS drone</b>
                  </b>
                </p>
                <small className="text-muted">2 Minutes Ago</small>
              </div>
            </div>
            <div className="update">
              <div className="profile-photo">
                <img src={profile3} alt="hero" />
              </div>
              <div className="message">
                <p>
                  <b>
                    Mike <b>received his order of Night lion tech GPS drone</b>
                  </b>
                </p>
                <small className="text-muted">2 Minutes Ago</small>
              </div>
            </div>
            <div className="update">
              <div className="profile-photo">
                <img src={profile4} alt="hero" />
              </div>
              <div className="message">
                <p>
                  <b>
                    Mike <b>received his order of Night lion tech GPS drone</b>
                  </b>
                </p>
                <small className="text-muted">2 Minutes Ago</small>
              </div>
            </div>
          </div>
          {/* <!----------- END OF RECENT UPDATES -------> */}
          <div className="sales-analytics">
            <h2>Sales Analytics</h2>

            <div className="item online">
              <div className="icon">
                <span className="material-icons-sharp">shopping_cart</span>
              </div>
              <div className="right">
                <div className="info">
                  <h3>ONLINE ORDERS</h3>
                  <small className="text-muted">Last 24 Hours</small>
                </div>
                <div>
                  <h5 className="success">55%</h5>
                  <h3>2432</h3>
                </div>
              </div>
            </div>
            <div className="item offline">
              <div className="icon">
                <span className="material-icons-sharp">local_mall</span>
              </div>
              <div className="right">
                <div className="info">
                  <h3>OFFLINE ORDERS</h3>
                  <small className="text-muted">Last 24 Hours</small>
                </div>
                <div>
                  <h5 className="danger">-15%</h5>
                  <h3>781</h3>
                </div>
              </div>
            </div>
            <div className="item customers">
              <div className="icon">
                <span className="material-icons-sharp">person</span>
              </div>
              <div className="right">
                <div className="info">
                  <h3>NEW CUSTOMERS</h3>
                  <small className="text-muted">Last 24 Hours</small>
                </div>
                <div>
                  <h5 className="success">+25%</h5>
                  <h3>1822</h3>
                </div>
              </div>
            </div>

            <div className="item" id="add_product">
              <div>
                <span className="material-icons-sharp">add</span>
                <h3>Add Product</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
