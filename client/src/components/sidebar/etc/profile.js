import React, { Fragment , useEffect , useState } from 'react';

const Order_profile = ( props ) => {
    const user = props.profile;
    return (
      <li className="custom_profile" data-id={ user.id } >
          <div className="order_user_profile">
              <div className="avatar">
                  <img src={ user.imgUrl } />
              </div>
              <div className="order_name_time">
                  <h3> { user.name } </h3>
                  <ul>
                      <li> { user.dates[0] } </li>
                      <li> { user.dates[1] } </li>
                  </ul>
              </div>
          </div>
          <div className="order_user_info">
              <p> { user.request } </p>
          </div>
      </li>
    )
}

export default Order_profile;
