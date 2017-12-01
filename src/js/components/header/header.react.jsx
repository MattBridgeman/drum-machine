import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";
import { DefaultInput } from "../input/input.react.jsx";
import { DropDownMenu } from "./dropdown.react.jsx";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: []
    };
  }

  componentWillReceiveProps(newProps){
    this.setState({
      menu: this.getMenuItemsFromProps(newProps)
    });
  }

  getMenuItemsFromProps(props){
    let items = [];
    
    if(props.auth && props.auth.user) {
      if(props.track.write){
        items.push({
          name: "Save Track",
          callback: () => trackActions.saveTrack()
        });
      }
      items.push({
        name: "Logout",
        link: "/user/logout"
      });
    } else {
      items.push({
        name: "Login",
        link: "/user/login"
      });
    }
    return items;
  }

  render() {
    const { props } = this;
    const { dispatch } = props;
    const trackActions = bindActionCreators(DrumMachineActions.track, dispatch);
    const metaActions = bindActionCreators(DrumMachineActions.meta, dispatch);
    return <div className="header">
      <div className="tray">
        <div className="logo">
          <h1><NavLink to="/" activeClassName="active icon__logo"><span className="assistive">Drum Machine</span></NavLink></h1>
        </div>
        { props.meta.title ?
          (
            <DefaultInput disabled={ !props.track.write } value={props.meta.title} onValueChange={value => metaActions.changeTrackTitle(value)} />
          ) : null
        }
      </div>
      <div className="tray">
        <DropDownMenu items={this.state.menu}></DropDownMenu>
      </div>
    </div>
  }
};