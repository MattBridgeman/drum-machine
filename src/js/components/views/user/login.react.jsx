import React, { Component } from "react";
import { View } from "../view.react.jsx";
import { Auth } from "../../firebase/auth.react.jsx"

export let Login = (props) => 
  <View>
    <div className="container">
      <Auth {...props} />
    </div>
  </View>;